import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
    background-color: var(--color-grey-200);
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    gap: 2.4rem;
`;

function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;
