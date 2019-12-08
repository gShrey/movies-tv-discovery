import { decorate, observable, flow } from "mobx";
import Api from "api";

class Configuration {

    constructor() {
        this.loadConfiguration = flow(this.loadConfiguration);
        this.loading = true;
        this.loaded = true;
        this.config = null;
    }

    * loadConfiguration() {
        try {
            this.loading = true;
            this.loaded = false;
            const response = yield Api.get("/configuration");
            this.config = response.data;
            this.loaded = true;
            this.loading = false;
        }catch(e) {

        }
    }

    getPosterUrl(filePath) {
        const { images: { base_url, poster_sizes } } = this.config;
        return `${base_url}${poster_sizes[2]}${filePath}`
    }
}

decorate(Configuration, {
    loading: observable,
    loaded: observable,

});

export default new Configuration();