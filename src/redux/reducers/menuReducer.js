const menuReducer = (state = "", action) => {
  if (action.type === "MENU") {
    return action.value;
  } else {
    return state;
  }
};

export default menuReducer;
