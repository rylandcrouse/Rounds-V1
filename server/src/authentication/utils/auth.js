import jwt from 'jsonwebtoken';
import config from './../../config.js';
import ID from "nodejs-unique-numeric-id-generator";


// time represented by ms for jwt expiration
const hour = 60 * 60;
const thirtyMinutes = 60 * 30;
const thirtyDays = hour * 24 * 30;

// test time
// const thirtySeconds = 30;

// Expiration times for each type of token
export const expirations = {
    GUEST_REFRESH: hour,
    USER_REFRESH: thirtyDays,
    ACCESS: thirtyMinutes
}

// Types of tokens
// Types of tokens
export const types = {
    GUEST_REFRESH: 'GUEST_REFRESH',
    USER_REFRESH: 'USER_REFRESH',
    ACCESS: 'ACCESS'
}


export const createAccess = (display_name, email, userId, type) => {
    const payload = { display_name, email, userId, type };

    return jwt.sign(payload, config.JWT.ACCESS_SECRET, {
        expiresIn: expirations[type],
    });
}


export const createRefresh = (display_name, email, userId, type) => {
    const payload = { display_name, email, userId, type };

    console.log(payload)
    return jwt.sign(payload, config.JWT.REFRESH_SECRET, {
        expiresIn: expirations[type],
    });
}

// Take an email and send it a code for the user to type in the client and match to two to verify identity
export const emailCode = async (email) => {
    try {
        const code = ID.generate(new Date().toJSON());

        // Email format to user
        const mailOptions = {
            from: process.env.email,//replace with your email
            to: email,//replace with user email
            subject: `Two-Factor with Rounds.`,
            html: `<h1>Your 2FA code:</h1>
                <h2>${code}</h2><br>
                <h2>Thank you!</h2><br>`
        };

        // Use the email transporter in the config to send the email
        await config.EMAIL.sendMail(mailOptions);
        return code;
    } catch (err) {
        throw new Error(err);
    }
}