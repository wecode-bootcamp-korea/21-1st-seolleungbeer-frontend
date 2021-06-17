const getToken = () => {
  return localStorage.getItem('access_token');
};

const setToken = token => {
  localStorage.setItem('access_token', token);
};

export { getToken, setToken };
