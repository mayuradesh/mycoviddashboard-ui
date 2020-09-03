import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Chart } from "react-charts";

import api from "../api";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `10px`,
    height: "100%",
    width: "99%",
    marginTop: theme.spacing(7),
  },
  link: {
    color: "rgba(0,0,0,0.65)",
    textDecoration: "none",
    marginLeft: "10%",
    alignSelf: "flex-start",
    "&:hover": {
      color: "rgba(0,0,0,1)",
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  // const [data, upDateData] = React.useState([]);
  const [firstLoad, setLoad] = React.useState(true);
  let isLoading = false;

  async function sampleFunc() {
    api
      .getHello()
      .then((res) => {
        console.log("Success:", res.data);
      }) // re-direct to login on successful register
      .catch((err) => {
        console.log("Errors:", err.response.data);
      });
    //upDateData(body);
  }

  if (firstLoad) {
    sampleFunc();
    setLoad(false);
  }

  //     if (data.length > 0) isLoading = false;

  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
      {
        label: "Series 2",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Covid 19 Cases
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          style={{ width: "50%", margin: "10px" }}
          component={Paper}
        >
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <Chart data={data} axes={axes} />
          </div>
        </TableContainer>
      )}
      <Link className={classes.link} to="/">
        {" "}
        <Typography align="left">&#x2190; Logout</Typography>{" "}
      </Link>
    </div>
  );
}

// export default function Dashboard() {
//     const classes = useStyles();

//     const [data, upDateData] = React.useState([]);
//     const [firstLoad, setLoad] = React.useState(true);
//     let isLoading = true;

//     async function sampleFunc() {
//         let response = await fetch("/api/employee");
//         let body = await response.json();
//         upDateData(body);
//     }

//     if (firstLoad) {
//         sampleFunc();
//         setLoad(false);
//     }

//     if (data.length > 0) isLoading = false;

//     return (
//         <div className={classes.paper}>
//             <Avatar className={classes.avatar}>
//                 <GroupIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//                 Employee Directory
//             </Typography>

//             {isLoading ? (
//                 <CircularProgress />
//             ) : (
//                 <TableContainer
//                     style={{ width: "80%", margin: "0 10px" }}
//                     component={Paper}
//                 >
//                     <Table className={classes.table} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell align="center">Name</TableCell>
//                                 <TableCell align="center">Department</TableCell>
//                                 <TableCell align="center">Gender</TableCell>
//                                 <TableCell align="center">Dob</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {data?.map(row => (
//                                 <TableRow key={row.name}>
//                                     <TableCell align="center">{row.name}</TableCell>
//                                     <TableCell align="center">{row.department}</TableCell>
//                                     <TableCell align="center">{row.gender}</TableCell>
//                                     <TableCell align="center">{row.dob}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//             <Link className={classes.link} to="/">
//                 {" "}
//                 <Typography align="left">
//                     &#x2190; Head back to save data
//                 </Typography>{" "}
//             </Link>
//         </div>
//     );
// }
