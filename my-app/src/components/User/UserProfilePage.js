import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { editUser } from "../../Store/actions/user";
import { withRouter } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getUserData } from "../../Store/actions/user"
import NavigationBar from "../../components/NavigationBar"
import Divider from '@material-ui/core/Divider';
import { userPath } from '../../properties/path-properites'
import Axios from "axios";
import { StarRate } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.,
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserProfile = ({ getUserData, userData, email, editUser, history }) => {

  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [change, setChange] = useState(null);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    id: 0,
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
    loaded: false
  });

  useEffect(() => {
    setState({ loaded: false });
    getUserData(email);
    setState({ loaded: true });
    if (userData != undefined) {
      setState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        id: userData.id,
      })
    }
  }, []); //[getUserData, email]

  if (window.onbeforeunload) {
    setState({ loaded: false })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await editUser(state).then((response) => {
      if (response.status === 200) {
        history.push("/success");
      }
    });
    setError(true);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const resp = await Axios.put(userPath + `/editPass/user/${userData.id}`, {
      newPassword: state.newPassword,
      oldPassword: state.oldPassword,
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setState({
          confirmedPassword: "",
          newPassword: "",
          oldPassword: "",
        });
        history.push("/success");
      }
    });
      setError(true);
  };
  const handleChangeTextField = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <NavigationBar></NavigationBar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Your profile
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              disabled
              id="email"
              name="email"
              label="Email"
              autoFocus
              value={email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              name="firstName"
              label="First name"
              autoFocus
              required
              autoComplete="firstName"
              value={state.firstName}
              onChange={handleChangeTextField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              name="lastName"
              label="Last name"
              autoFocus
              value={state.lastName}
              onChange={handleChangeTextField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              name="username"
              label="Username"
              autoFocus
              required
              autoComplete="username"
              value={state.username}
              onChange={handleChangeTextField}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <div>
              <Divider />
            </div>
            <div>
              <Typography component="h5" variant="h5" align="center">
                Change password
              </Typography>
            </div>

            <TextField
              error={change === false}
              variant="outlined"
              margin="normal"
              fullWidth
              id="oldPassword"
              name="oldPassword"
              label="Old password"
              autoFocus
              required
              type="password"
              autoComplete="oldPassword"
              value={state.oldPassword}
              onChange={handleChangeTextField}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="newPassword"
              name="newPassword"
              label="New password"
              autoFocus
              required
              type="password"
              autoComplete="newPassword"
              value={state.newPassword}
              onChange={handleChangeTextField}
            />

            <TextField
              error={
                state.confirmedPassword !== state.newPassword &&
                state.newPassword.length !== 0
              }
              helperText={
                state.confirmedPassword !== state.newPassword
                  ? "Your password and confirmation password do not match."
                  : ""
              }
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirmedPassword"
              name="confirmedPassword"
              label="Confirm password"
              autoFocus
              required
              type="password"
              autoComplete="confirmedPassword"
              value={state.confirmedPassword}
              onChange={handleChangeTextField}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handlePasswordChange}
              disabled={state.confirmedPassword !== state.newPassword}
            >
              Change password
            </Button>

          </form>
        </div>

      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  email: state.user.user.sub
});

export default withRouter(connect(mapStateToProps, { getUserData, editUser })(UserProfile));
