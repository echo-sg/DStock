import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

export default function Uploadphoto(props) {
  const classes = useStyles();
  // let [name,setName] = useState("");
  let [cost,setCost] = useState("");

  // const handleName = d => {
  //   setName(d.target.value);
  // }
  const handleCost = e => {
    setCost(e.target.value)
  }
  // console.log(cost,name)

  return (
    <div class="centered">

    <Card className={classes.root} centered>
      <form    onSubmit={(event) => {
                event.preventDefault()
                props.uploadAsset(cost)
                // uploadAsset(name,cost)
              }} >
        <CardContent style={{backgroundColor: "lightblue"}}>
             {/* <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" /> */}
            <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={props.captureFile} />
            <CardActions doubleSpacing={true}>
            </CardActions>
            <TextField id="outlined-basic" label="Name" variant="outlined" required/>
            {/* <TextField id="outlined-basic" value={name} label="Name" variant="outlined" onChange={handleName} required/> */}
            <CardActions doubleSpacing={true}>
            </CardActions>
            <TextField id="outlined-basic" label="Description" variant="outlined" />
            <CardActions doubleSpacing={true}>
            </CardActions>
            <TextField id="outlined-basic" value={cost} label="Cost" variant="outlined" onChange={handleCost} required/>
            <CardActions doubleSpacing={true}>
            </CardActions>
            <Button type="submit" variant="contained" color="primary" disableElevation>
            Submit
            </Button>
        </CardContent>
        </form>
        </Card>
    </div>
  );
}
