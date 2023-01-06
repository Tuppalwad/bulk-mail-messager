const checkData = () => {
  if (localStorage.getItem("user") === null) {
    return false;
  } else {
    if (
      localStorage.getItem("smtpConfig").length == 3 &&
      localStorage.getItem("user") == 3 &&
      localStorage.getItem("segmentConfig").length != 0
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export default checkData;
