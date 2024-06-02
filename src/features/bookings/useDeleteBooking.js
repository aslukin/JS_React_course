import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingAPI(id),
        onSuccess: () => {
            toast.success('Booking successfully deleted');
            queryClient.invalidateQueries({ active: true });
        },
        onError: (err) => {
            return toast.error('Error with deleting cabin.');
        },
    });
    return { isDeleting, deleteBooking };
}
