import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default {
  post: function(urlParam, payload) {
    return new Promise((resolve, reject) => {      
      return axios
        .post(`${API_URL}${urlParam}`, payload,
        //  {
        //   headers: {
        //     "Access-Control-Allow-Origin": "true",
        //   },
        // }
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  get: function(urlParam) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}${urlParam}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  
};
