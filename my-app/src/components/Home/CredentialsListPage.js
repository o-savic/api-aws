import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import dense from "@material-ui/core/List/ListContext";
import { getCredentialsList } from "../../Store/actions/credentials";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditCredentialsDialog from "../dialogs/EditCredentialsDialog";
import NavigationBar from "../NavigationBar"
import DeleteCredentialsDialog from "../dialogs/DeleteCredentialsDialog";

const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  container: {
    align: "center"
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
    align: "center",
    background: "#F0F8FF"
  },



}));

const CredentialsList = ({ getCredentialsList, credentialsList, email }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getCredentialsList(email);
    setUpdated(false);
  }, [updated]);

  const classes = useStyles();

  const onUpdateTable = (value) => {
    setUpdated(value);
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className={classes.content}>
        <br />
        <div align="center">
          <h1><b><i>My Credentials</i></b></h1>
        </div>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b><i>Username</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>ID</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>Description</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>Password</i></b>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {credentialsList && credentialsList.length > 0 &&
                  credentialsList.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        key={row.id}
                      >
                        <TableCell align="center">
                          <p>{row.username} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.id} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.description} </p>
                        </TableCell>
                        <TableCell align="center">
                          <input type="password" readOnly value={row.password}></input>
                        </TableCell>
                        <TableCell align="center">
                        <EditCredentialsDialog
                            idV={row.id}
                            usernameV={row.username}
                            descriptionV={row.description}
                            passwordV={row.password}
                            onUpdate={onUpdateTable}
                          />  
                        </TableCell>
                        <TableCell align="center">
                          <DeleteCredentialsDialog
                            id={row.id}
                            username={row.username}
                            onUpdate={onUpdateTable}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>


            </Table>
          </div>
        </Paper>
        <br>
        </br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          href="/addCredentials"
        >
          Add new credentials
            </Button>

      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  credentialsList: state.credentials.credentialsList,
  email: state.user.user.sub
});

export default withRouter(
  connect(mapStateToProps, {
    getCredentialsList
  })(CredentialsList)
);
