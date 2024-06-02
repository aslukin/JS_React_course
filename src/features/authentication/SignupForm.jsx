import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from '../authentication/useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, formState, getValues, handleSubmit } = useForm();
    const { signUp, isPending, error } = useSignUp();
    const { errors } = formState;

    function onSubmit(data) {
        const newUser = signUp({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
        });
        console.log('ON_SUBMIT', newUser);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label='Full name' error={errors?.fullName?.message}>
                <Input
                    type='text'
                    id='fullName'
                    {...register('fullName', {
                        required: 'This field can not be empty',
                    })}
                />
            </FormRow>

            <FormRow label='Email address' error={errors?.email?.message}>
                <Input
                    type='email'
                    id='email'
                    {...register('email', {
                        required: 'This field can not be empty',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please provide valid email',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label='Password (min 8 characters)'
                error={errors?.password?.message}
            >
                <Input
                    type='password'
                    id='password'
                    {...register('password', {
                        required: 'This field can not be empty',
                        minLength: {
                            value: 8,
                            message: 'Password should be minimum 8 symbols',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label='Repeat password'
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type='password'
                    id='passwordConfirm'
                    {...register('passwordConfirm', {
                        required: 'This field can not be empty',
                        validate: (value) => {
                            return (
                                value === getValues().password ||
                                'Passwords should match'
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation='secondary' type='reset'>
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
