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
  Link,
  InputAdornment,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import HomeSideBanner from './components/HomeSideBanner/HomeSideBanner'
import useStyles from './Styles'

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login({ email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component='main'>
      <Hidden xsDown>
        <HomeSideBanner />
      </Hidden>
      <Grid item xs={12} sm={8} md={7} className={classes.page}>
        <Grid container spacing={4} className={classes.redirectHeader}>
          <Grid item>
            <Typography
              className={classes.label}>Don't have an account?
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => history.push("/register")}
              variant='contained'
              size='large'
              className={classes.redirect}
            >Create account</Button>
          </Grid>
        </Grid>
        <Grid container direction='column' className={classes.root}>
          <Grid container direction='column' className={classes.form}>
            <Grid container>
              <Typography variant="h4" className={classes.formMessage}>Welcome back!</Typography>
            </Grid>
            <form onSubmit={handleLogin} className={classes.loginSignup}>
              <Grid className={classes.xcentered}>
                <FormControl margin='normal' className={classes.full}>
                  <TextField
                    aria-label="email"
                    label="E-mail address"
                    name="email"
                    type="text"
                    className={classes.input}
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.xcentered}>
                <FormControl margin='normal' className={classes.full}>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                    className={classes.input}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment component={Link} position="start">
                          <Link href="#" color="primary">
                            {"Forgot?"}
                          </Link>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.xcentered}>
                <Button type="submit"
                  variant="contained"
                  size="large"
                  color='primary'
                  className={classes.submit}
                >
                  Login
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid >


  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
