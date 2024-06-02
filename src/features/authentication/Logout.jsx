import React from 'react';
import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
    const { logout, isPending, error } = useLogout();

    return (
        <ButtonIcon onClick={() => logout()} disabled={isPending}>
            {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    );
}

export default Logout;
