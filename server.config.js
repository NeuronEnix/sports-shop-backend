module.exports.CONFIG = {

    DB : {
        URL : "mongodb://localhost:27017/sports",
    },

    SERVER : {
        PORT : 9999,
    },

    BCRYPT : {
        ROUNDS : 10,
    },

    ACCESSIBLE_URL : {
        NON_ADMIN_URL : new Set( [] ),
        NO_TOKEN_REQUIRED_URL : new Set( [ '/user/sign-up','/user/sign-in', '/user/sign-out', '/token/acc-tok', '/token/ref-tok', ] )
    },
    
    TOKEN : {

        REFRESH_TOKEN : {
            KEY : "ADD_REFRESH_TOKEN_KEY",
            EXPIRY : "2d",
            MAX_AGE : 2 * 24 * 60 * 60 * 100,
        },
    
        ACCESS_TOKEN : {
            KEY : "ADD_ACCESS_TOKEN_KEY",
            EXPIRY : "15s",
        },

    }
}

module.exports.DB_LIMITER = {
    
}
