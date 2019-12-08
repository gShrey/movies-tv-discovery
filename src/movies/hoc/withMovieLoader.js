import React, { useState } from "react";
import { useLocalStore, observer, useAsObservableSource } from "mobx-react-lite";
import { autorun, toJS } from "mobx";
import configurationStore from "configuration/stores/config";
import genresStore from "../stores/genres";
import useSearchQuery from "../hooks/useSearchQuery";
import DiscoverList from "../stores/discoverList";

export default (MainComponent) =>  {

    return observer((props) => {
        const discoverListStore = useLocalStore(() => new DiscoverList(props.sortingType));
        const configurationStoreLocal = useLocalStore(() => configurationStore);
        const filterQuery = useAsObservableSource(props.filterQuery);
        const { isActive } = props;
        const isActiveObservor = useAsObservableSource({ isActive });
        React.useEffect(() => autorun(() =>{
            if(isActiveObservor.isActive) {
                console.log(toJS(filterQuery), "filterQuery...");
                discoverListStore.setQueryParams(filterQuery);
                discoverListStore.request();
                genresStore.loadGenres();
            }
        }), []);
        if(!isActiveObservor.isActive) {
            return <div />;
        }
        if(discoverListStore.loaded && configurationStoreLocal.loaded && genresStore.loaded) {
            return (<MainComponent {...props} list={discoverListStore.list} />)
        }
        return (
            <div>Loading...</div>
        )
    });
};