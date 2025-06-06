import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000; // Highest z-index
  backdrop-filter: blur(8px);
`;

const PopupContent = styled(motion.div)`
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.warmWhite};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 450px;
  @media (max-width: 480px) {
    max-width: 90vw;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  }
  animation: ${fadeIn} 0.5s ease-out forwards;

  h2 {
    @media (max-width: 480px) {
      font-size: 2rem;
    }
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.warmWhite}; // Ensure it's white
    text-shadow: 1px 1px 2px ${({ theme }) => theme.colors.roseGold}BF;
  }

  p {
    @media (max-width: 480px) {
      font-size: 1rem;
    }
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.2rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  // No close button, will auto-redirect or close programmatically
`;

const HeartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const HeartIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.materialIcons}; // Ensure Material Icons font
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.warmWhite};
  animation: ${HeartBeat} 1s ease-in-out infinite;
  display: inline-block; // For animation to apply correctly
`;


const BirthdayPopup = ({ onShown }) => {
  // Call onShown after a delay to allow popup to be seen before redirect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onShown) {
        onShown();
      }
    }, 2500); // Show popup for 2.5 seconds before triggering redirect logic

    return () => clearTimeout(timer);
  }, [onShown]);

  return (
    <PopupOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Will be immediate if redirect happens
    >
      <PopupContent
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness:150, delay: 0.2 } }}
      >
        <h2>Happy Birthday, Marzia! <HeartIcon>favorite</HeartIcon></h2>
        <p>Celebrating your special day...</p>
        <p style={{fontSize: '0.9rem', opacity: 0.8}}>(You'll be taken to a special page shortly)</p>
      </PopupContent>
    </PopupOverlay>
  );
};

export default BirthdayPopup;
