import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { editRepo } from '../../Store/actions/home';

const FormDialog = ({ idV, commandV, locationV, onUpdate, editRepo }) => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const [error, setError] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        command: (commandV == null) ? "" : commandV,
        id: (idV == null) ? "" : idV,
        location: (locationV == null) ? "" : locationV,
    });
    const handleChangeTextField = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onUpdate(false);
    };

    const handleYES = async (e) => {
        const res = await editRepo(state).then((response) => {
            if (response.status === 200) {
                setOpen(false);
                onUpdate(true);
            }
        });
        setError(true);
    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                EDIT
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit shell commands</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Changing commands will affect shell execution process.
                    </DialogContentText>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="command"
                        label="Commands"
                        name="command"
                        autoComplete="command"
                        autoFocus
                        multiline
                        rows={10}
                        value={state.command}
                        error={error}
                        onChange={handleChangeTextField}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleYES} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({});

export default withRouter(
    connect(mapStateToProps, { editRepo })(FormDialog)
);

