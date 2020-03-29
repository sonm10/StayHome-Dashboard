// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  
    if (userStr) return JSON.parse(userStr);
      else return null;
  }

  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }

  export const getDzongkhag = () => {
    return sessionStorage.getItem('dzongkhag') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('dzongkhag');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, secret, user) => {
    sessionStorage.setItem('token', token+":"+secret);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  //set dzongkhag
  export const setUserDzongkhagSession = (dzongkhag) => {
    sessionStorage.setItem('dzongkhag', dzongkhag);
  }