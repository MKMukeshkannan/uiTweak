import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% {
    transform: scaleY(0)
}
80% {
    transform: scaleY(1.1)
}
100% {
    transform: scaleY(1)
}
`;

// Here we create a component that will rotate everything we pass in over two seconds
export const AnimateDown = styled.div`
  animation: ${rotate} 2s linear;
`;

// export const AnimateDown = styled.div`
//   color: red;
// `;
