import dotenv from 'dotenv';
dotenv.config();

const io = {
    host: process.env.IO_HOST || process.env.HOST,
    port: process.env.IO_PORT || process.env.PORT
}

const auth = {
    host: process.env.AUTH_HOST || process.env.HOST,
    port: process.env.AUTH_PORT || process.env.PORT
}

const config = {
    io,
    auth
}

export default config