import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, withRouter } from "react-router-dom";
import { logout } from "../Store/actions/auth";
import { connect } from "react-redux";
import clsx from "clsx";
import ReorderIcon from "@material-ui/icons/Reorder";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GroupIcon from "@material-ui/icons/Group";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NavigationBar = ({ logout }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const showButtons = () => {
    if (localStorage.getItem("jwtToken") !== "") {
      return (
        <div>
          <Button color="inherit" className={classes.submit} href="/profile"> Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>
      );
    }
    else {
      return (
        <Button color="inherit" >Login</Button>
      );
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="primary"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <ReorderIcon
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="open drawer">
            <MenuIcon />
          </ReorderIcon>
          <Typography variant="h6" className={classes.title}>
            Jenkins
          </Typography>
          {showButtons()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Repositories" href="/repositories" {...a11yProps(0)} icon={<GroupIcon />} />
        </Tabs>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
