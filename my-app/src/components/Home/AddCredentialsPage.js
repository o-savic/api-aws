import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { addUserCredentials } from "../../Store/actions/credentials"
import NavigationBar from "../../components/NavigationBar"
import LockIcon from '@material-ui/icons/Lock';


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
}));

const AddCredentials = ({ addUserCredentials, history, email }) => {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    id: "",
    description: ""
  });

  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleChangeTextField = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addUserCredentials(email, state).then((response) => {
      if (response.status === 201) {
        history.push("/myCredentials");
      }
    });
    setError(true);
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Credentials
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={state.username}
              error={error}
              onChange={handleChangeTextField}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New password"
              type="password"
              id="password"
              value={state.password}
              autoComplete="current-password"
              error={error}
              onChange={handleChangeTextField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="ide"
              label="ID"
              name="id"
              autoComplete="ID"
              autoFocus
              value={state.id}
              error={error}
              onChange={handleChangeTextField}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={10}
              autoFocus
              autoComplete="description"
              value={state.description}
              error={error}
              onChange={handleChangeTextField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              OK
          </Button>

          </form>
        </div>

      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.user.sub
});

export default withRouter(connect(mapStateToProps, { addUserCredentials })(AddCredentials));
