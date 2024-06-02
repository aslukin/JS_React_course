import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ fullName, password, avatar }) =>
            updateCurrentUser({ fullName, password, avatar }),
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            toast.success('Information updated successfully');
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isPending };
}
