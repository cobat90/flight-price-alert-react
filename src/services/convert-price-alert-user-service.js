export const convertRequest = (userData) => {
    const {
      userId,
      firstName,
      lastName,
      phoneNumber,
      login,
      email,
      country,
      city,
      langKey,
      currency,
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
    };
  
    return payload;
  }




