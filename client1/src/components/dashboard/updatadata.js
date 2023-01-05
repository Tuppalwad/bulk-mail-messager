import axios from "axios";

const updateProfiledata = (artical) => {
  try {
    return axios
      .post("http://localhost:5000/updateProfile", artical)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return err;
  }
};

export default updateProfiledata;
