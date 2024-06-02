import { subDays } from 'date-fns';
import { DEFAULT_DASHBOARD_FILTER } from '../../constants/globalConstants';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams?.get('last')
        ? DEFAULT_DASHBOARD_FILTER
        : Number(searchParams?.get('last'));

    const startDate = subDays(new Date(), numDays).toISOString();

    const { isPending, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(startDate),
        queryKey: ['bookings', `last-${numDays}`],
    });

    return { isPending, bookings, numDays };
}
