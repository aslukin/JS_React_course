import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styled from 'styled-components';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';

import { updateCabin } from '../../services/apiCabins';
import { useCreateCabin } from './useCreateCabin';

const StyledRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;
/*

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;
*/

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditing = Boolean(cabinToEdit.id);

    const queryClient = useQueryClient();
    const { register, handleSubmit, getValues, reset, formState } = useForm({
        defaultValues: isEditing ? editValues : {},
    });
    const { errors: submitErrors } = formState;
    /*
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
*/
    const { isInsertPending, insertMutate } = useCreateCabin();

    // TODO: potentially can be separated to another hook
    const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
        mutationFn: (data) => {
            // console.log('DATA', data);
            return updateCabin({ ...data });
        },
        onSuccess: () => {
            toast.success('Cabin  was successfully updated');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
            onCloseModal?.();
        },
        onError: (err) => {
            toast.error('Error during update of cabin information');
        },
    });

    const isLoading = isInsertPending || isUpdatePending;

    function onSubmit(data) {
        // FIXME: fix a reduction of the string to single letter
        // IF data.image is an array - use 0 element, othervise keep full string

        const imageName =
            typeof data.image === 'string' ? cabinToEdit.image : data.image[0];
        if (cabinToEdit.id) {
            updateMutate({
                updatedCabin: { ...data, image: imageName },
                cabinId: cabinToEdit.id,
            });
        } else {
            insertMutate({ ...data, image: imageName });
        }
    }

    function onValidationError(errors) {
        // console.log(errors);
    }

    if (isLoading) return <Spinner />;

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onValidationError)}
            type={onCloseModal ? 'modal' : 'regular'}
        >
            <FormRow label='Cabin name' error={submitErrors?.name?.message}>
                <Input
                    type='text'
                    id='name'
                    {...register('name', {
                        required: 'This field can not be empty',
                    })}
                />
            </FormRow>
            <FormRow
                label='Maximum capacity'
                error={submitErrors?.maxCapacity?.message}
            >
                <Input
                    type='number'
                    id='maxCapacity'
                    {...register('maxCapacity', {
                        required: 'This field can not be empty',
                        min: {
                            value: 1,
                            message: 'Capacity should be grather than 0',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label='Regular price'
                error={submitErrors?.regularPrice?.message}
            >
                <Input
                    type='number'
                    id='regularPrice'
                    {...register('regularPrice', {
                        required: 'This field can not be empty',
                    })}
                />
            </FormRow>
            <FormRow label='Discount' error={submitErrors?.discount?.message}>
                <Input
                    type='number'
                    id='discount'
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field can not be empty',
                        validate: (value) =>
                            Number(value) < Number(getValues().regularPrice) ||
                            'Discount can not be higher than price',
                    })}
                />
            </FormRow>
            <FormRow label='Description for website'>
                <Textarea
                    type='number'
                    id='description'
                    defaultValue=''
                    {...register('description', {
                        required: 'This field can not be empty',
                    })}
                />
            </FormRow>
            <FormRow label='Cabin photo'>
                <FileInput id='image' accept='image/*' {...register('image')} />
            </FormRow>
            <StyledRow>
                <Button
                    variation='secondary'
                    type='reset'
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button>{editId ? 'Edit' : 'Add cabin'}</Button>
            </StyledRow>
        </Form>
    );
}

export default CreateCabinForm;
