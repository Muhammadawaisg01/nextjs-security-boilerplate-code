import axios from "axios";
import { baseUrl } from "../../utils/utils";

const networkRequest = async ({ method, url, data }) => {
  console.log("I am in NETWORK REQUEST    ", method, url, data);
  const response = await axios({
    method: method,
    url: `${baseUrl}/${url}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
      // ...(headers && { ...headers }),
    },
  });
  return response;
};

export default networkRequest;
