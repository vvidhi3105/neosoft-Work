export const addEmployee = (data) => {
  return {
    type: "AddEmployee",
    payloadData: data,
  };
};
export const editEmployee = (data) => {
  return {
    type: "EditEmployee",
    payloadData: data,
  };
};
export const deleteEmployee = (id) => {
  return {
    type: "DeleteEmployee",
    payloadData: id,
  };
};
