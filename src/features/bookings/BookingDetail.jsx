import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
import { deleteBooking } from '../../services/apiBookings';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { checkout, isCheckingOut } = useCheckout();

    const status = booking?.status;

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    if (isLoading || isCheckingOut) return <Spinner />;
    if (!booking) return <Empty resource='booking' />;

    return (
        <>
            <Row type='horizontal'>
                <HeadingGroup>
                    <Heading as='h1'>Booking # {booking.id}</Heading>
                    <Tag type={statusToTagName[booking.status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            {booking && <BookingDataBox booking={booking} />}

            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button
                        variation='primary'
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                    >
                        Check in
                    </Button>
                )}
                {status === 'checked-in' && (
                    <Button
                        variation='primary'
                        onClick={() => {
                            checkout(booking.id);
                            moveBack();
                        }}
                    >
                        Check out
                    </Button>
                )}
                {status === 'unconfirmed' && (
                    <Modal>
                        <Modal.Open opensWindowName='deleteBooking'>
                            <Button variation='danger'>Delete booking</Button>
                        </Modal.Open>
                        <Modal.Window name='deleteBooking'>
                            <ConfirmDelete
                                resourceName='booking'
                                onConfirm={() => {
                                    deleteBooking(booking.id);
                                    moveBack();
                                }}
                            />
                        </Modal.Window>
                    </Modal>
                )}
                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
