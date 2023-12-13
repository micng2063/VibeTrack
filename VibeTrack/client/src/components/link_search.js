import React from 'react';
import { Link } from 'react-router-dom';

function SearchLink() {
    return (
        <div>
            {/* Add a button that links to the 'Search' route */}
            <Link to="/search">
                <button>Go to Search</button>
            </Link>
        </div>
    );
}

export default SearchLink;
