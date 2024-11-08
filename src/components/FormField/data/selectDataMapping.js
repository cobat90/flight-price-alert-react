const selectDataMapping = {
    flightType: {
        ROUNDTRIP: "Roundtrip",
        ONE_WAY: "One Way",
        CHEAPEST: "Cheapest",
        MONTH: "Month",
        MULTICITY: "Multicity",
    },
    alertType: {
        TELEGRAM: "Telegram",
    },
    priceType: {
        LOWEST: "Lowest",
        EVERY: "Every",
        RANGE: "Range",
    },
    cabinClassType: {
        ECONOMY: "Economy",
        PREMIUM_ECONOMY: "Premium Economy",
        BUSINESS: "Business Class",
        FIRST_CLASS: "First Class",
    },    
    paymentMethod: {
        CREDIT_CARD: "Credit Card", 
        DEBIT_CARD: "Debit Card", 
        BANK_TRANSFER: "Bank Transfer", 
        PAYPAL: "Paypal", 
        TICKET: "Ticket", 
        PIX: "Pix", 
        CRYPTOCURRENCY: "Cryptocurrency"
    },
    otherPreferences: {
        WIFI_FLIGHTS: "Wifi Flights", 
        NIGHT_FLIGHTS: "Night Flights", 
        WITH_ENTERTAINMENT_FLIGHTS: "With Entertainment Flights", 
    },
    searchSites: {
        SKYSCANNER: "Skyscanner", 
        MOMONDO: "Momondo", 
        TRIP_COM: "Trip.com", 
        VOOPTER: "Voopter", 
        KAYKE: "Kayke", 
        DECOLAR: "DecolarPix", 
    },
};

module.exports = selectDataMapping;