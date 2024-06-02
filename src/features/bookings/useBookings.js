import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../constants/globalConstants';

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterValue = searchParams.get('status');
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue, method: 'eq' };

    // SORTING
    const sortOrder = searchParams.get('SortBy') || 'startDate-desc';
    const [sortField, sortDirection] = sortOrder.split('-');

    // PAGINATION
    const currentPage = !searchParams.get('page')
        ? 1
        : parseInt(searchParams.get('page'));

    const {
        isPending: isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortOrder, currentPage],
        queryFn: () =>
            getBookings({
                filter,
                sortBy: {
                    field: sortField,
                    direction: sortDirection,
                },
                currentPage,
            }),
    });

    // PRE_FETCHING

    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortOrder, currentPage + 1],
            queryFn: () =>
                getBookings({
                    filter,
                    sortBy: {
                        field: sortField,
                        direction: sortDirection,
                    },
                    currentPage: currentPage + 1,
                }),
        });
    }
    if (currentPage > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortOrder, currentPage - 1],
            queryFn: () =>
                getBookings({
                    filter,
                    sortBy: {
                        field: sortField,
                        direction: sortDirection,
                    },
                    currentPage: currentPage - 1,
                }),
        });
    }

    return {
        isLoading,
        bookings,
        error,
        count,
    };
}
