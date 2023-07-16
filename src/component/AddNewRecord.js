import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Navbar from "./Navbar";
import ButtonField from "./ButtonField";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, editEmployee } from "../redux/action/EmployeeAction";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "./Dropdown";

const AddNewRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EmployeeDetails = useSelector((state) => state.EmployeeReducer);
  const [employeeData, setEmployeeData] = useState(EmployeeDetails);
  const [editData, setEditData] = useState({});
  const designationOption = [
    { key: "Designer", value: "Designer" },
    { key: "Manager", value: "Manager" },
    { key: "Tester", value: "Tester" },
  ];

  let { id } = useParams();
  const InitialFormData = {
    id: "",
    name: "",
    designation: "",
    salary: "",
  };
  const [formData, setFormData] = useState(InitialFormData);
  const handleChange = (data) => {
    let formDetails = { ...formData };
    formDetails = { ...formDetails, [data.target.name]: data.target.value };
    setFormData(formDetails);
  };
  const handleSubmit = (type) => {
    if (type === "add") {
      dispatch(addEmployee(formData));
      setFormData(InitialFormData);
    } else if (type === "edit") {
      dispatch(editEmployee(formData));
    }
    navigate("/home");
  };

  const editRecordList = () => {
    let editDetails = [...employeeData];
    editDetails = editDetails.filter((item) => {
      return item.id === id;
    });
    if (editDetails.length > 0) {
      setFormData(editDetails[0]);
    } else {
      setFormData(InitialFormData);
    }
    setEditData(editDetails);
  };

  useEffect(() => {
    if (id) {
      editRecordList();
    } else {
      editRecordList([]);
    }
  }, [EmployeeDetails, id]);

  return (
    <>
      <Navbar />
      <div id="form-container">
        <h4>Employee Form</h4>
        <InputField
          label="Employee ID"
          placeholder="Employee ID"
          onChange={(data) => {
            if (/^\d+$/.test(data.target.value) || data.target.value === "") {
              handleChange(data);
            }
          }}
          name="id"
          value={formData.id}
        />
        <InputField
          label="Employee Name"
          placeholder="Employee Name"
          onChange={(data) => {
            if (
              /^[a-zA-Z ]*$/.test(data.target.value) ||
              data.target.value === ""
            ) {
              handleChange(data);
            }
          }}
          name="name"
          value={formData.name}
        />
        {/* <InputField
          label="Designation"
          placeholder="Designation"
          onChange={(data) => handleChange(data)}
          name="designation"
          value={formData.designation}
        /> */}
        <div>
          <label>Designation</label>
          <Dropdown
            selectLabel="Select Designation"
            className="form-control"
            optionList={designationOption}
            onChange={(data) => handleChange(data)}
            value={formData.designation}
            name="designation"
          />
        </div>
        <InputField
          label="Salary"
          placeholder="Salary"
          onChange={(data) => {
            if (/^\d+$/.test(data.target.value) || data.target.value === "") {
              handleChange(data);
            }
          }}
          name="salary"
          value={formData.salary}
        />
        <div className="button-action">
          <ButtonField
            buttonName={`${
              editData.length > 0 ? "EDIT DETAILS" : "SUBMIT DETAILS"
            }`}
            onClick={(data) => {
              if (editData.length > 0) {
                handleSubmit("edit");
              } else {
                handleSubmit("add");
              }
            }}
            className="button-success"
          />
          {editData.length > 0 && (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ButtonField
                buttonName="CANCEL"
                onClick={(data) => navigate("/")}
                className="button-danger"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewRecord;
