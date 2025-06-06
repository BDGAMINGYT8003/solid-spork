import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Re-usable page transition variants (could be moved to a shared file later)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }
};

const contentSectionVariants = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: delay + 0.3, duration: 0.6, ease: "circOut" } }
});

const PageContainer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
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

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.warmWhite}E6; // Slightly transparent
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  line-height: 1.7; // More spacious line height for readability

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body}; // Using body font for section titles for a softer feel
  font-weight: 700;
  color: ${({ theme }) => theme.colors.roseGold};
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Paragraph = styled.p`
  font-size: 1.05rem; // Slightly larger body text for this page
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: justify; // Justified text for a more formal, story-like feel in sections

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    text-align: left; // Justify might be too much on mobile
  }
`;

const ImagePlaceholder = styled(motion.div)`
  width: 100%;
  height: 300px; // Placeholder height
  background-color: ${({ theme }) => theme.colors.pastelHarmony1}99; // Soft placeholder color
  border: 2px dashed ${({ theme }) => theme.colors.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.textColor}99;
  font-style: italic;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

// Example of a decorative quote style
const Quote = styled(motion.blockquote)`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.warmWhite}F3;
  border-radius: 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0;

  p {
    margin: 0;
  }
`;

const AboutMarzia = () => {
  // Placeholder content - this should be replaced with actual text about Marzia
  const sections = [
    {
      title: "Her Beautiful Soul",
      content: [
        "Marzia was a person of immense kindness and warmth. Her smile could light up any room, and her laughter was infectious. She had a unique way of making everyone around her feel special and loved.",
        "She found joy in the simplest things and taught us the importance of appreciating every moment. Her compassion knew no bounds, and she always extended a helping hand to those in need."
      ],
      image: true // Indicates this section might have an image
    },
    {
      title: "Passions and Dreams",
      content: [
        "Marzia was passionate about [mention a passion, e.g., art, music, nature]. She would spend hours [describe activity related to passion]. Her creativity shone through in everything she did.",
        "She dreamed of [mention a dream or aspiration]. Her determination and positive outlook were truly inspiring."
      ],
      quote: "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt (example)"
    },
    {
      title: "Cherished Memories",
      content: [
        "Every memory with Marzia is a treasure. From [mention a specific type of memory, e.g., family gatherings] to [another type of memory, e.g., quiet conversations], her presence made every occasion brighter.",
        "We will forever cherish the times we shared, the lessons she taught us, and the love she so freely gave."
      ],
      image: true
    }
  ];

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageTitle variants={contentSectionVariants(0)}>Remembering Marzia</PageTitle>

      {sections.map((section, index) => (
        <Section
          key={index}
          variants={contentSectionVariants(index * 0.2)} // Stagger animation for sections
        >
          <SectionTitle>{section.title}</SectionTitle>
          {section.content.map((paragraph, pIndex) => (
            <Paragraph key={pIndex}>{paragraph}</Paragraph>
          ))}
          {section.image && (
            <ImagePlaceholder variants={contentSectionVariants(index * 0.2 + 0.1)}>
              (Space for a cherished photograph)
            </ImagePlaceholder>
          )}
          {section.quote && (
            <Quote variants={contentSectionVariants(index * 0.2 + 0.1)}>
              <p>"{section.quote}"</p>
            </Quote>
          )}
        </Section>
      ))}
    </PageContainer>
  );
};

export default AboutMarzia;
