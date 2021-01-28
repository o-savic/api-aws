import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import dense from "@material-ui/core/List/ListContext";
import { getUserRepositories } from "../../Store/actions/home";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditCommandDialog from "../dialogs/EditCommandDialog";
import NavigationBar from "../../components/NavigationBar"

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

const RepositoriesList = ({ getUserRepositories, repositories }) => {

  const [updated, setUpdated] = React.useState(false);
  useEffect(() => {
    getUserRepositories();
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
          <h1><b><i>My Repositories</i></b></h1>
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
                    <b><i>Name</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>Repository</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>Location</i></b>
                  </TableCell>
                  <TableCell align="center">
                    <b><i>Command</i></b>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {repositories && repositories.length > 0 &&
                  repositories.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        key={row.id}
                      >
                        <TableCell align="center">
                          <p>{row.name} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.repository_name} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p>{row.location} </p>
                        </TableCell>
                        <TableCell align="center">
                          <p> {row.command}   </p>
                        </TableCell>
                        <TableCell align="right">
                          <EditCommandDialog
                            idV={row.id}
                            commandV={row.command}
                            locationV={row.location}
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
          href="/git"
        >
          Clone new repository
            </Button>

      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  repositories: state.home.repositories
});

export default withRouter(
  connect(mapStateToProps, {
    getUserRepositories
  })(RepositoriesList)
);
