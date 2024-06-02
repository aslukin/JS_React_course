import React from 'react';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField='discount'
                filterOptions={[
                    { value: 'all', label: 'All' },
                    { value: 'with-discount', label: 'With Discount' },
                    { value: 'no-discount', label: 'No discount' },
                ]}
            />
            <SortBy
                sortOptions={[
                    {
                        value: 'name-asc',
                        direction: 'asc',
                        label: 'Cabin name (A-Z)',
                    },
                    {
                        value: 'name-desc',
                        direction: 'desc',
                        label: 'Cabin name (Z-A)',
                    },
                    {
                        value: 'regularPrice-asc',
                        direction: 'asc',
                        label: 'Standard price (low to high)',
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
