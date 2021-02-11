import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Mainpage from './mainpage/Mainpage';
import Creatorpage from './creator_login/Creatorpage';
import Tokenplace from './token_marketplace/Tokenplace';
import BoughtItems from "./boughtItems/boughtItems";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const { children, value, index, account, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavigationTabs({account,captureFile,earnings,tokenCount,uploadAsset,buyAsset}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <h4>DSTOCK</h4>
        <Tabs value={value} onChange={handleChange} aria-label="NAVBAR" centered>
          <Tab label="Shop" {...a11yProps(0)} />
          <Tab label="Token Marketplace" {...a11yProps(1)} />
          <Tab label="Creator's Dashboard" {...a11yProps(2)} />
          <Tab label="My Orders" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Mainpage buyAsset={buyAsset}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <Tokenplace/> */}
        <Tokenplace account={account}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Creatorpage 
              captureFile={captureFile}
              uploadAsset={uploadAsset}
              earnings={earnings}
              />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BoughtItems />
      </TabPanel>
    </div>
  );
}
