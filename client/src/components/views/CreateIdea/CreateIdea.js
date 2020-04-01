import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import { ClickAwayListener } from '@material-ui/core';
import PostContext from '../../../utils/PostContext';
import UserContext from '../../../utils/UserContext';
import  { Redirect }  from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '1rem'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    width: '100%', // Fix IE 11 issue.
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
    marginLeft: 0,
  },
  inline: {
    display: 'inline',
  },
  button: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

function CreateIdea() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);


  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const { title, description, difficulty, totalTime, handleCreateNewPost, handleInputChange } = useContext(PostContext);
  const {isLoggedIn, user} = useContext(UserContext);
  
  return (
<> {isLoggedIn ? 
    (<Container className={classes.container}component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Post an Idea
      </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="title"
              label="Project Title"
              name="title"
              className={classes.input}
              value={title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline={true}
              rows={10}
              variant="outlined"
              fullWidth
              id="text"
              label="Project Description"
              name="description"
              className={classes.input}
              value={description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.inline}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="difficulty">Difficulty</InputLabel>
              <Select
                label="difficulty"
                name="difficulty"
                value={difficulty}
                onChange={handleInputChange} >
                <MenuItem value={'Easy'}>Easy</MenuItem>
                <MenuItem value={'Moderate'}>Moderate</MenuItem>
                <MenuItem value={'Hard'}>Hard</MenuItem>
              </Select>
            </FormControl>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableTouchListener
                title="Select a difficulty for your project">
                <Button onClick={handleTooltipOpen}>
                  <HelpOutlineIcon />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="time"
              label="Estimated Time to Complete"
              name="totalTime"
              value={totalTime}
              onChange={handleInputChange}
              className={classes.input}
            />
          </Grid>
          <Button variant="contained" 
            color="primary"
            className={classes.button}
            onClick={handleCreateNewPost}>
            Post
          </Button>
        </form>
      </div>
    </Container>) :  <Redirect to={{pathname: '/signin'}} />}
</>
  );
}

export default CreateIdea;