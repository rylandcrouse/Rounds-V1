import api from '../../utils/api/index'
import { runInAction, makeAutoObservable } from "mobx"

class Auth {
    loading = false;
    success = null;
    error = '';

    autoTried = false;

    user;

    matchEmail;

    constructor() {
        makeAutoObservable(this);
    }

    auto = async () => {
        let result;
        try {
            result = await api.auth.autoSignIn();
        } catch (err) {
            console.log('Error');
        }
        runInAction(() => {
            if (result && result.user) {
                this.user = result.user;
            }
            this.autoTried = true;
        })
    }

    login = async (loginInfo) => {
        let result;
        console.log('lightweight')
        try {
            result = await api.auth.signIn(loginInfo);
            console.log(result);
            runInAction(() => {
                if (result && result.user) {
                    this.matchEmail = result.user.email;
                }
            })
        } catch (err) {
            console.log('You have been stopped.')
        }
    }
}

export default Auth;