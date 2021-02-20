import dotenv from 'dotenv';
dotenv.config();

const io = {
    host: process.env.IO_HOST || 'localhost',
    port: process.env.IO_PORT || 8080
}

const auth = {
    host: process.env.AUTH_HOST || 'localhost',
    port: process.env.AUTH_PORT || 8080
}

const config = {
    io,
    auth
}

export default config