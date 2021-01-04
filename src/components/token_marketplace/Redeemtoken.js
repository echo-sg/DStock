import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import "../center.css";

const useStyles = makeStyles ((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 800,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div class="centered">
    <Card className={classes.root} centered>
        <CardContent style={{backgroundColor: "lightgrey"}}>
            <Typography variant="h5" component="h2">
            Redeem your Tokens Here
            <CardActions doubleSpacing={true}>
            </CardActions>
            </Typography>
            <TextField id="outlined-basic" label="Tokens" variant="outlined" />
            <CardActions doubleSpacing={true}>
            </CardActions>
            <Button variant="contained" color="primary" disableElevation>
            Redeem Now
            </Button>
        </CardContent>
        </Card>
    </div>
  );
}
