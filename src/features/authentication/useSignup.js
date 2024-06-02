import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

export function useSignUp() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate: signUp,
        isPending,
        error,
    } = useMutation({
        mutationFn: ({ email, password, fullName }) =>
            signUpAPI({ email: email, password: password, fullName: fullName }),
        onSuccess: (userData) => {
            // queryClient.setQueryData(['user'], userData.user);
            toast.success(
                `New user ${userData.user.email} successfully created `
            );
            navigate('/', { options: { replace: true } });
        },
        onError: (err) => {
            console.log(error);
            toast.error('Problem appears during creation of the user');
        },
    });

    return { signUp, isPending, error };
}
