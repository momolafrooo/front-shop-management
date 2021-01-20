// Select a menu
export const menu = (value) => {
  return {
    type: "MENU",
    value: value,
  };
};

// Select a sub_menu
export const sub_menu = (value) => {
  return {
    type: "SUB_MENU",
    value: value,
  };
};

// Expand area
export const expand_area = (value) => {
  return {
    type: "EXPAND_AREA",
    value: value,
  };
};

// Contract area
export const contract_area = (value = "") => {
  return {
    type: "CONTRACT_AREA",
    value: value,
  };
};
