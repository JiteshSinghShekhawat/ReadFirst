import React, { useState } from 'react';

function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            //   onSearch(query);
            prompt('enter your nam');
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <input
                className="py-2 px-3 border-gray-200 border-2 rounded-2xl"
                type="search"
                placeholder={'⌕  Search'}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default Search;
