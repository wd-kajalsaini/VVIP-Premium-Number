import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
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

  @media (max-width: 768px) {
    padding-left: ${theme.spacing.sm};
    padding-right: ${theme.spacing.sm};
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const Logo = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.xl};
  }

  @media (max-width: 480px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const Tagline = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.orange};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-top: -2px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
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
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                visibility 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    gap: ${theme.spacing.md};
    z-index: 999;
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

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary.green};
  color: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary.orange};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.neutral.gray700};
  font-size: ${theme.typography.fontSize.xl};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  z-index: 1002;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${theme.colors.primary.skyBlue};
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
    <>
      <MobileOverlay $isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
      <HeaderContainer $isScrolled={isScrolled}>
        <Nav>
          <LogoContainer to="/">
            <Logo>Elite VIP Numbers</Logo>
            <Tagline>आपका नंबर आपकी पहचान</Tagline>
          </LogoContainer>

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

            <ContactInfo>
              <ContactButton
                href="https://wa.me/917700071600?text=Hi! I'm interested in premium numbers"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
                WhatsApp
              </ContactButton>
            </ContactInfo>
          </NavLinks>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;