import React from "react";
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import api from "../api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [errors, setErrors] = React.useState({});

  async function doLogin(toInput) {
    setLoading(true);
    api
      .loginUser(JSON.stringify(toInput))
      .then((res) => {
        setLoading(false);
        console.log("Success:", res.data);
        localStorage.setItem('authenticated', true);
        history.push("/dashboard");
      }) // re-direct to login on successful register
      .catch((err) => {
        setLoading(false);
        console.log("Errors:", err.response.data);
        setErrors(err.response.data);
      });
  }

  const handleSubmit = (variables) => {
    const toInput = { email, password };
    doLogin(toInput);
  };
  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <CircularProgress />
        </div>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <GroupIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  value={password}
                  id="password"
                  label="Password"
                  onChange={handlePasswordChange}
                  error={errors.password ? true : false}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
        <Grid container justify="center">
          <Grid item>
            <Link to="/signup">New User? Click here to register?</Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
