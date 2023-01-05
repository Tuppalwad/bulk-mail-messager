from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import jwt 
# from inbox import getMails
import firebase_admin
from firebase_admin import credentials, db
import smtplib

try:
    cred = credentials.Certificate("./firebase/firebaseconfig.json")
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://sem7-project-default-rtdb.firebaseio.com",
    })
    ref = db.reference()
except Exception as e:
    print(e)
    print("Error connecting firebase")


app = Flask(__name__)
app.secret_key = 'iamfuckingcreazy'
# session configuration
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# cors config
CORS(app)
# getting date and time
date = datetime.now()
date = date.strftime("%d-%m-%Y,%H:%M:%S")

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data['password']

        temp = email.split('@')
        temp_user = temp[0]
        try:
            if ref.child('users').child(temp_user).get() is None:
                ref.child('users').child(temp_user).set({
                            'name' : name,
                            'username' : temp_user,
                            'email' : email,
                            'password' : password,
                })
               
                return jsonify({
                    'status' : True,
                    'message' : 'User created successfully',
                    'code' : 'Success'
                })
            else:
                return jsonify({
                    'status': False, 
                    'message' : 'User already exists',
                    'code' : 'Error'
                        
                })
        except Exception as e:
            return jsonify({
                'status': False, 
                'message': 'Error creating user: {}'.format(e),
                'code' : 'Error'
            })

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        lst = email.split('@')
        print(data)
        try:
            serverdata = ref.child('users').child(lst[0]).get()
            serverUsername = serverdata['email']
            serverPassword = serverdata['password']
            if serverUsername == email and serverPassword == password:
                    return jsonify({
                        'status': True,
                        'message': 'Login successful',
                        'code' : 'Success',
                        'token' : jwt.encode({'user' : serverUsername, 'exp' : datetime.utcnow() + timedelta(hours=12)}, app.secret_key),
                        'data' : serverdata
                    })
            else:
                return jsonify({
                    'status': False, 
                    'message': 'Login Failed',
                    'code' : 'Error'
                })
        except Exception as e:
            return jsonify({
                'status': False, 
                'message': 'Error while log in : {}'.format(e),
                'code' : 'Error'
            })

@app.route('/smtpConfig', methods=['POST'])
def smtpConfig():
    if request.method =="POST":
        data = request.get_json()
        user = data['user']
        smtp = data['smtp']
        try:
            ref.child('users').child(user).child('smtpConfig').set({
                'host' : smtp["serverAddress"],
                'port' : smtp['port'],
                'email' : smtp['email'],
                'password' : smtp['password']
            })
            data = ref.child('users').child(user).get()
            # print(data)
            return jsonify({
                'status': True,
                'message': 'SMTP Configured',
                'code' : 'Success',
                'data' : data
            })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while configuring SMTP : {}'.format(e),
                'code' : 'Error'
            })

@app.route('/contactList', methods=['POST'])
def contactList():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = data['user']
            segment = data['segment']
            listName = segment['segmentName']
            temp_contacts = segment['segmentData']
            # print(data)
            print(user,'\n',listName,'\n')

            contacts = []
            for i in temp_contacts:
                contacts.append(i[0])
            print(contacts)

            ref.child('users').child(user).child('contactList').child(listName).set({
                'listName' : listName,
                'contacts' : contacts
                
            })
            serverdata = ref.child('users').child(user).get()
        
            return jsonify({
                    'status': True,
                    'message': 'Created successful',
                    'code' : 'Success',
                    'data' : serverdata
                }),serverdata

        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while creating contact list : {}'.format(e),
                'code' : 'Error'
            })



@app.route('/deleteContact', methods=['POST'])
def deleteList():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = data['user']
            listName = data['contact']
            print("Deleting the list of ",user,' : ',listName,'\n')

            # delete the list
            ref.child('users').child(user).child('contactList').child(listName).delete()
            serverdata = ref.child('users').child(user).get()
            return jsonify({
                    'status': True,
                    'message': 'deleted successful',
                    'code' : 'Success',
                    'data' : serverdata
                })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while deleting contact list : {}'.format(e),
                'code' : 'Error'
            })

