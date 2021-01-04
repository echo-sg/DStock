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

export default function Item() {
  const classes = useStyles();


  return (
    <Card className={classes.root} style={{background:"lightgrey"}} >
      <CardHeader
        title="Picture 1"
        subheader="Shrey Gupta"
      />
      <CardMedia
        className={classes.media}
        // image="../../../public/idea.jpeg"
        image="data:image/jpeg;base64,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"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button size="small" color="primary" className="centered_ph">
          Buy now
      </Button>
      </CardActions>

    </Card>
  );
}
