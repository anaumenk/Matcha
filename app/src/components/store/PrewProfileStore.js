import {observable, action} from 'mobx';
import React from 'react';
import PrewProfile from '../Pages/PrewProfile';
import {fetchPost} from "../../fetch";

class PrewProfileStore {

    @observable profile = '';
    @observable userId = '';
    @observable photoOne = '';
    @observable photoTwo = '';
    @observable photoThree = '';
    @observable photoFour = '';
    @observable photoFive = '';
    @observable currPhoto = '';
    @observable login = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable orientation = '';
    @observable gender = '';
    @observable occupation = '';
    @observable biography = '';
    @observable rating = '';
    @observable tags = [];
    @observable birth = '';
    @observable connection = '';


    @action openUserProfile = (idWho, idWhom) => {
        fetchPost('prewUser', `idWho=${idWho}&idWhom=${idWhom}`).then(response => {
            let userInfo = JSON.parse(response);
            this.userId = userInfo[0]['userId'];
            this.photoOne = userInfo[1][0][1];
            this.photoTwo = userInfo[1][0][2];
            this.photoThree = userInfo[1][0][3];
            this.photoFour = userInfo[1][0][4];
            this.photoFive = userInfo[1][0][5];
            this.currPhoto = this.photoOne;
            this.login = userInfo[0]['login'];
            this.firstName = userInfo[0]['firstName'];
            this.lastName = userInfo[0]['lastName'];
            this.orientation = userInfo[0]['orientation'];
            this.gender = userInfo[0]['gender'];
            this.occupation = userInfo[0]['occupation'];
            this.biography = userInfo[0]['biography'];
            this.rating = userInfo[0]['rating'];
            this.tags = userInfo[2];
            this.birth = userInfo[0]['birth'];

            this.connection = this.lastConnect(userInfo[0]['connection']);
            this.profile = <PrewProfile />
        });
    };

    @action blockUser(whom, who) {
        fetchPost('blockUser', `who=${who}&whom=${whom}`);
    }

    @action likeUser(whom, who) {
        fetchPost('likeUser', `who=${who}&whom=${whom}`);
    }

    @action unLikeUser(whom, who) {
        fetchPost('unLikeUser', `who=${who}&whom=${whom}`);
    }

    @action lastConnect(time) {
        let last = '';

        if (time[0] > 0) {
            last += `${time[0]} years `;
        }
        if (time[1] > 0) {
            last +=`${time[1]} month `;
        }
        if (time[2] > 0) {
            last += `${time[2]} days `;
        }
        if (time[3] > 0) {
            last += `${time[3]} hours `;
        }
        if (time[4] > 0) {
            last += `${time[4]} minutes `;
        }
        last += 'ago';
        if (time[0] === 0 && time[1] === 0 && time[2] === 0 && time[3] === 0 && time[4] < 3) {
            last = 'online';
        }
        return last;
    }

}

const Prew = new PrewProfileStore();
export default Prew;