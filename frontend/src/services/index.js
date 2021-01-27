import http from "./http-common";

const Login = (data) => {
  return http.post("login", data);
};

const Refresh = (data) => {
  http.defaults.headers.common["authorization"] = data.authorization;
  return http.get("/refresh");
};

const SignUp = (data) => {
  return http.post("/signup", data);
};

export { Login, SignUp, Refresh };
