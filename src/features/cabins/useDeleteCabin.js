import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinAPI(id),
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: (err) => {
            return toast.error('Error with deleting cabin.');
        },
    });
    return { isDeleting, deleteCabin };
}
