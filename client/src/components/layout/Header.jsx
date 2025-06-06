import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Will be used properly in the next step

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary}CC; // Add some transparency
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(5px); // Frosted glass effect

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  color: ${({ theme }) => theme.colors.warmWhite};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    transform: translateY(-1px) scale(1.03);
    color: ${({ theme }) => theme.colors.pastelHarmony1};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%; // Position below the header
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.primary}EE; // Slightly less transparent
    padding: ${({ theme }) => theme.spacing.md} 0;
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.warmWhite};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  text-decoration: none;
  margin: 0 ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease-out;

  &:hover {
    transform: translateY(-1px) scale(1.03);
    background-color: ${({ theme }) => theme.colors.roseGold}99;
    color: ${({ theme }) => theme.colors.warmWhite};
  }

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.sm} 0;
    width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md} 0;

    &:hover {
    transform: translateY(-1px) scale(1.03);
      background-color: ${({ theme }) => theme.colors.roseGold};
    }
  }
`;

const HamburgerMenu = styled.button`
  display: none; // Hidden by default
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001; // Above NavLinks when it's absolute

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Placeholder links - will be updated with actual routes
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Marzia' },
    { path: '/moments', label: 'Moments' },
    { path: '/letters', label: 'Letters' },
  ];

  return (
    <HeaderContainer>
      <Logo to="/">Marzia</Logo>
      <HamburgerMenu onClick={toggleMenu}>
        {/* Using Material Icons */}
        <span className="material-icons" aria-hidden="true">{isOpen ? 'close' : 'menu'}</span><span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      </HamburgerMenu>
      <NavLinks isOpen={isOpen}>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
