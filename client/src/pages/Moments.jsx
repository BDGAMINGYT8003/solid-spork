import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeInOut" } }
};

const galleryVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } }
};

const PageContainer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px; // Wider for gallery layout
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

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Responsive grid
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const MomentItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.warmWhite};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: ${({ theme }) => theme.shadows.soft}; // Lighter shadow on hover for 'lift'
  }
`;

const MomentImage = styled.img`
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3; // Maintain aspect ratio
  object-fit: cover; // Cover the area, cropping if necessary
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`;

const MomentCaption = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textColor};

  h3 {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.roseGold};
    font-size: 1.3rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
  p {
    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

// Modal for displaying larger image and more details
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; // Above header
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.warmWhite};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 70vw;
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 60vh;
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    object-fit: contain; // Ensure whole image is visible in modal
  }

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ModalDescription = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.textColor};
  line-height: 1.6;
  text-align: center;
  h2 {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.blush};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;


const Moments = () => {
  const [selectedMoment, setSelectedMoment] = useState(null);

  const momentsData = Array.from({ length: 9 }).map((_, index) => ({
    id: index,
    imageUrl: `https://source.unsplash.com/random/400x300?sig=${index}&nature,flowers,pink,sky,smile`,
    placeholderText: `Moment ${index + 1}`,
    title: `A Beautiful Memory ${index + 1}`,
    caption: `A brief, sweet description of this cherished moment. It felt like magic.`,
    details: `More detailed story about this moment. It was a sunny afternoon, and the air was filled with laughter. We talked for hours, sharing dreams and silly jokes. This memory always brings a warm smile to my face.`
  }));

  const openModal = (moment) => setSelectedMoment(moment);
  const closeModal = () => setSelectedMoment(null);

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
        Cherished Moments
      </PageTitle>
      <GalleryGrid
        variants={galleryVariants}
        initial="initial"
        animate="animate"
      >
        {momentsData.map((moment) => (
          <MomentItem
            key={moment.id}
            onClick={() => openModal(moment)}
            variants={itemVariants}
            layout // Enables smooth re-ordering if gallery items change
          >
            <MomentImage
              src={moment.imageUrl}
              alt={moment.title}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                e.target.src = `https://via.placeholder.com/400x300.png?text=${encodeURIComponent(moment.placeholderText)}`;
              }}
            />
            <MomentCaption>
              <h3>{moment.title}</h3>
              <p>{moment.caption}</p>
            </MomentCaption>
          </MomentItem>
        ))}
      </GalleryGrid>

      <AnimatePresence>
        {selectedMoment && (
          <ModalOverlay
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            >
              <img
                src={selectedMoment.imageUrl}
                alt={selectedMoment.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/600x450.png?text=${encodeURIComponent(selectedMoment.placeholderText)}`;
                }}
              />
              <ModalDescription>
                <h2>{selectedMoment.title}</h2>
                <p>{selectedMoment.details}</p>
              </ModalDescription>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Moments;
