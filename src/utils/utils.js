import networkRequest from "../app/networkRequest/networkRequest";

export const baseUrl = process.env.NEXT_PUBLIC_HOST_URL;

export const sendLoginRequest = async (email, password) => {
  const response = await networkRequest({
    method: "POST",
    url: "login",
    data: { email, password },
  });

  return response;
};

export const sendSignupRequest = async (name, email, password) => {
  const response = await networkRequest({
    method: "POST",
    url: "signup",
    data: { name, email, password },
  });
  return response;
};

export const getLoggedInUser = async () => {
  const response = await networkRequest({
    method: "GET",
    url: "get_user_from_token",
    data: {},
  });

  return response.data;
};

export const sendSignoutRequest = async () => {
  const response = await networkRequest({
    method: "GET",
    url: "signout",
    data: {},
  });

  return response;
};
