import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class LoginStore {

    @observable isAuthenticated = localStorage.getItem('userId');

    @action LogIn = (userId) => {
        localStorage.setItem('userId', userId);
        this.isAuthenticated = true;
    };

    @action LogOut() {
        fetchPost('changeConnection', `userId=${localStorage.getItem('userId')}`);
        localStorage.setItem('userId', '');
        this.isAuthenticated = false;
    };
}

const Login = new LoginStore();
export default Login;
