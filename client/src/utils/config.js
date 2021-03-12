import dotenv from 'dotenv';
dotenv.config();

const io = {
    host: process.env.REACT_APP_IO_HOST || process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_IO_PORT || process.env.REACT_APP_HOST
}


const auth = {
    host: process.env.REACT_APP_AUTH_HOST || process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_AUTH_PORT || process.env.REACT_APP_PORT,
}

const config = {
    io,
    auth
}

export default config