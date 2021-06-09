import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Hidden,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import useStyles from './Styles'
import HomeSideBanner from "./components/HomeSideBanner/HomeSideBanner";


const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles()

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component='main'>
      <Hidden xsDown>
        <HomeSideBanner />
      </Hidden>
      <Grid item xs={12} sm={8} md={6} style={{ padding: '20px' }}>
        <Grid container spacing={4} direction='row' justify='flex-end' alignItems='center'>
          <Grid item>
            <Typography
              className={classes.label}>Already have an account?
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => history.push("/login")}
              variant='contained'
              size='large'
              className={classes.redirect}
            >Login</Button>
          </Grid>
        </Grid>
        <Grid container direction='column' className={classes.root}>
          <Grid container direction='column' className={classes.form}>
            <Typography variant="h4" className={classes.formMessage}>Create an account.</Typography>
            <form onSubmit={handleRegister} className='login-signup'>
              <Grid className={classes.xcentered}>
                <FormControl margin='normal' className={classes.full}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    className={classes.input}
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.xcentered}>
                <FormControl margin='normal' className={classes.full}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    className={classes.input}
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.xcentered}>
                <FormControl margin='normal' className={classes.full} error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    className={classes.input}
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid className={classes.xcentered}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color='primary'
                  className={classes.submit}>
                  Create
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
