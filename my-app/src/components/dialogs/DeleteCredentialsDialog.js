import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteCredentials } from "../../Store/actions/credentials";

const DeleteDialog = ({ id, username, deleteCredentials, onUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onUpdate(false);
  };
  const handleYES = async (e) => {
    await deleteCredentials(id).then((response) => {
      setOpen(false);
      onUpdate(true);
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
            </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete credentials with username '" + username + "'?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to revert and reuse deleted credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CANCEL
                    </Button>
          <Button onClick={handleYES} color="primary" autoFocus>
            OK
                    </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => ({});

export default withRouter(
  connect(mapStateToProps, { deleteCredentials })(DeleteDialog)
);
