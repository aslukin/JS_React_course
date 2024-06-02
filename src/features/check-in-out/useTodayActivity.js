import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
    const { isPending, data } = useQuery({
        queryKey: ['bookings', 'today'],
        queryFn: () => getStaysTodayActivity(),
    });
    return { isPending, data };
}
