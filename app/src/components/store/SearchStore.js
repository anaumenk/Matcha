import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class SearchStore {

    @observable sortBy = 'Age';

    @observable AgeStart = 18;
    @observable AgeEnd = 30;
    @observable DistanceStart = 0;
    @observable DistanceEnd = 100;
    @observable RatingStart = 0;
    @observable RatingEnd = 200;

    @observable minAge = 18;
    @observable maxAge = 100;
    @observable minDistance = 0;
    @observable maxDistance = 100;
    @observable minRating = 0;
    @observable maxRating = 200;

    @observable tags = [];
    @observable newTag = '';

    @observable listOfPeople = [];

    @action removeTag = (tagForDel) => {
        tagForDel = tagForDel.substring(1, tagForDel.length);
        for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i] === tagForDel) {
                this.tags.splice(i);
            }
        }
    };

    @action ifTag() {
        if (this.tags) {
            for (let tag of this.tags) {
                if (tag === this.newTag) {
                    this.newTag = '';
                    return false;
                }
            }
        }
        return true;
    }

    @action search(latitude, longitude) {
        let params = `userId=${localStorage.getItem('userId')
        }&sortBy=${this.sortBy
        }&AgeStart=${this.AgeStart
        }&AgeEnd=${this.AgeEnd
        }&DistanceStart=${this.DistanceStart
        }&DistanceEnd=${this.DistanceEnd
        }&RatingStart=${this.RatingStart
        }&RatingEnd=${this.RatingEnd
        }&tags=${this.tags}&latitude=${latitude}&longitude=${longitude}`;
        console.log(params);
        fetchPost('search', params).then(response => {
            this.listOfPeople = JSON.parse(response);
        });
        this.display = true;
    };

    @action findMatches = (gender, orientation, latitude, longitude) => {
        let params = `userId=${localStorage.getItem('userId')
            }&sortBy=${this.sortBy
            }&AgeStart=${this.AgeStart
            }&AgeEnd=${this.AgeEnd
            }&DistanceStart=${this.DistanceStart
            }&DistanceEnd=${this.DistanceEnd
            }&RatingStart=${this.RatingStart
            }&RatingEnd=${this.RatingEnd
            }&tags=${this.tags
            }&gender=${gender
            }&orientation=${orientation}&latitude=${latitude}&longitude=${longitude}`;
        fetchPost('findMatches', params).then(response => {
            this.listOfPeople = JSON.parse(response);
        });
        this.display = true;
    };

    @action clear() {
        this.sortBy = 'Age';
        this.AgeStart = 18;
        this.AgeEnd = 30;
        this.DistanceStart = 0;
        this.DistanceEnd = 100;
        this.RatingStart = 0;
        this.RatingEnd = 200;

        this.minAge = 18;
        this.maxAge = 100;
        this.minDistance = 0;
        this.maxDistance = 100;
        this.minRating = 0;
        this.maxRating = 200;

        // this.tags = '';
        this.newTag = '';

        this.listOfPeople = [];
    }
}

const Search = new SearchStore();
export default Search;