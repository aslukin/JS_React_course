import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: logout,
        isPending,
        error,
    } = useMutation({
        mutationFn: () => logoutAPI(),
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', { replace: true });
        },
        onError: (err) => {
            console.log(error);
            toast.error('Logout failed');
        },
    });

    return { logout, isPending, error };
}
