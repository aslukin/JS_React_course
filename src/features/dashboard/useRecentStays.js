import { subDays } from 'date-fns';
import { DEFAULT_DASHBOARD_FILTER } from '../../constants/globalConstants';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams?.get('last')
        ? DEFAULT_DASHBOARD_FILTER
        : Number(searchParams?.get('last'));

    const startDate = subDays(new Date(), numDays).toISOString();

    const { isPending, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(startDate),
        queryKey: ['bookings', `stays-last-${numDays}`],
    });

    const confirmedStays = stays?.filter(
        (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
    );

    return { isPending, stays, confirmedStays, numDays };
}
