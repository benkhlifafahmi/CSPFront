const join = require('url-join');

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      let isAbsoluteURLRegex = /^(?:\w+:)\/\//;
      
      if (authToken) {
        config.headers['x-auth-key'] = authToken;
      }
      if ( !isAbsoluteURLRegex.test(config.url) ) {
        //config.url = join('https://gelatinino.esperoo.fr/api', config.url);
        config.url = join('http://localhost:8000', config.url);
      }
      return config;
    },
    err => Promise.reject(err)
  );
}
