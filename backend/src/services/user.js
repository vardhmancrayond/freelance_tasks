import models from "../../models";
import Hash from "crypto";

var genRandomString = function (length) {
  return Hash.randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

var sha256 = function (password, salt) {
  var hash = Hash.createHmac("sha256", salt)
    .update(password)
    .digest("hex"); /** Hashing algorithm sha512 */
  return {
    salt: salt,
    passwordHash: hash,
  };
};

//Creates a user while storing password hashed
const create_user = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject({
        status_code: 400,
        message: "Bad Request, Please send the username and password",
      });
    } else {
      const encrypt_password = sha256(password, genRandomString(16));
      models.user
        .create({
          username: username,
          password: encrypt_password.passwordHash,
          password_hash: encrypt_password.salt,
        })
        .then((user) => {
          resolve(JSON.parse(JSON.stringify(user)));
        })
        .catch((err) => {
          console.log("Error", err);
          reject({
            status_code: 403,
            message: err["message"] || "Some error occured!",
          });
        });
    }
  });
};

//Validaiting user with hashed password
const find_user_with_validation = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject({
        status_code: 400,
        message: "Bad Request, Please send the username and password",
      });
    }
    //Fetching the user from the db with the username
    else {
      models.user
        .findOne({
          where: {
            username: username,
          },
        })
        .then((user) => {
          if (user) {
            const userData = JSON.parse(JSON.stringify(user));

            //Hashing the password in the request body and comparing it with the user password
            const hashedPassword = Hash.createHmac(
              "sha256",
              userData.password_hash
            )
              .update(password)
              .digest("hex");

            //console.log(hashedPassword)
            if (userData.password !== hashedPassword) {
              reject({
                status_code: 403,
                message: "Invalid username/password.",
              });
            }
            resolve(JSON.parse(JSON.stringify(user)));
          } else {
            reject({
              status_code: 403,
              message: "Invalid username/password.",
            });
          }
        })
        .catch((err) => {
          console.log("Error", err);
          reject({
            status_code: 403,
            message: err["message"] || "Some error occured!",
          });
        });
    }
  });
};

export { create_user, find_user_with_validation };
