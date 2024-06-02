import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';
import { formatCurrency } from '../../utils/helpers';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { booking, isLoading } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();

    const { isLoading: isLoadingSettings, error, settings } = useSettings();

    const moveBack = useMoveBack();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid || false);
        setAddBreakfast(booking?.hasBreakfast || false);
    }, [booking]);

    if (isLoading || isCheckingIn || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
        isPaid,
    } = booking;

    const optionalBreakfastPrice =
        settings.breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfastDetails: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfastDetails: {} });
        }
    }

    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((checked) => !checked);
                            setConfirmPaid(false);
                        }}
                        id='addBreakfast'
                    >
                        Add breakfast to the order for{' '}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id='confirm'
                    disabled={confirmPaid}
                >
                    Payment for amount{' '}
                    {!addBreakfast
                        ? formatCurrency(totalPrice) + ' '
                        : `${formatCurrency(
                              totalPrice
                          )} and breakfast ${formatCurrency(
                              optionalBreakfastPrice
                          )} `}
                    confirmed
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
