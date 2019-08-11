import axios from 'axios';

export const login = (payLoad, successCallBack, failureCallBack) => {
  const loginUrl = 'http://localhost:8080/login';
  return axios.post(loginUrl, payLoad)
  .then(function (response) {
    successCallBack(response);
  })
  .catch(function (error) {
    failureCallBack(error);
  });
}
