import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

function DarkModeToggle() {
    const { isDarkMode, toggleIsDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleIsDarkMode}>
            {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
