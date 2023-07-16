import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataTable from "./datatable/DataTable";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "./ConfirmPopup";
import { deleteEmployee } from "../redux/action/EmployeeAction";

const Home = () => {
  const EmployeeData = useSelector((state) => state.EmployeeReducer);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(EmployeeData);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [showpopup, setShowPopup] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [designation, setDesignation] = useState([]);
  const [designationData, setDesignationData] = useState("");
  const [salaryData, setSalaryData] = useState("");
  const salaryOptionData = [
    { key: "Less than 50,000", value: "less than 50,000" },
    { key: "50,000 - 1,00,000", value: "50,000 - 1,00,000" },
    { key: "Greater than 1,00,000", value: "greater than 1,00,000" },
  ];

  const filterDesignation = () => {
    let designationDetails = [],
      uniqueIds = [],
      formDetails = [...tableData];
    formDetails = formDetails.forEach((item) => {
      designationDetails = [
        ...designationDetails,
        { key: item.designation, value: item.designation },
      ];
    });
    designationDetails = designationDetails.filter((item) => {
      const isDuplicate = uniqueIds.includes(item.key);
      if (!isDuplicate) {
        uniqueIds.push(item.key);
        return true;
      }
      return false;
    });
    setDesignation(designationDetails);
  };

  const filterByDesignation = (data) => {
    let formDetails = [...EmployeeData];
    formDetails = formDetails.filter((item) => {
      if (item.designation == data) {
        return true;
      } else if (data === "") {
        return true;
      }
    });
    setDesignationData(data);
    setTableData(formDetails);
  };

  const filterBySalary = (data) => {
    let formDetails = [...EmployeeData];
    formDetails = formDetails.filter((item) => {
      if (data === "less than 50,000") {
        if (item.salary <= 50000) {
          return true;
        }
      } else if (data === "50,000 - 1,00,000") {
        if (item.salary > 50000 && item.salary <= 100000) {
          return true;
        }
      } else if (data === "greater than 1,00,000") {
        if (item.salary > 100000) {
          return true;
        }
      } else {
        return true;
      }
    });
    setSalaryData(data);
    setTableData(formDetails);
  };

  const handleSorting = (name, type) => {
    if (sortBy !== name) {
      setOrderBy("asc");
    }
    let tableDetails = [...tableData];
    if (type === "number") {
      tableDetails = tableDetails.sort(function (a, b) {
        if (orderBy === "asc") {
          setOrderBy("dsc");
          return a[name] - b[name];
        } else {
          setOrderBy("asc");
          return b[name] - a[name];
        }
      });
    } else if (type === "string") {
      tableDetails = tableDetails.sort(function (a, b) {
        if (orderBy === "asc") {
          setOrderBy("dsc");
          let firstdata = a[name].toLowerCase();
          let secondData = b[name].toLowerCase();
          if (firstdata < secondData) {
            return -1;
          }
          if (firstdata > secondData) {
            return 1;
          }
          return 0;
        } else {
          setOrderBy("asc");
          let firstdata = a[name].toLowerCase();
          let secondData = b[name].toLowerCase();
          if (firstdata > secondData) {
            return -1;
          }
          if (firstdata < secondData) {
            return 1;
          }
          return 0;
        }
      });
    }
    setTableData(tableDetails);
  };
  const handleDelete = (id) => {
    setShowPopup(true);
    setDeleteRecord(id);
  };
  const handledeleteRecord = () => {
    dispatch(deleteEmployee(deleteRecord));
    setShowPopup(false);
  };
  useEffect(() => {
    setTableData(EmployeeData);
    filterDesignation();
  }, [EmployeeData]);
  return (
    <>
      {showpopup && (
        <ConfirmPopup
          handleDelete={() => handledeleteRecord()}
          setPopupVisibility={(data) => setShowPopup(data)}
          message="Are You Sure You Want To Delete This Item?"
        />
      )}
      <Navbar />
      <div id="tableList">
        <h4>Employee List</h4>
        <div id="filter-pannel">
          <label>
            <strong>Filter By :</strong>
          </label>
          <Dropdown
            className="form-control"
            optionList={designation}
            value={designationData}
            selectLabel="Designation"
            onChange={(data) => filterByDesignation(data.target.value)}
          />

          <Dropdown
            className="form-control"
            optionList={salaryOptionData}
            value={salaryData}
            selectLabel="Salary"
            onChange={(data) => filterBySalary(data.target.value)}
          />
        </div>
        <DataTable
          tableData={tableData}
          sorting={(data, type) => handleSorting(data, type)}
          deleteRecord={(id) => handleDelete(id)}
        />
      </div>
    </>
  );
};

export default Home;
