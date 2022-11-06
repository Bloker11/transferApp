const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5000/'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS, ${origin}`));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export { corsOptions, credentials};