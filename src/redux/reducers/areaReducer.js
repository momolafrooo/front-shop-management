const areaReducer = (state = false, action) => {
  switch (action.type) {
    case "EXPAND_AREA":
      return action.value;
    case "CONTRACT_AREA":
      return action.value;
    default:
      return false;
  }
};

export default areaReducer;
