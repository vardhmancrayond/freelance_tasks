import { sign, verify } from "jsonwebtoken";
require("dotenv").config();
const { JWT_TOKEN_KEY, JWT_EXPIRES_IN } = process.env;

const create_jwt_token = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      let _ = sign({ ...payload }, JWT_TOKEN_KEY, {
        expiresIn: JWT_EXPIRES_IN,
      });

      resolve({ token: _ });
    } catch (error) {
      reject(error);
    }
  });
};

const authenticate_jwt_token = ({ token }) => {
  return new Promise((resolve, reject) => {
    try {
      let result = verify(token, JWT_TOKEN_KEY);
      delete result.iat;
      delete result.exp;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export { create_jwt_token, authenticate_jwt_token };
