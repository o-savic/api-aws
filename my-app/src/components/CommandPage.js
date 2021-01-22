import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { executeShell } from "../Store/actions/home";
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from "react-router-dom";

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

const ExecuteShell = ({ executeShell, history }) => {
    const [state, setState] = React.useState({
        line: "",
        checked: false
    });

    const [error, setError] = React.useState(false);
    const classes = useStyles();

    const handleChangeTextField = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleChangeCheckbox = (event, checked) => {
        setState({ ...state, checked: !state.checked })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await executeShell(state).then((response) => {
            if (response.status === 200) {
                history.push("/repositories");
            }
        });
        setError(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Insert commands for execution
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="line"
                        label="Shell commands"
                        name="line"
                        multiline
                        rows={10}
                        autoFocus
                        autoComplete="line"
                        value={state.line}
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
    );
};

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps, { executeShell })(ExecuteShell));