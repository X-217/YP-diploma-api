require('dotenv').config();

const {JWT_SECRET = 'JWT_SECRET'} = process.env;
const {PORT = 3000} = process.env;
const {MONGODB_URI = 'mongodb://localhost:27017/newsdb'} = process.env;
const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

module.exports = {
    JWT_SECRET,
    MONGODB_URI,
    MONGODB_OPTIONS,
    PORT,
};

