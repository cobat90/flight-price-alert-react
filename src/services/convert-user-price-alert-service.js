export const convertRequest = (userData) => {
    const {
      userId,
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
      id: userId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      login: login,
      email: email,
      country: country,
      city: city,
      langKey: langKey,
      currency: currency,
      password: password,
    };
  
    return payload;
  }




