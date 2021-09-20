import React, { useContext } from "react";
import { Login } from "../../Components/Login/index";
import { Grid, makeStyles, Container } from "@material-ui/core";
import AuthContext from "../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Home = () => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  console.log(context);
  return (
    <Grid container>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Login />
        </div>
      </Container>
    </Grid>
  );
};

export default Home;
