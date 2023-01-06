import axios from "axios";

const login = (artical) => {
  try {
    return axios
      .post("http://localhost:5000/login", artical)
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

export default login;
