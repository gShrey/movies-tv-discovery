export default class SearchQuery {

    constructor(type,queryParams) {
        this.setType(type);
        this.setQueryParams(queryParams);
    }

    setQueryParams(queryParams) {
     this.queryParams = queryParams;
    }

    setType(type) {
        this.type = type;
    }

    setRating() {

    }

    static fromQuery(type, queryParams) {
        return new SearchQuery(type, queryParams);
    }
}