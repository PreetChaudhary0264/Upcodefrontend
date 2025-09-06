import axios from "axios";

const apiConnector = (method, url, bodyData, headers, params) => {
  return axios({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

export default apiConnector;
