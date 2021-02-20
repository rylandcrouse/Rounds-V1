import axios from 'axios';
import config from './../config';

class Auth {
    axiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: `http://${config.auth.host}:${config.auth.port}`,
            timeout: 30000,
            // Attaches refresh token in header to retrieve further access tokens
            headers: { Authorization: `Bearer ${this.getRefreshToken()}` },
        });

        // Add a request interceptor
        this.axiosInstance.interceptors.request.use((config) => {
            // const token = store.getState().session.token;
            // config.headers.Authorization = token;

            return config;
        });

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(({ data }) => {
            // if api call successfull return the data
            return data;
        }, async (err) => {
            // If our request is denied, we may need a new access token
            // Let's get a new access token and try once more                                                                                                                                                                                                                                                                                                                                                           
            const originalRequest = err.config;
            console.log(err)
            if (err.response && err.response.status === 401 && !originalRequest._retry) {
                // we only want to try with a new token once, else it may be another problem
                originalRequest._retry = true;
                try {
                    // 1) Attempt to renew our access token
                    // await this.refreshAccess();
                    // 2) Change Authorization header
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getAccessToken();

                    // 3) return originalRequest object with Axios.
                    return axios(originalRequest);
                } catch (err) {
                    throw new Error(err);
                }
            }
        })

    }

    // Handles sign up
    register = async (newUserInfo) => {
        // upon success, returns response containing email for 2fa authentication
        try {
            const result = await this.axiosInstance.post('/users/signup', newUserInfo);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    // Handles sign in
    signIn = async (user) => {
        // upon success, returns response containing email for 2fa authentication
        try {
            const match = await this.axiosInstance.post('/users/signin', user);
            return match;
        } catch (err) {
            throw new Error(err);
        }
    }

    // Client should find email from rounds with 2FA code
    // They should type that code into the client and send
    // The client will recieve user info if the code matches
    match = async (user) => {
        try {
            //  Destructure the response so that we can save the
            //   refresh token and initial access token in localStorage and be sure not to send it
            //       to action so it won't be saved in app state for security purposes...
            const { refresh, access, ...result } = await this.axiosInstance.post('/users/match', user);
            if (refresh) {
                localStorage.setItem('rounds-refresh', refresh);
                localStorage.setItem('rounds-access', access);
            }
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    // Uses refresh token kept in auth header by the axios instance to retrieve a new access token from the auth API
    refreshAccess = async () => {
        try {
            const result = await this.axiosInstance.post('/users/refresh');
            if (result.token) {
                localStorage.setItem('rounds-access', result.token);
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    // Try to log the client in automatically if they have a rounds-refresh token
    autoSignIn = async () => {
        try {
            // If there is no refresh token in local storage, do not attempt auto sign in
            console.log(this.getRefreshToken())
            if (!this.getRefreshToken()) return;
            //  Destructure the response so that we can save the
            //   same refresh token and initial access token in localStorage and be sure not to send it
            //       to action so it won't be saved in app state...
            const { refresh, access, ...result } = await this.axiosInstance.post('/users/auto');
            if (refresh) {
                localStorage.setItem('rounds-refresh', refresh);
                localStorage.setItem('rounds-access', access);
            }
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    signOut = () => {
        localStorage.removeItem('rounds-refresh');
        localStorage.removeItem('rounds-access');
    }

    // Retrieve access token from localStorage
    getAccessToken = () => {
        return localStorage.getItem('rounds-access');
    }

    // Retrieves refresh token from local storage
    getRefreshToken = () => {
        return localStorage.getItem('rounds-refresh');
    }
}

export default Auth;