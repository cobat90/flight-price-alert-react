export const convertUserLoginRequest = (userData) => {
  const {
    username,
    password,
  } = userData;
  
  const payload = {
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
  };

  return payload;
};

export const convertUserSignupRequest = (userData) => {
  const {
    firstName,
    email,
    phoneNumber,
    password,
  } = userData;

  const payload = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID, 
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'name', Value: firstName },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phoneNumber },
      { Name: 'custom:alert_time', Value: "100" },
      { Name: 'custom:account_type', Value: "free" },
    ],
  };

  return payload;
};

export const convertUserUpdateRequest = (userData) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    login,
    country,
    city,
    currency,
    langKey,
    telegramUserName,
    telegramChatId,
  } = userData;

  const payload = {
    AccessToken: localStorage.getItem("token"),
    UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
    username: login,
    UserAttributes: [
      { Name: 'name', Value: firstName }, 
      { Name: 'family_name', Value: lastName }, 
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phoneNumber },
      { Name: 'custom:country', Value: country }, 
      { Name: 'custom:city', Value: city }, 
      { Name: 'custom:currency', Value: currency }, 
      { Name: 'custom:lang_key', Value: langKey }, 
      { Name: 'custom:telegramUserName', Value: telegramUserName }, 
      { Name: 'custom:telegramChatId', Value: telegramChatId }, 
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
      case 'sub':
        userData.userId = attr.Value;
        break;
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
      case 'custom:telegramUserName':
        userData.telegramUserName = attr.Value;
        break;
      case 'custom:telegramChatId':
        userData.telegramChatId = attr.Value;
        break;
      default:
        break;
    }
  });

  return userData;
};

export const convertUserForgotPasswordRequest = (userData) => {
  const {
    email,
  } = userData;
  
  const payload = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
    Username: email,
  };

  return payload;
};

export const convertUserForgotPasswordFinishRequest = (userData) => {
  const {
    username,
    code,
    newPassword,
  } = userData;
  
  const payload = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  };

  return payload;
};

export const convertResendConfirmationCode = (userData) => {
  const {
    email,
  } = userData;
  
  const payload = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
    Username: email,
  };

  return payload;
};

export function getAttributeValue(attributes, attributeName) {
  const attribute = attributes.find(attr => attr.Name === attributeName);
  return attribute ? attribute.Value : null;
}
export function convertBalanceToDays(balance) {
  if (balance != null && balance > 0 ) {
    const days = balance / 50;
    const wholeDays = Math.floor(days);
    const fractionalDay = (days - wholeDays).toFixed(2);
    return wholeDays + parseFloat(fractionalDay);

  } else {
    return 0;
  }

}


