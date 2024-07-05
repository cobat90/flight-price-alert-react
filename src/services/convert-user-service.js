export const convertUserSignupRequest = (userData) => {
  const {
    firstName,
    email,
    phoneNumber,
    login,
    password,
  } = userData;

  const payload = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID, 
    Username: login,
    Password: password,
    attributes: [
      { Name: 'name', Value: firstName },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phoneNumber },
    ],
  };

  return payload;
};

export const convertUserUpdateRequest = (userData) => {
  const {
    acessToken,
    firstName,
    lastName,
    email,
    phoneNumber,
    login,
    country,
    city,
    currency,
    langKey,
  } = userData;

  const payload = {
    AccessToken: acessToken,
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
    username: login,
    attributes: [
      { Name: 'name', Value: firstName }, // 'given_name' corresponds to first name
      { Name: 'family_name', Value: lastName }, // 'family_name' corresponds to last name
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phoneNumber },
      { Name: 'custom:country', Value: country }, // Custom attribute 'country'
      { Name: 'custom:city', Value: city }, // Custom attribute 'city'
      { Name: 'custom:currency', Value: currency }, // Custom attribute 'currency'
      { Name: 'custom:lang_key', Value: langKey }, // Custom attribute 'langKey'
    ],     
  };

  return payload;
};

export const convertUserResponse = (responseData) => {
  const attributes = responseData.UserAttributes;
  const userData = {};
  userData.login = responseData.Username;

  attributes.forEach(attr => {
    switch (attr.Name) {
      case 'name':
        userData.firstName = attr.Value;
        break;
      case 'family_name':
        userData.lastName = attr.Value;
        break;
      case 'email':
        userData.email = attr.Value;
        break;
      case 'phone_number':
        userData.phoneNumber = attr.Value;
        break;
      case 'custom:country':
        userData.country = attr.Value;
        break;
      case 'custom:city':
        userData.city = attr.Value;
        break;
      case 'custom:currency':
        userData.currency = attr.Value;
        break;
      case 'custom:lang_key':
        userData.langKey = attr.Value;
        break;
      default:
        break;
    }
  });

  return userData;
};

