class FacetList{
    facetListName;
    facetList;

    constructor(facetListName){
        this.facetListName = facetListName;
        this.facetList = {};
    }

    addFacet(facetName, facet){
        this.facetList[facetName] = facet;
    }
}