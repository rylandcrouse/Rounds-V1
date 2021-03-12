import dotenv from 'dotenv';
dotenv.config();

const io = {
    host: process.env.REACT_APP_IO_HOST || process.env.HOST,
    port: process.env.REACT_APP_IO_PORT || process.env.PORT
}

const auth = {
    host: process.env.REACT_APP_AUTH_HOST || process.env.HOST,
    port: process.env.REACT_APP_AUTH_PORT || process.env.PORT,
}

const config = {
    io,
    auth
}

export default config