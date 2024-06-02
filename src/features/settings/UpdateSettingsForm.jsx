import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

// DATA_MODEL:
/* settings : {
  minimumBookingLength,
  maximumBookingLength,
  maxGuestsPerBooking,
  breakfastPrice,
}*/

function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();
    const { isPending, mutateSettings } = useUpdateSettings();
    const isDisabled = isLoading || isPending;

    if (isDisabled) return <Spinner />;

    function handleBlur(event, fieldName) {
        const { value } = event.target;
        console.log(value, fieldName);
        if (!value) return;
        if (value === settings[fieldName]) return;

        mutateSettings({ [fieldName]: value });
    }

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    id='min-nights'
                    defaultValue={settings?.minimumBookingLength}
                    disabled={isDisabled}
                    onBlur={(event) =>
                        handleBlur(event, 'minimumBookingLength')
                    }
                />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    id='max-nights'
                    disabled={isDisabled}
                    defaultValue={settings?.maximumBookingLength}
                    onBlur={(event) =>
                        handleBlur(event, 'maximumBookingLength')
                    }
                />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    id='max-guests'
                    disabled={isDisabled}
                    defaultValue={settings?.maxGuestsPerBooking}
                    onBlur={(event) => handleBlur(event, 'maxGuestsPerBooking')}
                />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    id='breakfast-price'
                    disabled={isDisabled}
                    defaultValue={settings?.breakfastPrice}
                    onBlur={(event) => handleBlur(event, 'breakfastPrice')}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
