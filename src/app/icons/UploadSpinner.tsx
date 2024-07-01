import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loading = styled.div<LoadingProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ border }) => border};
  border-left-color: ${({ highlightedEdgeColor }) => highlightedEdgeColor};
  border-radius: 50%;
  animation: ${rotate} 0.6s linear infinite;
`;

Loading.defaultProps = {
  size: 30,
  border: '2px solid #ddd',
  highlightedEdgeColor: '#000',
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export function UploadSpinner() {
  return (
    <Container>
      <h1>Processing...</h1>
      <Loading size={50} />
    </Container>
  );
}
