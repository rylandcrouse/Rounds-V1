import dotenv from 'dotenv';
dotenv.config();

const io = {
    host: process.env.REACT_APP_IO_HOST || '0.0.0.0',
    port: process.env.REACT_APP_IO_PORT || process.env.PORT
}

console.log(io)

const auth = {
    host: process.env.REACT_APP_AUTH_HOST || '0.0.0.0',
    port: process.env.REACT_APP_AUTH_PORT || process.env.PORT,
}

const config = {
    io,
    auth
}

export default config