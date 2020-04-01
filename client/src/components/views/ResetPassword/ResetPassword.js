import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

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
    marginTop: theme.spacing(1),
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

const PasswordReset = () => {
  const classes = useStyles();

  const [resetSubmissionState, setResetSubmissionState] = useState({
    password: '',
    confirm: '',
    error: false, 
    message: ''
  });

  resetSubmissionState.handleInputChage = event =>{
    setResetSubmissionState({...resetSubmissionState, [event.target.name]: event.target.value});
  }
  resetSubmissionState.handlePasswordReset = event =>{
    event.preventDefault();
    let newPassword = {
      password: resetSubmissionState.password,
      confirm: resetSubmissionState.confirm
    };
    let path = window.location.pathname;
    let token = path.slice(15);
    
   if(resetSubmissionState.password !== '' || resetSubmissionState.confirm !== ''){
      axios.put(`/api/resetPassword/${token}`, {password: resetSubmissionState.password, confirm: resetSubmissionState.confirm})
    .then(({data: {message}})=> {
      if(message === "Password successfully reset!"){
        setResetSubmissionState({...resetSubmissionState, error: false, message,
        password: '', confirm: ''})
      } else {
        setResetSubmissionState({...resetSubmissionState, error: true, message,
          password: '', confirm: ''})
      }
    })
    .catch(e => console.error(e))
  }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.signLogo} alt="pin logo" />
        <Typography component="h1" variant="h5">
          Confirm Your Password Reset
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Enter your new password
        </Typography>
        {resetSubmissionState.message !== '' ? <div> { resetSubmissionState.error ? <Alert severity="error">{resetSubmissionState.message}</Alert>: <Alert severity="success">{resetSubmissionState.message}</Alert>}</div> : console.log(resetSubmissionState.message)}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            onChange={resetSubmissionState.handleInputChage}
            value={resetSubmissionState.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            onChange={resetSubmissionState.handleInputChage}
            value={resetSubmissionState.confirm}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={resetSubmissionState.handlePasswordReset}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default PasswordReset;