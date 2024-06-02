/*eslint no-constant-condition: ["off", { "checkLoops": false }]*/

import styled, { css } from 'styled-components';

// const textAlign = css`
//     text-align: center;
//     color: var(--color-grey-800);
//     `;

const Heading = styled.h1`
    ${(props) =>
        props.as === 'h1' &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}
    ${(props) =>
        props.as === 'h2' &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}
    ${(props) =>
        props.as === 'h3' &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}
    ${(props) =>
        props.as === 'h4' &&
        css`
            font-size: 2rem;
            font-weight: 600;
            text-align: center;
        `}
`;
/* background-color: salmon; */

export default Heading;
