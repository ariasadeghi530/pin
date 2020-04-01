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

export default function Reset() {
  const classes = useStyles();
  const [forgotPasswordState, setForgotPasswordState] = useState({
    email:'',
    message: '',
    error: false
  });
  
  forgotPasswordState.handleInputChange = event =>{
    setForgotPasswordState({...forgotPasswordState, [event.target.name]: event.target.value});
  }

  forgotPasswordState.sendEmail = event =>{
    event.preventDefault();
    if(forgotPasswordState.email === ''){
      setForgotPasswordState({...forgotPasswordState, error: false, message: ''})
    }
    else{
     
      axios.post('/api/forgotPassword', {email: forgotPasswordState.email})
      .then(({data:{message}}) => {
        
        if(message === "Recovery email has been sent!"){
        setForgotPasswordState({...forgotPasswordState, message, error: false, email: ''});
        } else {
          setForgotPasswordState({...forgotPasswordState, message, error: true});
        }
      })
      .catch(e => console.error(e));
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.signLogo} alt="pin logo" />
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          We will send a password reset link to your email
        </Typography>
      { forgotPasswordState.message !== '' ? <div>{forgotPasswordState.error ? <Alert severity="error">{forgotPasswordState.message}</Alert>: <Alert severity="success">{forgotPasswordState.message}</Alert>}</div> : console.log('')}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email address"
            type="email"
            value={forgotPasswordState.email}
            onChange={forgotPasswordState.handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={forgotPasswordState.sendEmail}
          >
            Submit
          </Button>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}