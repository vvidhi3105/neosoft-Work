import React from "react";
import { FaSort, FaPen, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
const DataTable = (props) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>
            Employee Id <FaSort onClick={() => props.sorting("id", "number")} />
          </th>
          <th>
            Employee Name{" "}
            <FaSort onClick={() => props.sorting("name", "string")} />
          </th>
          <th>
            Designation{" "}
            <FaSort onClick={() => props.sorting("designation", "string")} />
          </th>
          <th>
            Salary <FaSort onClick={() => props.sorting("salary", "number")} />
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No Records Found
            </td>
          </tr>
        ) : (
          props.tableData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.salary}</td>
                <td className="action-column">
                  <Link to={`/editRecord/${item.id}`}>
                    <FaPen title="Edit" />
                  </Link>
                  &nbsp;&nbsp;
                  <FaXmark
                    title="Delete"
                    onClick={() => props.deleteRecord(item.id, item.name)}
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
