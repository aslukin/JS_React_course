import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';

export function useCreateCabin() {
    const queryClient = useQueryClient();
    // const { register, handleSubmit, getValues, reset, formState } = useForm({
    //     defaultValues: isEditing ? editValues : {},
    // });
    // const { errors: submitErrors } = formState;

    const { mutate: insertMutate, isPending: isInsertPending } = useMutation({
        mutationFn: (newCabin) => createCabin(newCabin),
        onSuccess: () => {
            toast.success('New cabin was successfully created');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
            // reset();
        },
        onError: (err) => {
            toast.error('Error during creation of the cabin');
        },
    });
    return { isInsertPending, insertMutate };
}
