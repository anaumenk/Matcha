import {observable, action} from 'mobx';

class Store {

    @observable name = [];

    @action nameChange = (newname) => {
        this.name = newname;
    };
    //
    // @action LogOut = () => {
    //     this.isAuthenticated = false;
    // };

    // @computed get userCount() {
    //     return this.users.length;
    // }

}

const myStore = new Store();
export default myStore;
