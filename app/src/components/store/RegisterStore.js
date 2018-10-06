import {observable} from 'mobx';

class RegisterStore {

    @observable login = '';
    @observable password = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable email = '';
    @observable gender = 1;
    @observable formErrors = {password: '', email: '', login: ''};
    @observable emailValid = false;
    @observable passwordValid = false;
    @observable loginValid = false;
    @observable formValid = false;
}

const Register = new RegisterStore();
export default Register;
