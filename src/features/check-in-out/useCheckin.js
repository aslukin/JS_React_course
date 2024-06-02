import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isPending: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfastDetails }) =>
            updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true,
                ...breakfastDetails,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate('/');
        },
        onError: () => {
            toast.error(`Failed to update booking `);
        },
    });
    return { checkin, isCheckingIn };
}
