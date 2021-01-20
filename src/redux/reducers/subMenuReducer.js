const subMenuReducer = (state = "", action) => {
  if (action.type === "SUB_MENU") {
    return action.value;
  } else {
    return state;
  }
};

export default subMenuReducer;
