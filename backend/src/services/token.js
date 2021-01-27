import models from "../../models";
import moment from "moment";

const create_token = ({ token }) => {
  return new Promise((resolve, reject) => {
    models.token
      .create({
        token: token,
        expiry_time: moment().add(5, "minutes").toISOString(),
      })
      .then((tokenData) => {
        resolve(tokenData);
      })
      .catch((err) => {
        console.log("Error", err);
        reject({
          status_code: 400,
          message: err["message"] || "Some error occured!",
        });
      });
  });
};

const get_token = ({ token }) => {
  return new Promise((resolve, reject) => {
    models.token
      .findOne({
        where: {
          token: token,
          expiry_time: {
            [models.Sequelize.Op.gte]: moment().toISOString(),
          },
        },
      })
      .then((tokenData) => {
        if (tokenData) {
          resolve(tokenData);
        } else {
          reject({ status_code: 400, message: "Token Expired!" });
        }
      })
      .catch((err) => {
        console.log("Error", err);
        reject({
          status_code: 400,
          message: err["message"] || "Some error occured!",
        });
      });
  });
};

export { create_token, get_token };
