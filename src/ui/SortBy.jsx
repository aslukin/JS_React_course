import React from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

function SortBy({ sortOptions }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('SortBy') || '';

    if (!sortOptions || sortOptions?.length === 0) return null;

    function handleChange(event) {
        searchParams.set('SortBy', event.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select
            options={sortOptions}
            onChange={handleChange}
            type='white'
            value={sortBy}
        />
    );
}

export default SortBy;
