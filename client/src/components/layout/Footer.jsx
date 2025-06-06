import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary}CC; // Slight transparency
  color: ${({ theme }) => theme.colors.textColor};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-top: auto; // Pushes footer to the bottom if content is short
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05); // Subtle shadow upwards
`;

const HeartIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.2em;
  vertical-align: middle;
`;

const FooterText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Made with <HeartIcon className="material-icons" aria-hidden="true">favorite</HeartIcon> in loving memory of Jannatul Ferdaus Marzia.
      </FooterText>
      <FooterText style={{ marginTop: '8px' }}>
        "I loooooove you sooooo much, you're sooooo adorable and friendly."
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
