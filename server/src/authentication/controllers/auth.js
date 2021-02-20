import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import status from 'http-status-codes';
import { types, createAccess, createRefresh, emailCode } from '../utils/auth.js';
import mongoose from 'mongoose';
import config from './../../config.js';


export const signUp = async (req, res) => {
    let { display_name, email, password, password_confirmation } = req.body;

    // Verify that the password matches the confirmation, else the user may have made a mistake
    if (password !== password_confirmation) {
        return res.status(status.BAD_REQUEST).json({
            error: 'Password not matched.'
        })
    }

    // Find an instance of a User in our db where the key 'email' matches the one in the request body
    const userUsingEmail = await User.findOne({ email });
    if (userUsingEmail) {
        // If that user is verified with that email, don't try to create another user with the same email
        if (userUsingEmail.verified) {
            return res.status(status.CONFLICT).json({
                error: 'A user with the email given already exists.'
            });
        } else {
            // If the email is taken but is not verified, we can overwrite it
            // But first we need to remove the original from the database
            await User.remove({ email });
        }
    }
    const saltRounds = 10;
    try {
        const hashedPW = await bcrypt.hash(password, saltRounds);

        // Auth util responsible for sending email verification code
        const code = await emailCode(email);
        if (!code) {
            throw new Error("Could not create 2FA email code.")
        }

        // If Email isn't taken, password is hashed, and Passwords match, we can create a new user from the request body and our db model
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            display_name,
            email,
            password: hashedPW,
            code: code
        })

        await user.save();

        // If no errors have occurred we can tell the client the email used for the account
        return res.status(status.CREATED).json({
            message: 'User created.',
            user: {
                email
            }
        });
    } catch (err) {
        return res.status(status.METHOD_FAILURE).json({
            error: err
        });
    }



}


export const signIn = async (req, res) => {
    let { email, password } = req.body;
    let user;
    if (email && password) {
        // Search for a user with the given email in the database
        user = await User.findOne({ email });

        // If user with the given email does not exist, inform the client
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                error: 'User does not exist.'
            });
        }
    }


    // If the user exists, we can check if the given password matches that of the user on the database
    try {
        // Bcrypt's compare method returns a boolean indicating a matching password
        const match = await bcrypt.compare(password, user.password);
        // If the compare method indicates that the passwords didn't match, inform the client
        if (!match) {
            return res.status(status.UNAUTHORIZED).json({
                error: 'Incorrect password.'
            });
        }

        // If user with email exists and passwords match, send email to user with 2FA code
        // Auth util responsible for sending email verification code
        const code = await emailCode(email);
        if (!code) {
            throw new Error("Could not create 2FA email code.")
        }

        // if code was created let's update the user in the db with the new 2fa code
        await User.findOneAndUpdate({ email }, { code });

        //  and tell the user which email it was sent to
        return res.status(status.OK).json(
            {
                message: 'Login success.',
                user: {
                    email
                }
            }
        );

    } catch (err) {
        // Inform user of uncaught error.
        return res.status(status.UNAUTHORIZED).json({
            error: err
        });
    }
}

export const autoSignIn = async (req, res) => {
    try {
        // If no email and password was provided, lets try to use the auth header refresh token in provided
        // Refresh token should come in Authorization header in the form `Bearer ${token}`
        // Let's get the token and verify it with the the refresh token secret
        const refresh = req.headers.authorization?.split(' ')[1]
        if (!refresh) return res.status(status.UNAUTHORIZED).json({
            error: err
        });

        const userInfo = jwt.verify(refresh, config.JWT.REFRESH_SECRET);

        const user = await User.findOne({ email: userInfo.email });

        // Create an initial session token to later be refreshed using a refresh token
        let access = createAccess(
            user.display_name,
            user.email,
            user._id,
            types.ACCESS
        );

        return res.status(status.OK).json(
            {
                message: 'Login success.',
                refresh,
                access,
                user: {
                    email: user.email,
                    name: user.name,
                    friends: user.friends
                }
            }
        );

    } catch (err) {
        // Inform user of uncaught error.
        return res.status(status.UNAUTHORIZED).json({
            error: err
        });
    }
}

export const refresh = async (req, res) => {
    try {
        // Refresh token should come in Authorization header in the form `Bearer ${token}`
        // Let's get the token and verify it with the the refresh token secret
        const refreshTokenFromUser = req.headers.authorization?.split(' ')[1]
        const userFromRefresh = jwt.verify(refreshTokenFromUser, config.JWT.REFRESH_SECRET);
        // If refresh is valid let's use it's information to create a new access token for the user
        if (userFromRefresh.email) {
            const token = createAccess(
                userFromRefresh.email,
                userFromRefresh._id,
                types.ACCESS
            );
            // send the access token back to the user
            return res.status(status.OK).json({ token });
            // Otherwise, let the user know they aren't authorized.
        } else {
            return res.status(status.UNAUTHORIZED).json({
                error: "The token could not be verified."
            });
        }
    } catch (err) {
        return res.status(status.UNAUTHORIZED).json({
            error: err
        });
    }
}

export const match = async (req, res) => {
    const { email, code } = req.body;
    console.log(email, code)

    let user;
    if (email && code) {
        // Search for a user with the given email in the database
        user = await User.findOne({ email });

        // If user with the given email does not exist, inform the client
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                error: 'User does not exist.'
            });
        }

        console.log(user.code)
        console.log(code)

        // If codes do not match, deny access and tell the client
        if (user.code !== code.toUpperCase()) {
            return res.status(status.UNAUTHORIZED).json({
                error: 'Code not matched.'
            });
        }

        if (!user.verified) {
            await User.findOneAndUpdate({ email }, { verified: true })
        }
    }

    // If the user with the email was found and the codes match, send the user info to the client
    try {
        // Create a long-lived refresh token for the client to refresh the session token
        let refresh = createRefresh(
            user.display_name,
            user.email,
            user._id,
            types.USER_REFRESH
        );

        // Create an initial session token to later be refreshed using a refresh token
        let access = createAccess(
            user.display_name,
            user.email,
            user._id,
            types.ACCESS
        );

        return res.status(status.OK).json({
            message: 'Login success.',
            refresh,
            access,
            user: {
                email,
                name: user.name,
                friends: user.friends
            }
        });

    } catch (err) {
        // Inform user of uncaught error.
        return res.status(status.UNAUTHORIZED).json({
            error: err
        });
    }
}

