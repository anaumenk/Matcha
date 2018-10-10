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

    @observable tags = '';
    @observable newTag = '';

    @observable listOfPeople = [];

    // @observable gender = '';
    // @observable orientation = '';

    @action removeTag = (tagForDel) => {
        let array = '';
        tagForDel = tagForDel.replace('#', '');
        let tags = this.tags.split(',');
        for (let tag of tags) {
            if (tag !== tagForDel) {
                array += ',' + tag;
            }
        }
        this.tags = array;
        console.log(this.tags);
    };

    @action addNewTag() {
        let tags = this.tags.split(',');
        for (let tag of tags) {
            if (tag === this.newTag) {
                this.newTag = '';
                return false;
            }
        }
        this.tags += ',' + this.newTag;
        this.newTag = '';
    }

    @action search = (gender, orientation) => {
        console.log(this.sortBy);
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
        }&orientation=${orientation}`;
        fetchPost('search', params).then(response => {
            this.listOfPeople = JSON.parse(response);

        });
        this.display = true;
    };

    @action ifTag() {
        if (this.tags) {
            let tags = this.tags.split(',');
            for (let tag of tags) {
                if (tag === this.newTag) {
                    this.newTag = '';
                    return false;
                }
            }
        }
        return true;
    }
}

const Search = new SearchStore();
export default Search;