import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
/* OLD_VERSION:
const Table = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;
*/

/* OLD_VERSION: definetelly can be used but for sake of training use another way to implement this function in reusable way

function CabinTable() {
    const { isLoading, cabins, error } = useCabins();

    if (isLoading) return <Spinner />;

    if (error) return <span>error.message</span>;

    return (
        <Table role='table'>
            <TableHeader role='row'>
                <div></div>
                <div>cabin</div>
                <div>capacity</div>
                <div>price</div>
                <div>discount</div>
                <div></div>
            </TableHeader>
            {cabins.map((cabin) => (
                <CabinRow cabin={cabin} key={cabin.id} />
            ))}
        </Table>
    );
}

*/

function CabinTable() {
    const { isLoading, cabins, error } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (error) return <span>error.message</span>;

    // Filtering
    const filter = searchParams.get('discount');

    let filteredCabins;
    switch (filter) {
        case 'with-discount':
            filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
            break;
        case 'no-discount':
            filteredCabins = cabins.filter((cabin) => cabin.discount <= 0);
            break;

        default:
            filteredCabins = cabins;
            break;
    }

    // Sorting
    const sortOrder = searchParams.get('SortBy') || 'created_at-asc';
    const [sortField, sortDirection] = sortOrder.split('-');
    const sortDiectionModifier = sortDirection === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) =>
        typeof a[sortField] === 'string'
            ? a[sortField].localeCompare(b[sortField]) * sortDiectionModifier
            : (a[sortField] - b[sortField]) * sortDiectionModifier
    );

    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>cabin</div>
                    <div>capacity</div>
                    <div>price</div>
                    <div>discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
