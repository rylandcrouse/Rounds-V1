import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const ENV = process.env.NODE_ENV

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 80;

const SERVER = {
    hostname: HOSTNAME,
    port: PORT,
};

const DB = {
    uri: process.env.DB
}

const JWT = {
    REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET
}

// This will be used send support and two-factor authentication emails
const EMAIL = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,//replace with your email
        pass: process.env.EMAIL_PW//replace with your password
    }
});

// Redis will be used as cache and a pub/sub broker
const REDIS = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PW
}

const ARGS = process.argv

const config = {
    server: SERVER,
    DB,
    JWT,
    EMAIL,
    REDIS,
    ENV,
    ARGS
};

export default config;
