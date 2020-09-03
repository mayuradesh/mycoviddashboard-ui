import React from "react";

import { Link, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { API_URL } from "../config";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function SignUp() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();

  const [name, setFirstName] = React.useState("");
  const [surname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [errors, setErrors] = React.useState({});

  async function doRegister(toInput) {
    console.log(JSON.stringify(toInput));
    setLoading(true);
    let response = await fetch(`${API_URL}sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toInput), // body data type must match "Content-Type" header
    });
    let body = await response.json();
    setLoading(false);
    if (!response.ok) {
      console.log("Errors:", body);
      setErrors(body);
    } else {
      console.log("Success:", body);
      history.push("/");
    }
  }

  const handleSubmit = (variables) => {
    const toInput = { name, surname, email, password };
    doRegister(toInput);
  };

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <CircularProgress />
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center">
            <Grid item>
              <Link to="/">Already registered? Click here to Login?</Link>
            </Grid>
          </Grid>
          <Avatar className={classes.avatar}>
            <GroupIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register User
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  label="First Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleFirstNameChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  value={surname}
                  label="Last Name"
                  name="surname"
                  autoComplete="surname"
                  onChange={handleLastNameChange}
                  error={errors.surname ? true : false}
                  helperText={errors.surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  type="email"
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
                  value={password}
                  type="password"
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
      </Container>
    );
  }
}
