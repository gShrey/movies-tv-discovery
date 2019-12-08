import React from "react";

export const FilterContext = React.createContext({});

export default function() {
    const searchQuery = React.useContext(FilterContext);
    return searchQuery;
}