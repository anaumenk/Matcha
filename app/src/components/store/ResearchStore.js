import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class ResearchStore {

    @observable userInput = '';
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

    @observable listOfPeople = [];

    @action removeTag = (tagForDel) => {
        let array = [];
        tagForDel = tagForDel.replace('#', '');
        for (let tag of this.tags) {
            if (tag !== tagForDel) {
                array.push(tag);
            }
        }
        this.tags = array;
    };

    @action search = () => {
        let params = `userId=${localStorage.getItem('userId')}
            &sortBy=${this.sortBy}
            &AgeStart=${this.AgeStart}
            &AgeEnd=${this.AgeEnd}
            &DistanceStart=${this.DistanceStart}
            &DistanceEnd=${this.DistanceEnd}
            &RatingStart=${this.RatingStart}
            &RatingEnd=${this.RatingEnd}
            &tags=${this.tags}
            &search=research`;
        fetchPost('search', params).then(response => {
            this.listOfPeople = JSON.parse(response);

        });
        this.display = true;
    };

}

const Research = new ResearchStore();
export default Research;