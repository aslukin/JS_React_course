import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate: mutateSettings, isPending } = useMutation({
        mutationFn: (data) => updateSettingAPI(data),
        onSuccess: () => {
            toast.success('settings have been updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['settings'],
            });
        },
        onError: (err) => {
            toast.error('Error during settings update');
        },
    });

    return { mutateSettings, isPending };
}
