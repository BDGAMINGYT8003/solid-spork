import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for subtle background animation (e.g., soft pulsing gradient or floating particles)
const subtleGradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframes for floating elements (if we add them)
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const HomePageContainer = styled(motion.div)`
  min-height: calc(100vh - 120px); // Adjust based on actual header/footer height, aim for full viewport feel
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.warmWhite}, ${({ theme }) => theme.colors.pastelHarmony1} 30%, ${({ theme }) => theme.colors.primary} 70%, ${({ theme }) => theme.colors.secondary} 100%);
  background-size: 400% 400%; // For gradient animation
  animation: ${subtleGradientShift} 25s ease infinite;
  overflow: hidden; // Ensure any decorative elements don't cause scroll
  position: relative; // For positioning decorative elements
`;

// Example of a decorative flourish - can be an SVG or styled div
const Flourish = styled(motion.div)`
  position: absolute;
  opacity: 0.3;
  color: ${({ theme }) => theme.colors.roseGold}; // Using a theme color
  font-family: ${({ theme }) => theme.fonts.main}; // Using the script font for flourish
  font-size: 8rem; // Large, but will be subtle
  user-select: none; // Not selectable

  &.top-left {
    top: 10%;
    left: 10%;
    transform: rotate(-15deg);
    animation: ${float} 8s ease-in-out infinite;
  }
  &.bottom-right {
    bottom: 15%;
    right: 12%;
    transform: rotate(10deg);
    animation: ${float} 10s ease-in-out infinite reverse;
  }
  &.center-ish { // A more subtle, perhaps background-blended one
    top: 50%;
    left: 50%;
    font-size: 15rem;
    opacity: 0.08;
    transform: translate(-50%, -50%) rotate(-5deg);
    color: ${({ theme }) => theme.colors.blush};
  }

  @media (max-width: 768px) {
    font-size: 5rem; // Smaller on mobile
    &.top-left { top: 5%; left: 5%; }
    &.bottom-right { bottom: 8%; right: 8%; }
    &.center-ish { font-size: 10rem; }
  }
`;


const ContentWrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.warmWhite}E6; // Semi-transparent white background for readability
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 800px; // Control content width
  z-index: 1; // Above background elements

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  }
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background-color: ${({ theme }) => theme.colors.warmWhite}F3; // More opaque on small screens
  }
`;

const WelcomeMessage = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.blush};
  font-size: 3.5rem; // Adjusted from theme.typography.h1 for more impact on Home
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const SubText = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.3rem; // Adjusted from theme.typography.h3
  color: ${({ theme }) => theme.colors.textColor};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeartfeltQuote = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 2.2rem; // Slightly larger
  color: ${({ theme }) => theme.colors.accent};
  margin-top: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
  white-space: pre-line; // Respects newlines in the string
  font-weight: 700; // Bolder for emphasis

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Framer Motion variants for animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }
};

const contentVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 } }
};

const textVariants = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { delay: delay + 0.5, duration: 0.6, ease: "circOut" } }
});


const Home = () => {
  return (
    <HomePageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Decorative flourishes - using simple text characters for now, could be SVGs */}
      <Flourish className="top-left" variants={textVariants(0.8)} initial="initial" animate="animate" aria-hidden="true">❦</Flourish>
      <Flourish className="bottom-right" variants={textVariants(1.0)} initial="initial" animate="animate" aria-hidden="true">❀</Flourish>
      <Flourish className="center-ish" variants={textVariants(1.2)} initial="initial" animate="animate" aria-hidden="true"> Mizpah </Flourish>


      <ContentWrapper variants={contentVariants}>
        <WelcomeMessage variants={textVariants(0.2)}>
          To My Dearest Sister, Marzia
        </WelcomeMessage>
        <SubText variants={textVariants(0.4)}>
          This space is a celebration of you, your light, and your beautiful spirit.
        </SubText>
        <HeartfeltQuote variants={textVariants(0.6)}>
          I loooooove you sooooo much,
          you're sooooo adorable and friendly
        </HeartfeltQuote>
      </ContentWrapper>
    </HomePageContainer>
  );
};

export default Home;
