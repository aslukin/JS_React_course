import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate: login,
        isPending,
        error,
    } = useMutation({
        mutationFn: ({ userId, password }) =>
            loginAPI({ email: userId, password }),
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData.user);
            toast.success(`You have logged in as ${userData.user.email}`);
            redirect('/');
        },
        onError: (err) => {
            toast.error('Provided login and password seems to be incorrect');
        },
    });

    return { login, isPending, error };
}
