import React from "react";
import { AuthContext } from "./contexts";
import { Refresh } from "./services";
import http from "./services/http-common";
const AppAuth = (props) => {
  const [auth, setAuth] = React.useState({ user: {}, lastupdate: "" });
  const [state, setState] = React.useState({ isRefreshed: true });

  // Todo: Your Referesh API here
  React.useEffect(() => {
    const fetchData = () => {
      console.log(localStorage.getItem("token"));
      Refresh({
        authorization: `Bearer ${localStorage.getItem("token")}`,
      })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setAuth({ user: response.data.userData });
          setState({ isRefreshed: true });
        })
        .catch((err) => {
          localStorage.clear();
          delete http.defaults.headers.common["authorization"];
          setState({ isRefreshed: true });
        });
    };
    fetchData();
  }, [state.isRefreshed]);
  return (
    <div>
      {state.isRefreshed ? (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
          {props.children}
        </AuthContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AppAuth;
