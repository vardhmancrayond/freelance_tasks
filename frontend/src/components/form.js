import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import { Login, SignUp } from "../services";
import { AuthContext } from "../contexts";

const form_actions = {
  signin: Login,
  signup: SignUp,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();

  const [type, setType] = React.useState("signin");
  const [credentials, setCredentials] = React.useState({});
  const [error, setError] = React.useState();
  const Auth = React.useContext(AuthContext);

  const switch_type = () => {
    if (type === "signin") {
      setType("signup");
    } else {
      setType("signin");
    }
  };

  const submit = () => {
    form_actions[type](credentials)
      .then((response) => {
        if (response.status === 200) {
          Auth.setAuth({ user: response.data["userData"] });
          localStorage.setItem("token", response.data["token"]);
        }
      })
      .catch((err) => {
        setError(err.response.data["message"]);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {type === "signin" ? (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        ) : (
          <Avatar className={classes.avatar}>
            <ContactsOutlinedIcon />
          </Avatar>
        )}

        <Typography component="h1" variant="h5">
          {type === "signin" ? `Sign In` : `Sign Up`}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => {
              setCredentials({
                ...credentials,
                [event.target.name]: event.target.value,
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setCredentials({
                ...credentials,
                [event.target.name]: event.target.value,
              });
            }}
          />
          {type === "signin" ? (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          ) : (
            <></>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            {type === "signin" ? `Sign In` : `Sign Up`}
          </Button>
          <Grid container>
            {error && (
              <Grid item xs={12}>
                <Typography
                  component="p"
                  variant="body2"
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingBottom: "5px",
                  }}
                >
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Link onClick={switch_type} variant="body2">
                {type === "signin"
                  ? "Don't have an account? Sign Up"
                  : "Have Account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
