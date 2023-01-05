const deleteContact = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_CONTACT", id });
  };
};
