import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  const [firstLoad, setLoad] = React.useState(true);

  const [username, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUserNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [message, setMessage] = React.useState("Nothing saved in the session");

  async function doLogin(toInput) {
    // const response = await fetch("http://localhost:8080/api/sign-in", {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   // mode: "cors", // no-cors, *cors, same-origin
    //   // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   // credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   // redirect: "follow", // manual, *follow, error
    //   // referrerPolicy: "no-referrer", // no-referrer, *client
    //   body: JSON.stringify(toInput), // body data type must match "Content-Type" header
    // });
    const response = await fetch("http://localhost:8080/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toInput), // body data type must match "Content-Type" header
    });
    console.log(response);
    // let body = await response.json();
    // console.log(body.id);
    // setMessage(body.id ? "Login successful" : "Login Failed");
  }

  const handleSubmit = (variables) => {
    const toInput = { username, password };
    doLogin(toInput);
    setName("");
    setPassword("");
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }

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
                id="username"
                value={username}
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={handleUserNameChange}
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
