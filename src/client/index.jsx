import { useState } from "react";
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

const ContactUs = () => {
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, message } = formValues;
    setNameError(false);
    setEmailError(false);
    setMessageError(false);
    if (fullName === "") {
      setNameError(true);
    }
    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (message === "") {
      setMessageError(true);
    }
    if (fullName && validateEmail(email) && message) {
      const res = await fetch(`${serverUrl}/enquiry/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (res.status === 200) {
        setOpenToast(true);
        setFormValues(initialValues);
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
                        fullWidth
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        onChange={handleChange}
                        value={formValues.fullName}
                        error={nameError}
                      />
                    </Grid>
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
                        label="Message"
                        name="message"
                        onChange={handleChange}
                        value={formValues.message}
                        error={messageError}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
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
        message="Your contact enquiry has been sent successfully"
      />
    </div>
  );
};

export default ContactUs;
