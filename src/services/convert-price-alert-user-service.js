export const convertRequest = (userData) => {
    const {
      firstName,
      lastName,
      email,
      langKey,
      login,
      country,
      city,
      phoneNumber,
      currency,
    } = userData;
  
    // Create the payload structure
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      langKey: langKey,
      login: login,
      country: country,
      city: city,
      phoneNumber: phoneNumber,
      currency: currency,
    };
  
    return payload;
  }




