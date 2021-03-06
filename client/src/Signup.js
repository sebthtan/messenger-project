import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import useStyles from './Styles'
import HomeSideBanner from "./components/HomeSideBanner/HomeSideBanner";


const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
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
    <Grid container className={classes.main}>
      <Hidden xsDown>
        <HomeSideBanner />
      </Hidden>
      <Grid item xs={12} sm={8} md={7} className={classes.page}>
        <Grid container spacing={4} className={classes.redirectHeader}>
          <Typography
            className={classes.label}>Already have an account?
          </Typography>
          <Button
            onClick={() => history.push("/login")}
            variant='contained'
            size='large'
            className={classes.redirect}
          >Login</Button>
        </Grid>
        <Grid container direction='column' className={classes.root}>
          <Typography variant="h4" className={classes.formMessage}>Create an account.</Typography>
          <form onSubmit={handleRegister} className={classes.loginSignup}>
            <FormControl margin='normal' className={classes.full}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                className={classes.input}
              />
            </FormControl>
            <FormControl margin='normal' className={classes.full}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                className={classes.input}
              />
            </FormControl>
            <FormControl margin='normal' className={classes.full}>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                className={classes.input}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color='primary'
              className={classes.submit}>
              Create
            </Button>
          </form>
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
