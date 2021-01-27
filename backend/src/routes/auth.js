import {
  create_jwt_token,
  authenticate_jwt_token,
  create_user,
  find_user_with_validation,
  create_token,
  get_token,
} from "../services";

const login = (req, res) => {
  find_user_with_validation(req.body)
    .then(async (user) => {
      try {
        var { token } = await create_jwt_token(user);
        var tokenData = await create_token({ token: token });
        if (tokenData) {
          res.status(200).send({
            token: token,
            userData: user,
            status: "success",
          });
        }
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(error["status_code"] || 403).send(error);
    });
};

const signup = (req, res) => {
  create_user(req.body)
    .then(async (user) => {
      try {
        var { token } = await create_jwt_token(user);
        var tokenData = await create_token({ token: token });
        if (tokenData) {
          res.status(200).send({
            token: token,
            userData: user,
            status: "success",
          });
        }
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(error["status_code"] || 403).send(error);
    });
};

const refresh = (req, res) => {
  //Auth Token
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    res.status(403).send({
      message: "Unauthorized Access!",
    });
  } else {
    get_token({ token })
      .then(async (tokenData) => {
        res.status(200).send({
          token: token,
          userData: await authenticate_jwt_token({ token: tokenData.token }),
          status: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(error["status_code"] || 403).send(error);
      });
  }
};

export { login, signup, refresh };
