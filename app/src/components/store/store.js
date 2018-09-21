import {observable, action} from 'mobx';

class Store {

    @observable isAuthenticated = localStorage.getItem('user');

    // @action nameChange = (newname) => {
    //     this.name = newname;
    // };

    @action LogIn = (login) => {
        localStorage.setItem('user', login);
        this.isAuthenticated = true;
    };

    @action LogOut() {
        localStorage.setItem('user', '');
        this.isAuthenticated = false;
    };

    // @computed get userCount() {
    //     return this.users.length;
    // }

}

const myStore = new Store();
export default myStore;
