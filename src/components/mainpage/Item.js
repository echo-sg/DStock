import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "../center.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Item(props) {
  const classes = useStyles();


  return (
    <Card className={classes.root} style={{background:"lightgrey"}} >
      <CardHeader
        title="IIITM Gwalior"
        subheader="Shrey Gupta"
      />
      <CardMedia
        className={classes.media}
        // image="../../../public/idea.jpeg"
        image="https://img.collegepravesh.com/2020/07/IIITM-Gwalior.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Atal Bihari Vajpayee Indian Institute of Information Technology, Gwalior 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button size="small" color="primary" className="centered_ph" onClick={props.buyAsset}>
          Buy now
      </Button>
      </CardActions>

    </Card>
  );
}
