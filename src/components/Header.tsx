import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${props => props.$isScrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isScrolled 
    ? theme.shadows.md 
    : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${theme.spacing.md};
  padding-right: ${theme.spacing.md};
`;

const Logo = styled(Link)`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${theme.colors.neutral.white};
    flex-direction: column;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    box-shadow: ${theme.shadows.lg};
    transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    gap: ${theme.spacing.md};
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive 
    ? theme.colors.primary.skyBlue 
    : theme.colors.neutral.gray700};
  font-weight: ${props => props.$isActive 
    ? theme.typography.fontWeight.semibold 
    : theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${theme.colors.primary.skyBlue};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: ${theme.colors.primary.skyBlue};
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: ${theme.spacing.sm};
  }
`;

const Button = styled(Link)<{ $variant: 'outline' | 'filled' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: center;
  display: inline-block;

  ${props => props.$variant === 'outline' 
    ? `
      color: ${theme.colors.primary.skyBlue};
      border: 2px solid ${theme.colors.primary.skyBlue};
      background: transparent;

      &:hover {
        background: ${theme.colors.primary.skyBlue};
        color: ${theme.colors.neutral.white};
      }
    `
    : `
      color: ${theme.colors.neutral.white};
      background: linear-gradient(135deg, 
        ${theme.colors.primary.green}, 
        ${theme.colors.primary.skyBlue}
      );
      border: 2px solid transparent;

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
    `
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: ${theme.spacing.md};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${theme.colors.neutral.gray700};
  font-size: ${theme.typography.fontSize.xl};
  padding: ${theme.spacing.sm};

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/vvip-collection', label: 'VVIP Collection' },
    { path: '/how-it-works', label: 'How it Works' },
    { path: '/numerology', label: 'Numerology' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Nav>
        <Logo to="/">Premium Numbers</Logo>

        <NavLinks $isOpen={isMobileMenuOpen}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <AuthButtons>
            <Button
              to="/login"
              $variant="outline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Button>
            <Button
              to="/signup"
              $variant="filled"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Button>
          </AuthButtons>
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;