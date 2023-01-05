import axios from "axios";

const register = (artical) => {
  try {
    return axios
      .post("http://localhost:5000/register", artical)
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

export default register;
