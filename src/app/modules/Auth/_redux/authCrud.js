import axios from "axios";
export const LOGIN_URL = `/auth/login`;

export const ME_URL = `/me`;

export function login(username, password) {
  //return axios.post(LOGIN_URL, { username, password });
  //to fake login
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username== "admin" && password=="admin") {
        return resolve({data: {token: 'xyz'}})
      }
      return reject({data: {error: true, message: 'failed'}})
    }, 1000);
  })
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  //return axios.get(ME_URL);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          username: 'benkhlifa.fahmi@icloud.com',
          firstName: 'Fahmi Ben Khlifa',
          lastName: '',
        }
      })
    }, 100);
  })
}
