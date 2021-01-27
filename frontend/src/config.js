let config = {};

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "production") {
  config.api_url = process.env.REACT_APP_PROD_ENDPOINT;
} else if (NODE_ENV === "development") {
  config.api_url = process.env.REACT_APP_DEV_ENDPOINT;
} else {
  config.api_url = process.env.REACT_APP_LOCAL_API_ENDPOINT;
}

export default config;
