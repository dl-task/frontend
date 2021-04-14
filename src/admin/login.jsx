import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";
import "./index.css";
import { serverUrl } from "../config";

const Login = () => {
  const initialValues = {
    email: "",
    password: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = formValues;
    setPasswordError(false);
    setEmailError(false);
    if (password === "") {
      setPasswordError(true);
    }
    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (password && validateEmail(email)) {
      const res = await fetch(`${serverUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }).then(res => res.json());
      if (res.token) {
        localStorage.setItem('token', res.token)
        history.push('/admin/dashboard')
      } else {
        setOpenToast(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  return (
    <div>
      <Grid container justify="center" direction="row" className="contact-form">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className="contact-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="contact-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Contact Us
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        type="email"
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={formValues.email}
                        error={emailError}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={formValues.password}
                        error={passwordError}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Please enter correct details"
      />
    </div>
  );
};

export default Login;
