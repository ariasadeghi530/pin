import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../../../utils/UserContext'
import {Redirect} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        PIN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signLogo: {
    height: "20%",
    width: "20%",
    marginBottom: 7,
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [signupSubmissionState, setSignupSubmissionState] = useState({
    first: '',
    last: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
    error: false,
    message: '',
    fields: {},
    errors: {}
  });

  const handleValidation = () => {
    let fields = signupSubmissionState.fields;
    let errors = signupSubmissionState.errors;
    let formIsValid = true;
    if (!fields["first"]) {
      formIsValid = false;
      errors["first"] = "Cannot be empty"
    }
    if (!fields["last"]) {
      formIsValid = false;
      errors["last"] = "Cannot be empty"
    }
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }  
    setSignupSubmissionState({ errors: errors});
    return formIsValid;
  };

  signupSubmissionState.handleInputChage = event => {
    setSignupSubmissionState({ ...signupSubmissionState, [event.target.name]: event.target.value });
  }

   const {first, last, email, username, password, github, handleInputChange, handleRegisterUser, isLoggedIn} = useContext(UserContext);

  return (
    <>
    { isLoggedIn ? <Redirect to={{pathname: '/'}}/> :
    (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      
        <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.signLogo} alt="pin logo"/>
      
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signupSubmissionState.message !== '' ? <div> {signupSubmissionState.error ? <Alert severity="error">{signupSubmissionState.message}</Alert> : <Alert severity="success">{signupSubmissionState.message}</Alert>}</div> : console.log(signupSubmissionState.message)}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first"
                value={first}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last"
                autoComplete="lname"
                value={last}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="github"
                label="GitHub username"
                name="github"
                value={github}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegisterUser}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>)
  }
  </>
  );
}