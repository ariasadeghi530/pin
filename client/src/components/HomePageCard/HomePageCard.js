import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    textAlign: "right"
  }
});

function HomePageCard() {

  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Calumbelot
          </Typography>
        <Typography variant="h4" component="h2">
          To-do List
          <Typography variant="body2" component="p">
            Difficulty: Easy
          </Typography>
        </Typography>
        <Typography variant="body2" component="p">
          <br />
          This is a beginner level application where a user should be able to input various items, mark them as complete or incomplete, and delete them.
          <br />
          <br />
          Technologies: JavaScript, Node, Express
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View GitHub Repo</Button>
      </CardActions>
    </Card>
  )
};

export default HomePageCard;