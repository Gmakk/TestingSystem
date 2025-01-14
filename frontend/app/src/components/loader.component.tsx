import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoaderSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${p => p.theme.colors.accentBg};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

export const Loader = () => {
    return (
        <LoaderOverlay>
            <LoaderSpinner />
        </LoaderOverlay>
    );
};
