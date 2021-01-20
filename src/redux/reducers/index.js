import { combineReducers } from "redux";
import areaReducer from "./areaReducer";
import menuReducer from "./menuReducer";
import subMenuReducer from "./subMenuReducer";

const allReducers = combineReducers({
  selectedMenu: menuReducer,
  selectedSubMenu: subMenuReducer,
  expandedArea: areaReducer,
});

export default allReducers;
