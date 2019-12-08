import configurationStore from "configuration/stores/config";
import genresStore from "./genres";
import { TYPE_TV, TYPE_MOVIE } from "../constants";

export default class DiscoverItem {
    constructor(item, type) {
        this.item = item;
        this.type = type
    }

    get title() {
        return this.item.original_title;
    }

    get year() {
        return this.item.release_date ? this.item.release_date.substr(0,4) : "";
    }

    get geners() {
        if(this.type === TYPE_MOVIE) {
            return genresStore.getMovieGenre(this.item.genre_ids[0]);
        }
        return genresStore.getTVGenre(this.item.genre_ids[0]);
    }

    get posterUrl() {
        const { poster_path, backdrop_path } = this.item;
        let posterPath = poster_path || backdrop_path;
        return configurationStore.getPosterUrl(posterPath);
    }
}