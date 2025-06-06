import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure footer is at the bottom even with little content
`;

const ContentWrapper = styled.main`
  flex-grow: 1; // Allows content to take up available space
  padding-top: 0; // Header is sticky, so no extra padding needed here initially
                 // This might need adjustment based on final header height and behavior.
`;

const MainLayout = ({ children }) => {
  return (
    <SiteContainer>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </SiteContainer>
  );
};

export default MainLayout;
