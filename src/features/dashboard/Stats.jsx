import React from 'react';
import Stat from './Stat';
import {
    HiBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
    const numBookings = bookings.length;
    const totalSales = bookings.reduce(
        (acc, booking) => acc + booking.totalPrice,
        0
    );
    const checkinCount = confirmedStays.length;

    const occupancyRate =
        (
            (confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
                (numDays * cabinCount)) *
            100
        )
            .toFixed(1)
            .toString() + '%';
    return (
        <>
            <Stat
                title='Bookings'
                color={'blue'}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title='Sales'
                color={'green'}
                icon={<HiBanknotes />}
                value={formatCurrency(totalSales)}
            />
            <Stat
                title='Checkins'
                color={'indigo'}
                icon={<HiOutlineCalendarDays />}
                value={checkinCount}
            />
            <Stat
                title='Occupancy rate'
                color={'yellow'}
                icon={<HiOutlineChartBar />}
                value={occupancyRate}
            />
        </>
    );
}

export default Stats;
