const EmployeeReducer = (State = [], action) => {
  switch (action.type) {
    case "AddEmployee":
      let employeeDetailsAdd = [...State];
      employeeDetailsAdd = [...employeeDetailsAdd, action.payloadData];
      State = employeeDetailsAdd;
      return State;
    case "EditEmployee":
      let employeeDetailsEdit = [...State];
      employeeDetailsEdit.forEach((item) => {
        if (item.id == action.payloadData.id) {
          item.id = action.payloadData.id;
          item.name = action.payloadData.name;
          item.designation = action.payloadData.designation;
          item.salary = action.payloadData.salary;
        }
      });
      State = employeeDetailsEdit;
      return State;
    case "DeleteEmployee":
      let employeeDetailsDelete = [...State];
      let a = employeeDetailsDelete.filter((item) => {
        if (item.id !== action.payloadData) {
          return item;
        }
      });
      State = a;
      return State;
    default:
      return State;
  }
};
export default EmployeeReducer;
