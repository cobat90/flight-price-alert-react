const selectDataMapping = {
    flightType: {
        ONE_WAY: "One Way",
        ROUND_TRIP: "Roundtrip",
    },
    alertType: {
        TELEGRAM: "Telegram",
    },
    priceType: {
        LOWER: "Lower",
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