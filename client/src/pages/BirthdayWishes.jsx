import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, scale: 0.8, rotateY: 90 },
  animate: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.8, type: 'spring', stiffness: 100, damping: 15 } },
  exit: { opacity: 0, scale: 0.8, rotateY: -90, transition: { duration: 0.5, ease: "easeInOut" } }
};

// Animation for sparkles/confetti
const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: translateY(0) scale(0.5) rotate(0deg); }
  25% { opacity: 1; transform: translateY(-20px) scale(1) rotate(90deg); }
  50% { opacity: 1; transform: translateY(0px) scale(0.8) rotate(180deg); }
  75% { opacity: 0.5; transform: translateY(10px) scale(0.9) rotate(270deg); }
`;

const PageContainer = styled(motion.div)`
  min-height: calc(100vh - 120px); // Adjust based on actual header/footer height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}CC, ${({ theme }) => theme.colors.roseGold}B3, ${({ theme }) => theme.colors.pastelHarmony1}CC);
  background-size: 300% 300%;
  animation: ${keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `} 20s ease infinite;
  color: ${({ theme }) => theme.colors.warmWhite}; // White text for contrast against colorful background
  overflow: hidden;
  position: relative; // For positioning decorative elements like sparkles
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white; // Simple white sparkles
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkleAnimation} ${() => Math.random() * 2 + 2}s ease-in-out infinite;
  // Place them randomly
  top: ${() => Math.random() * 100}%;
  left: ${() => Math.random() * 100}%;
  box-shadow: 0 0 5px white, 0 0 10px white; // Glow effect
`;

const BirthdayCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.warmWhite}E6; // Semi-transparent card
  color: ${({ theme }) => theme.colors.textColor}; // Back to normal text color for card content
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: 15px; // More rounded for a softer, gift-like feel
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 600px;
  z-index: 1; // Above background elements

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const MainMessage = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.accent}; // Use a strong accent for the main message
  font-size: 3.8rem; // Extra large
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 1px 1px 3px ${({ theme }) => theme.colors.primary}99;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const SubMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.roseGold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeartfeltWish = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.blush};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Framer Motion variants for content animations
const cardVariants = {
  initial: { opacity: 0, scale: 0.7, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 } }
};

const textVariants = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: delay + 0.8, duration: 0.6, ease: "circOut" } }
});

const BirthdayWishes = () => {
  // Generate a few sparkles
  const numSparkles = 20;
  const sparkles = Array.from({ length: numSparkles }).map((_, i) => <Sparkle key={i} aria-hidden="true" />);

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {sparkles}
      <BirthdayCard variants={cardVariants}>
        <MainMessage variants={textVariants(0)}>
          Happy Birthday, Marzia!
        </MainMessage>
        <SubMessage variants={textVariants(0.2)}>
          Thinking of you on your special day.
        </SubMessage>
        <HeartfeltWish variants={textVariants(0.4)}>
          Your light, your laughter, and your beautiful spirit are celebrated today and always. You are cherished more than words can say.
        </HeartfeltWish>
      </BirthdayCard>
    </PageContainer>
  );
};

export default BirthdayWishes;
