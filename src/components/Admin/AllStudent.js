import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Loading from "./../../components/LoginRegister/Loading";

const columns = [
  {
    width: 50,
    label: "SL",
    dataKey: "SerialNumber",
    numeric: true,
  },
  {
    width: 200,
    label: "Name",
    dataKey: "Name",
  },
  {
    width: 120,
    label: "Email",
    dataKey: "Email",
    numeric: true,
  },
  {
    width: 120,
    label: "Course",
    dataKey: "Course",
    numeric: true,
  },
  {
    width: 120,
    label: "Enroll Date",
    dataKey: "EnrollDate",
    numeric: true,
  },
  {
    width: 120,
    label: "৳ Amount",
    dataKey: "Amount",
    numeric: true,
  },
];

export default function AllStudent() {
  const [sample, setSample] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/payment/allstudent")
      .then((res) => res.json())
      .then((result) => {
        setSample(
          result.map((details, index) => ({
            SerialNumber: index + 1, // Generate serial number based on index
            Name: details.customerName,
            Email: details.customerEmail,
            Course: details.courseName,
            EnrollDate: details.insertedAt.split("T")[0], // Extract only the date
            Amount: details.total,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const courseNames = [...new Set(sample.map((data) => data.Course))];
  const filteredSample = sample
    .filter((data) => (courseFilter ? data.Course === courseFilter : true))
    .map((data, index) => ({
      ...data,
      SerialNumber: index + 1, // Generate new serial number based on filtered index
    }));

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8 text-center ">
            <h1 className="p-4">Student List</h1>
          </div>
        </div>
      </div>
      <div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          {courseNames.map((courseName) => (
            <option key={courseName} value={courseName}>
              {courseName}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Paper style={{ height: 400, width: "100%" }}>
          <TableVirtuoso
            data={filteredSample}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </div>
  );
}
