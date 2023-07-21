const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_db',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'suyogambadare1003@gmail.com',
            pass: 'ozfeurfmydlyslum'
        }
    },
    google_client_id: "579612879049-be3j4ucol5dm5nphek9j40gdp39dgib1.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}
const production = {
    name: 'production'
}

module.exports = development;