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
import { cloneRepository } from "../../Store/actions/home";
import { withRouter } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar"
import GitHubIcon from '@material-ui/icons/GitHub';

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

const CloneRepository = ({ cloneRepository, history }) => {
  const [state, setState] = React.useState({
    name: "",
    username: localStorage.getItem("username"),
    command: "",
    repository_name: ""
  });

  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleChangeTextField = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const email = localStorage.getItem("username");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await cloneRepository(state).then((response) => {
      if (response.status === 200) {
        history.push("/repositories");

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
            <GitHubIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Item
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Item name"
              name="name"
              autoFocus
              autoComplete="name"
              value={state.name}
              error={error}
              onChange={handleChangeTextField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="repository_name"
              label="Git repository"
              name="repository_name"
              autoFocus
              autoComplete="name"
              value={state.repository_name}
              error={error}
              onChange={handleChangeTextField}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="command"
              label="Shell commands"
              name="command"
              multiline
              rows={10}
              autoFocus
              autoComplete="command"
              value={state.command}
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

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps, { cloneRepository })(CloneRepository));