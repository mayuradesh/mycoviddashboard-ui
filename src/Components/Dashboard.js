import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Chart } from "react-charts";

import api from "../api";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
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
  let history = useHistory();
  const [data, upDateData] = React.useState([]);
  const [chartData, upDateChartData] = React.useState([]);
  const [chartData1, upDateChartData1] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [firstLoad, setLoad] = React.useState(true);

  async function loadCovidCases() {
    setLoading(true);
    api
      .getCovidStatus()
      .then((res) => {
        console.log("Success:", res.data);
        let chartData = [];
        let chartData1 = [];
        res.data.map((countryData) => {
          chartData.push({
            label: countryData.country,
            data: [[countryData.totalCases, countryData.activeCases]],
          });
          chartData1.push({
            label: countryData.country,
            data: [[countryData.totalCases, countryData.totalDeaths]],
          });
        });
        upDateChartData(chartData);
        upDateChartData1(chartData1);
        upDateData(res.data);
        setLoading(false);
      }) // re-direct to login on successful register
      .catch((err) => {
        setLoading(false);
        console.log("Errors:", err.response.data);
      });
  }

  if (firstLoad) {
    loadCovidCases();
    setLoad(false);
  }

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );
  const axes1 = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );
  function doLogout() {
    localStorage.clear();
    history.push("/");
  }
  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  const series1 = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  return (
    <div className={classes.paper}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography component="h3" variant="h5">
                    Covid 19 Active Cases/Total Cases
                  </Typography>
                  <p></p>
                  <div
                    style={{
                      width: "100%",
                      height: "280px",
                    }}
                  >
                    <Chart
                      data={chartData}
                      series={series}
                      axes={axes}
                      tooltip
                    />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Typography component="h3" variant="h5">
                    Covid 19 Deaths /Total Cases
                  </Typography>
                  <p></p>
                  <div
                    style={{
                      width: "100%",
                      height: "280px",
                    }}
                  >
                    <Chart
                      data={chartData1}
                      series={series1}
                      axes={axes1}
                      tooltip
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <p></p>
          <TableContainer
            style={{ width: "100%", margin: "10px" }}
            component={Paper}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Country</TableCell>
                  <TableCell align="center">Total Cases</TableCell>
                  <TableCell align="center">Active Cases</TableCell>
                  <TableCell align="center">Total Recovered</TableCell>
                  <TableCell align="center">Total Deaths</TableCell>
                  <TableCell align="center">Serious Critical</TableCell>
                  <TableCell align="center">New Cases</TableCell>
                  <TableCell align="center">New Deaths</TableCell>
                  <TableCell align="center">Last Update Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow key={row.country}>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">{row.totalCases}</TableCell>
                    <TableCell align="center">{row.activeCases}</TableCell>
                    <TableCell align="center">{row.totalRecovered}</TableCell>
                    <TableCell align="center">{row.totalDeaths}</TableCell>
                    <TableCell align="center">{row.seriousCritical}</TableCell>
                    <TableCell align="center">{row.newCases}</TableCell>
                    <TableCell align="center">{row.newDeaths}</TableCell>
                    <TableCell align="center">
                      {new Date(row.lastUpdateDate).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={doLogout}
      >
        Logout
      </Button>
    </div>
  );
}
