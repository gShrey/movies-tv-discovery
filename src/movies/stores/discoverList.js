import { decorate, action, flow, observable, toJS  } from "mobx";
import Api from "api";
import Item from "./discoverItem";
import { TYPE_TV, TYPE_MOVIE, SORTING_TYPES } from "../constants";

class DiscoverList {
    constructor(sortingType) {
        this.queryParams = { type: TYPE_MOVIE };
        this.request = flow(this.request);
        this.loading = true;
        this.loaded = false;
        this.list = [];
        this.paging = {};
        this.page = 1;
        this.sortingType = sortingType;
    }

    getSortingQueryParam(sortingType) {
        const map = {
            [SORTING_TYPES.POPULAR] : "popularity.desc",
            [SORTING_TYPES.TOP_REATED]: "vote_average.desc",
            [SORTING_TYPES.NEWEST]:  "release_date.desc"
        };
        return map[sortingType];
    }

    buildUrl() {
        let path = "/discover";
        const params = {
            "language": "en-US",
            "include_adult": false,
            "include_video": false,
            "page": this.page,
            "with_genres": this.queryParams.withGenres,
        };
        const mediaType = this.queryParams.type === TYPE_TV ? "tv" : "movie";
        if(this.sortingType === SORTING_TYPES.TREND) {
            path = `/trending/${mediaType}/week`;

        }else {
            path = `/discover/${mediaType}`;
            params["sort_by"] = this.getSortingQueryParam(this.sortingType);
        }

        return { path , params };
    }

    * request() {
        try {
            this.loading = true;
            const { path, params } = this.buildUrl();
            console.log({ path, params });
            const response = yield Api.get(path, { params });
            const { data: { total_pages, page, results,  } } = response;
            this.paging = { page: page, totalPages: total_pages };
            this.list = results.map((item) => new Item(item, this.type));
            this.loading = false;
            this.loaded = true;
        }catch(e) {
            console.log()
        }
    }

    setQueryParams(queryParams) {
        const currentQueryParams = toJS(this.queryParams);
        this.queryParams = { ...currentQueryParams, ...queryParams };
    }

}

decorate(DiscoverList,{
    queryParams: observable,
    setQueryParams: action,
    list: observable,
    type: observable,
    loading: observable,
    loaded: observable
});

export default DiscoverList;