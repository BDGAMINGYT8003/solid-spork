import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "easeIn" } }
};

// Content animation variants
const contentVariants = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: delay + 0.2, duration: 0.6, ease: "circOut" } }
});

const PageContainer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 700px; // Narrower for a more focused, intimate feel
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
  min-height: calc(100vh - 200px); // Ensure it takes up space
  display: flex;
  flex-direction: column;
  justify-content: center; // Center content vertically
`;

const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.blush};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }
`;

const MessageBlock = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.warmWhite}E6;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.7;
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const HeartIcon = styled(motion.span)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 2.5rem; // Larger heart
  display: inline-block; // Allows for motion animation
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Contact = () => {
  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageTitle variants={contentVariants(0)}>A Final Thought</PageTitle>

      <MessageBlock variants={contentVariants(0.2)}>
        <Paragraph>
          This space is a quiet tribute, a collection of loving memories and heartfelt words for Marzia.
        </Paragraph>
        <Paragraph>
          She touched so many lives with her kindness, her laughter, and her beautiful spirit.
          If you have a cherished memory or a warm thought you wish to hold in your heart for her,
          this is a place to feel that connection.
        </Paragraph>
        <Paragraph>
          Her light continues to shine brightly in all who knew and loved her.
        </Paragraph>
      </MessageBlock>

      <motion.div variants={contentVariants(0.4)}>
        <HeartIcon
          className="material-icons"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.8, type: 'spring', stiffness: 150 } }}
        >
          favorite
        </HeartIcon>
      </motion.div>

    </PageContainer>
  );
};

export default Contact;