# how to write a functio for update profile in flask 
@app.route('/updateProfile', methods=['POST'])
def updateProfile():
    if request.method == 'POST':
        try:
            data = request.get_json()
            name = data['name']
            username = data['user']
            email = data['email']
            password = data['password']
            print(name,username,email,password)
            ref.child('users').child(username).update({
                'name' : name,
                'email' : email,
                'password' : password
            })
            serverdata = {
                'name' : ref.child('users').child(username).child('name').get(),
                'email' : ref.child('users').child(username).child('email').get(),
                'password' : ref.child('users').child(username).child('password').get(),
                'username' : username
            }
            print(',,,,,,,,,,,,,')
            print(serverdata)
            return jsonify({
                    'status': True,
                    'message': 'updated successful',
                    'code' : 'Success',
                    'data' : serverdata
                })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while updating profile : {}'.format(e),
                'code' : 'Error'
            })


@app.route('/composemail', methods=['POST'])
def sendmail():
    if request.method == 'POST' :
        try:
            data = request.get_json()
            singlemail=data['to']
            subject = data['subject']
            body = data['message']
            contact_list=data['list_of_mail']
            smtp_data=data['smtpconfigdata']
            user=data['user']
            clist=data['clist']
            body=BeautifulSoup(body, "html.parser")
            body=body.get_text()    
            mtype=data['btn']
           
            if clist=='':
                contact_list=[singlemail]
            else:
                contact_list=contact_list[clist]
                contact_list=contact_list['contacts'][1:]
        
            mail=smtplib.SMTP(smtp_data['host'],smtp_data['port'])
            mail.ehlo()
            mail.starttls()
            mail.login(smtp_data['email'],smtp_data['password'])
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = smtp_data['email']
            msg['From'] =  "<{}>".format(smtp_data['email'])
            smail=[]
            if mtype=='Send Mail':
                msg['To'] =''.join(singlemail)
                smail=[singlemail]
            elif mtype=='Send Mail as CC':
                msg['To'] =','.join(contact_list)
                smail=contact_list
            elif mtype=='Send Mail as BCC':
                msg['To'] =','.join(singlemail)
                smail=contact_list
            html="""\

            """+body+"""

            """
            part2 = MIMEText(html, 'html')
            msg.attach(part2)
            mail.sendmail(smtp_data['email'],smail , msg.as_string())
            mail.quit()



            if mtype=='Send Mail' or mtype=='Send Mail as CC' or mtype=='Send Mail as BCC':
                if ref.child('inbox').child(user) is None:
                    ref.child('inbox').child(user).set({
                        'mails' : []
                    })
                ref.child('inbox').child(user).child('mails').push({
                    'from' : smtp_data['email'],
                    'to' : smail,
                    'subject' : subject,
                    'message' : body,
                    'time' : datetime.now().strftime("%d/%m/%Y %H:%M:%S")
                })


            
            return jsonify({
                    'status': True,
                    'message': 'Mail sent',
                    'code' : 'Success',
                    
                    })
          
        except Exception as e:
            return jsonify({
                'status': False,
                'message': 'Error while sending mail : {}'.format(e),
                'code' : 'Error'
            })


@app.route('/getmail', methods=['GET'])
def getmail():
    if request.method == 'GET':
        try:
            
            mail = ref.child('inbox').get()
            if mail is None:
                return jsonify({
                    'status': False,
                    'message': 'No mails',
                    'code' : 'Error'
                })
            else:
                return jsonify({
                    'mails': mail
                    
                })
        except Exception as e:
            return jsonify({
                'status': False,
                'message': 'Error while getting mail : {}'.format(e),
                'code' : 'Error'
            })



# ref.child('inbox').child('vtuppalwad').delete()
# print(ref.child('users').child('vtuppalwad').get())
if __name__ == '__main__':
    app.run(debug=True)

