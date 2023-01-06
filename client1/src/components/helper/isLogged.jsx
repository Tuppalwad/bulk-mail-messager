export default function isLogged() {
  try {
    const token = localStorage.getItem("token");
    const usr = JSON.parse(localStorage.getItem("user"));
    if (token && usr) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
