import { flow, decorate, observable } from "mobx";
import Api from "api";
import { TYPE_MOVIE, TYPE_TV } from "../constants";

class Genres {
    constructor() {
        this.tvGenres = {};
        this.movieGenres = {};
        this.loadGenres = flow(this.loadGenres);
        this.loaded = false;
        this.loading = false;
    }

    createMap(genres) {
        const map = {};
        genres.forEach((genre) =>{
            map[genre.id] = genre.name;
        });
        return map;
    }

    * loadGenres() {
        try {
            if(this.loading || this.loaded) {
                return;
            }
            this.loading = true;
            this.loaded = false;
            const [ tvGenresResponse, movieGenresResponse ] = yield Promise.all([  Api.get("/genre/tv/list") , Api.get("/genre/movie/list")  ]);
            this.tvGenres = this.createMap(tvGenresResponse.data.genres);
            this.movieGenres = this.createMap(movieGenresResponse.data.genres);
            this.loaded = true;
            this.loading = false;
        }catch(e) {

        }
    };

    getGenresFor(type) {
        if(type === TYPE_MOVIE) {
            return this.movieGenres;
        }
        return this.tvGenres;
    }

    getTVGenre(genreId) {
        return this.tvGenres[genreId];
    }

    getMovieGenre(genreId) {
        return this.movieGenres[genreId];
    }
}

decorate(Genres, {
    loading: observable,
    loaded: observable,
});

export default new Genres();