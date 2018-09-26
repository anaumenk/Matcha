import {observable, action} from 'mobx';

class LoginStore {

    @observable isAuthenticated = localStorage.getItem('userId');

    // @action nameChange = (newname) => {
    //     this.name = newname;
    // };

    @action LogIn = (userId) => {
        localStorage.setItem('userId', userId);
        this.isAuthenticated = true;
    };

    @action LogOut() {
        localStorage.setItem('userId', '');
        this.isAuthenticated = false;
    };
}

const Login = new LoginStore();
export default Login;
