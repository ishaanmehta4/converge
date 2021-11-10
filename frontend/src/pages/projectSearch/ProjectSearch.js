import React from 'react'
import { GlobalUserContext } from '../../App'
import algoliasearch from 'algoliasearch/lite'
import SearchCard from '../../components/searchCard/SearchCard';

import './satelliteTheme.css'
import './style.scss'

import {
    InstantSearch,
    Hits,
    SearchBox,
    RefinementList
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    'ZH4AVLMDOX',
    '486758ad5d6465627b652b3812ad5e0d'
);



function Hit(props) {
    return (
        <div className="hit">
            <SearchCard projectData={props.hit} />
        </div>
    )
}

function ProjectSearch() {
    let { globalUserData } = React.useContext(GlobalUserContext)

    return (
        <div>
            <InstantSearch indexName="projects" searchClient={searchClient}>
                <div className="right-panel">
                    <div className="ais-SearchBox-input-wrapper">
                        <SearchBox autoFocus focusShortcuts={['/']} defaultRefinement={globalUserData.skills.join(', ')} />
                    </div>

                    <Hits  hitComponent={Hit} />
                </div>
            </InstantSearch>
        </div>
    )
}

export default ProjectSearch
