export const convertRequest = (userData) => {
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
    password,
  } = userData;

  const payload = {
    username: login,
    password: password,
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
    ClientId: process.env.COGNITO_CLIENTID,
    UserPoolId: process.env.COGNITO_USERPOOLID,  
  };

  return payload;
};
