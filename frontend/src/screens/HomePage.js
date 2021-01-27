import React from "react";
import { CssBaseline, Container, Typography } from "@material-ui/core";
import { LoginForm } from "../components";
import { AuthContext } from "../contexts";
const HomePage = (props) => {
  const Auth = React.useContext(AuthContext);
  console.log(Auth);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {Auth.user["username"] && (
        <Typography variant="h1">{`Hi ! ${Auth.user["username"]}`}</Typography>
      )}
      {!Auth.user["username"] && <LoginForm {...props}></LoginForm>}
    </Container>
  );
};

export default HomePage;
