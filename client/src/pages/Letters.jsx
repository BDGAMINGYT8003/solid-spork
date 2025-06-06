import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Page transition variants (can be centralized later)
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.4, ease: "easeInOut" } }
};

// Variants for individual letters
const letterVariants = {
  initial: { opacity: 0, y: 30, rotateX: -30 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] } } // Custom ease for a gentle unfold
};

const PageContainer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 800px; // Slightly narrower for focused reading
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textColor};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.blush};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }
`;

const LettersContainer = styled(motion.div)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const LetterCard = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.warmWhite}F3; // Slightly more opaque for readability
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: ${({ theme }) => theme.spacing.lg};
  border-left: 5px solid ${({ theme }) => theme.colors.primary}; // Accent border
  position: relative; // For pseudo-elements or decorations

  &:nth-child(odd) {
    border-left-color: ${({ theme }) => theme.colors.secondary};
  }

  // Add a subtle flourish or "stamp" like element
  &::before {
    content: '💌'; // Or a Material Icon like 'drafts' or 'mark_email_read'
    font-family: ${({ theme }) => theme.fonts.main}; // Or a symbol font
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.pastelHarmony1};
    opacity: 0.6;
    transform: rotate(10deg);
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    &::before {
      font-size: 1.5rem;
      top: ${({ theme }) => theme.spacing.sm};
      right: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

const LetterTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.roseGold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.borderColor};
`;

const LetterDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-style: italic;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textColor}99; // Lighter text color
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LetterBody = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  line-height: 1.8; // Generous line height for readability
  color: ${({ theme }) => theme.colors.textColor};
  white-space: pre-line; // Respects newlines in the letter content

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Signature = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;


const Letters = () => {
  // Placeholder letter data - replace with actual letters
  const lettersData = [
    {
      id: 1,
      title: "My Dearest Marzia,",
      date: "October 26, 2023", // Example date
      body: `Words can't express how much you mean to me. Every day, I'm reminded of your incredible spirit, your laughter, and the way you made everything brighter.

      I remember [insert a specific, fond memory here]. It's moments like these that I hold onto so tightly. You taught me so much about [mention a quality, e.g., kindness, resilience, joy].

      Thank you for being you. Your light continues to shine in my heart.`,
      signature: "With all my love,"
    },
    {
      id: 2,
      title: "Thinking of You,",
      date: "November 10, 2023",
      body: `There are so many songs that remind me of you, so many beautiful sunsets I wish I could share. Your friendship was a gift, a true blessing.

      You always knew how to make me smile, even on the toughest days. Your advice was always so thoughtful, and your support unwavering.

      I miss our conversations, our shared dreams, and just knowing you were there. You are forever cherished.`,
      signature: "Always and forever,"
    },
    {
      id: 3,
      title: "A Little Note,",
      date: "December 1, 2023",
      body: `Today, something reminded me of that funny incident when [mention a lighthearted or cute memory]. I found myself smiling, then laughing, just thinking about it.

      You had such a wonderful sense of humor and a way of finding joy in the everyday. Those little things, those small, adorable quirks, are some of the things I miss the most.

      You are so incredibly special.`,
      signature: "With a heart full of affection,"
    }
  ];

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
      >
        Letters to My Sister
      </PageTitle>
      <LettersContainer
        variants={{ animate: { transition: { staggerChildren: 0.2 } } }} // Stagger children animation
        initial="initial"
        animate="animate"
      >
        {lettersData.map((letter) => (
          <LetterCard key={letter.id} variants={letterVariants}>
            <LetterTitle>{letter.title}</LetterTitle>
            <LetterDate>{letter.date}</LetterDate>
            <LetterBody>
              {/* Assuming body is a single string with newlines for pre-line */}
              {letter.body}
            </LetterBody>
            <Signature>{letter.signature}<br/>Your Loving Sibling</Signature>
          </LetterCard>
        ))}
      </LettersContainer>
    </PageContainer>
  );
};

export default Letters;
