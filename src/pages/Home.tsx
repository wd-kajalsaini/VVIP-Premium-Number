import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaShieldAlt, FaRocket, FaPhoneAlt, FaCrown, FaMagic, FaFilter, FaGlobe } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HomeContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
`;

const NumbersWithSidebar = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-right: 1px solid ${theme.colors.neutral.gray200};
  padding: ${theme.spacing.md};
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);

  @media (max-width: 1024px) {
    width: 250px;
    padding: ${theme.spacing.sm};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: ${theme.colors.neutral.gray50};
  overflow-x: hidden;
  width: 100%;
  min-width: 0;
`;

const SidebarTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: left;
  border-bottom: 2px solid #20b2aa;
  padding-bottom: ${theme.spacing.xs};
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 0;
`;

const CategoryLink = styled.label<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  color: ${props => props.$isActive ? '#20b2aa' : theme.colors.neutral.gray700};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.$isActive
    ? 'linear-gradient(135deg, #20b2aa20, #48cae420)'
    : theme.colors.neutral.white};
  border: 1px solid ${props => props.$isActive
    ? '#20b2aa'
    : theme.colors.neutral.gray300};
  transition: all 0.3s ease;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.xs};
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #20b2aa15, #48cae415);
    border-color: #20b2aa;
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(32, 178, 170, 0.2);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`;

const CategoryName = styled.span`
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const CategoryCount = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.8;
  background: ${theme.colors.neutral.gray200};
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.neutral.gray600};
`;

const CategoryCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing.sm};
  accent-color: #20b2aa;
  cursor: pointer;
`;

const PriceRange = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.7;
  color: ${theme.colors.neutral.gray500};
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 600px;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    min-height: 500px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 500px;
  }
`;

const CarouselSlide = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$isActive ? 1 : 0};
  transform: ${props => props.$isActive ? 'scale(1) translateX(0)' : 'scale(1.05) translateX(0)'};
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.$isActive
      ? 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 100%)'
      : 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 100%)'};
    transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(1.1) translateX(30px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateX(-30px);
    }
  }

  ${props => props.$isActive && `
    animation: slideIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
`;

const CarouselOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.8) 0%, rgba(247, 147, 30, 0.8) 25%, rgba(255, 204, 2, 0.8) 50%, rgba(255, 107, 53, 0.8) 75%, rgba(255, 75, 75, 0.8) 100%);
  z-index: 1;
  transition: all 1s ease-in-out;
  opacity: 0.9;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shimmer 4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const CarouselNavigation = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 3;
`;

const CarouselDot = styled.button<{ $isActive: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.neutral.white};
  background: ${props => props.$isActive ? theme.colors.neutral.white : 'rgba(0, 0, 0, 0.5)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$isActive ? 1 : 0.7};
  box-shadow: ${props => props.$isActive
    ? '0 4px 15px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)'
    : '0 2px 8px rgba(0, 0, 0, 0.3)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${props => props.$isActive
      ? 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)'
      : 'transparent'};
    animation: ${props => props.$isActive ? 'pulse 2s ease-in-out infinite' : 'none'};
    border-radius: 50%;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }

  &:hover {
    opacity: 1;
    transform: scale(1.3);
    background: ${theme.colors.neutral.white};
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5);
  }
`;

const CarouselArrow = styled.button<{ $direction: 'left' | 'right' }>`
  display: none;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  text-align: center;
  gap: ${theme.spacing.xl};

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const HeroText = styled.div`

`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  opacity: 0.9;
  margin-bottom: ${theme.spacing.md};
  line-height: 1.4;
`;

const HeroButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.neutral.white};
  color: ${theme.colors.primary.orange};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const HeroImage = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroPhone = styled.div`
  background: ${theme.colors.neutral.white}20;
  border: 2px solid ${theme.colors.neutral.white}40;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  text-align: center;
  backdrop-filter: blur(10px);
`;

const PhoneNumber = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

const PhoneLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.8;
`;

const VVIPSection = styled.section`
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  background: ${theme.colors.neutral.white};
  border-top: 1px solid ${theme.colors.neutral.gray200};
`;

const VVIPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const VVIPTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  background: linear-gradient(135deg, #FF6B35, #FFA500);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
`;

const ViewAllButton = styled(Link)`
  background: ${theme.colors.primary.orange};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primary.yellow};
    transform: translateY(-1px);
  }
`;

const VVIPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const VVIPCard = styled.div`
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange},
    ${theme.colors.primary.yellow}
  );
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  color: ${theme.colors.neutral.white};
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: ${theme.colors.neutral.white}10;
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.xl};

    &::before {
      right: -30%;
    }
  }
`;

const VVIPBadge = styled.div`
  background: ${theme.colors.neutral.white}30;
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};
  display: inline-block;
  position: relative;
  z-index: 2;
`;

const VVIPNumber = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  z-index: 2;
  letter-spacing: 1px;
`;

const VVIPPrice = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  z-index: 2;
`;

const VVIPActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
  position: relative;
  z-index: 2;
`;

const VVIPAction = styled.button<{ $variant: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'primary'
    ? theme.colors.neutral.white
    : 'transparent'};
  color: ${props => props.$variant === 'primary'
    ? theme.colors.primary.orange
    : theme.colors.neutral.white};
  border: ${props => props.$variant === 'primary'
    ? 'none'
    : `1px solid ${theme.colors.neutral.white}`};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$variant === 'primary'
      ? theme.colors.neutral.gray100
      : theme.colors.neutral.white};
    color: ${theme.colors.primary.orange};
    transform: translateY(-1px);
  }
`;

// Horizontal scrolling VVIP components
const VVIPScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: ${theme.spacing.sm};
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 769px) {
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.neutral.gray100};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary.orange};
      border-radius: 3px;
    }
  }
`;

const VVIPScrollWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  width: max-content;
  padding: ${theme.spacing.sm} 0;

  @media (min-width: 769px) {
    animation: scroll 20s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @media (max-width: 768px) {
    animation: none;
    padding: ${theme.spacing.sm} ${theme.spacing.xs};
  }
`;

const VVIPScrollCard = styled.div`
  width: 180px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  color: ${theme.colors.neutral.white};
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const VVIPCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const VVIPLabel = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: ${theme.colors.neutral.white};
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const VVIPDiscount = styled.span`
  background: ${theme.colors.primary.green};
  color: ${theme.colors.neutral.white};
  padding: 2px ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const VVIPNumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  text-align: center;
  margin: ${theme.spacing.md} 0;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VVIPPriceInfo = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const VVIPCurrentPrice = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
`;

const VVIPOriginalPrice = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  text-decoration: line-through;
  margin-top: 2px;
`;

const VVIPCardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`;

const VVIPBuyButton = styled.button`
  background: ${theme.colors.neutral.white};
  color: #2563eb;
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.neutral.gray100};
    transform: translateY(-1px);
  }
`;

const VVIPDetailsButton = styled.button`
  background: transparent;
  color: ${theme.colors.neutral.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const MainHeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(135deg, #FFD700, #FF6B35, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: shimmer 3s ease-in-out infinite;

  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MainHeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #FFFFFF;
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TrustBadges = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.95);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.6);
  }
`;

const TrustIcon = styled.div`
  font-size: 2.5rem;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrustInfo = styled.div`
  flex: 1;
`;

const TrustTitle = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.gray800};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.2;
`;

const TrustSubtitle = styled.div`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.xs};
  margin-top: 2px;
`;

const ServiceBadge = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.skyBlue});
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
  font-size: ${theme.typography.fontSize.lg};
  flex: 1;
`;

const ServiceCategoryContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const CategoryNavigation = styled.div`
  background: #2c3e50;
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.md};
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  flex: 1;

  div {
    margin-bottom: ${theme.spacing.xs};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// Animated Phone Number Components
const AnimatedPhoneContainer = styled.div`
  background: linear-gradient(135deg, #FF6B35, #FF8C42, #FFA500);
  border: 3px solid #FFD700;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing.xl} auto ${theme.spacing.xl} auto;
  text-align: center;
  box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4), 0 0 30px rgba(255, 215, 0, 0.3);
  max-width: 600px;
  width: 90%;
  position: relative;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FFD700, #FF6B35, #FFD700);
    border-radius: ${theme.borderRadius.xl};
    z-index: -1;
    animation: borderGlow 3s ease-in-out infinite;
  }

  @keyframes borderGlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    margin: ${theme.spacing.lg} ${theme.spacing.md};
    padding: ${theme.spacing.lg};
    width: calc(100% - 2rem);
  }
`;

const PhoneTitle = styled.div`
  color: #FFFFFF;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const AnimatedNumber = styled.div`
  font-size: 3rem;
  font-weight: ${theme.typography.fontWeight.bold};
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 3px;
  }
`;

const AnimatedDigit = styled.span<{ $isHighlighted: boolean; $delay: number }>`
  color: ${props => props.$isHighlighted ? '#FFD700' : '#FFFFFF'};
  background: ${props => props.$isHighlighted ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 6px 4px;
  border-radius: 6px;
  border: ${props => props.$isHighlighted ? '2px solid #FFD700' : '2px solid transparent'};
  transition: all 0.4s ease;
  display: inline-block;
  transform: ${props => props.$isHighlighted ? 'scale(1.3)' : 'scale(1)'};
  text-shadow: ${props => props.$isHighlighted ? '0 0 15px rgba(255, 215, 0, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.3)'};
  animation: ${props => props.$isHighlighted ? 'highlight 0.8s ease-in-out' : 'none'};

  @keyframes highlight {
    0% {
      transform: scale(1);
      background: rgba(255, 255, 255, 0.1);
      box-shadow: none;
      border-color: transparent;
    }
    50% {
      transform: scale(1.4);
      background: rgba(255, 215, 0, 0.5);
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.9);
      border-color: #FFD700;
    }
    100% {
      transform: scale(1.3);
      background: rgba(255, 215, 0, 0.3);
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
      border-color: #FFD700;
    }
  }
`;

const ContactSubtitle = styled.div`
  color: #FFFFFF;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.lg};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.lg};
  transition: all 0.3s ease;
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.6);
    border-color: rgba(255, 255, 255, 0.6);
  }

  span {
    font-size: 1.5rem;
  }
`;

const AnimatedPhoneSection = styled.section`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
  padding: ${theme.spacing.xl} 0;
  margin-bottom: ${theme.spacing.lg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    z-index: 1;
  }

  > div {
    position: relative;
    z-index: 2;
  }
`;











const TrustedBadge = styled.div`
  background: linear-gradient(135deg, #FFD700, #FF6B35);
  color: #FFFFFF;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  animation: pulse-glow 3s ease-in-out infinite;

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4); }
    50% { box-shadow: 0 4px 15px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.3); }
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Link)<{ $variant: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary'
    ? `
      background: linear-gradient(135deg,
        ${theme.colors.primary.green},
        ${theme.colors.primary.skyBlue}
      );
      color: ${theme.colors.neutral.white};
      box-shadow: ${theme.shadows.md};

      &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.xl};
      }
    `
    : `
      background: ${theme.colors.neutral.white};
      color: ${theme.colors.primary.skyBlue};
      border: 2px solid ${theme.colors.primary.skyBlue};
      box-shadow: ${theme.shadows.sm};

      &:hover {
        background: ${theme.colors.primary.skyBlue};
        color: ${theme.colors.neutral.white};
        transform: translateY(-3px);
      }
    `
  }

  @media (max-width: 768px) {
    width: 280px;
    justify-content: center;
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.neutral.gray200};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.skyBlue};
  }
`;

const FeatureIcon = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color}20;
  border-radius: ${theme.borderRadius.full};
  color: ${props => props.$color};
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.neutral.gray800};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
`;

const ShowcaseSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg,
    ${theme.colors.neutral.gray100},
    ${theme.colors.neutral.white}
  );
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const ShowcaseCard = styled(Link)`
  display: block;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.orange};
  }
`;

const ShowcaseIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.neutral.white};
  font-size: 1.5rem;
`;

const ShowcaseTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.sm};
`;

const ShowcaseDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const ShowcaseAction = styled.span`
  color: ${theme.colors.primary.orange};
  font-weight: ${theme.typography.fontWeight.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const PromoSection = styled.section`
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange},
    ${theme.colors.primary.yellow}
  );
  padding: ${theme.spacing.xl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 100px;
    height: 200%;
    background: ${theme.colors.neutral.white}15;
    transform: rotate(15deg);
  }
`;

const PromoContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.neutral.white};
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.md};
  }
`;

const PromoText = styled.div`
  flex: 1;
`;

const PromoTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

const PromoSubtext = styled.p`
  font-size: ${theme.typography.fontSize.md};
  opacity: 0.9;
`;

const PromoButton = styled.a`
  background: ${theme.colors.neutral.white};
  color: ${theme.colors.primary.orange};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const SearchSection = styled.section`
  background: linear-gradient(135deg,
    ${theme.colors.primary.skyBlue},
    ${theme.colors.primary.green}
  );
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  color: ${theme.colors.neutral.white};
  text-align: center;
`;

const SearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SearchTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const SearchForm = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.xl};
  margin-bottom: ${theme.spacing.lg};
`;

const SearchInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchInput = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.neutral.gray700};

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
  }

  &:focus {
    border-color: ${theme.colors.primary.orange};
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: ${theme.colors.primary.orange};
  color: ${theme.colors.neutral.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primary.yellow};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const FilterButton = styled.button`
  background: ${theme.colors.neutral.gray200};
  color: ${theme.colors.neutral.gray700};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary.skyBlue};
    color: ${theme.colors.neutral.white};
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const FilterTags = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterTag = styled.button<{ $isActive?: boolean }>`
  background: ${props => props.$isActive
    ? theme.colors.primary.orange
    : theme.colors.neutral.gray100};
  border: 1px solid ${props => props.$isActive
    ? theme.colors.primary.orange
    : theme.colors.neutral.gray300};
  color: ${props => props.$isActive
    ? theme.colors.neutral.white
    : theme.colors.neutral.gray600};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary.orange};
    color: ${theme.colors.neutral.white};
    border-color: ${theme.colors.primary.orange};
  }
`;

const CategoriesSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const CategoryCard = styled(Link)`
  background: linear-gradient(135deg, ${theme.colors.neutral.white}, ${theme.colors.neutral.gray100});
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-decoration: none;
  box-shadow: ${theme.shadows.md};
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || theme.colors.primary.orange};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${props => props.color || theme.colors.primary.orange};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const CategoryIcon = styled.div<{ $color: string }>`
  width: 50px;
  height: 50px;
  background: ${props => props.$color}20;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.lg};
`;

const CategoryPrice = styled.span`
  background: ${theme.colors.primary.orange};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray500};
`;

const FeaturedNumbersSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg,
    ${theme.colors.neutral.gray100},
    ${theme.colors.neutral.white}
  );
`;

const NumbersGrid = styled.div`
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.md};
    padding: 0 ${theme.spacing.md};
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) and (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 768px) {
    display: flex;
    gap: ${theme.spacing.md};
    overflow-x: auto;
    overflow-y: hidden;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NumbersSection = styled.section`
  padding: ${theme.spacing.lg};
  width: 100%;
  box-sizing: border-box;
`;

const NumberCard = styled.div`
  background: linear-gradient(135deg, #20b2aa, #48cae4);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.neutral.white};
  text-align: center;
  box-shadow: 0 8px 32px rgba(32, 178, 170, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    min-width: 250px;
    width: 250px;
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(32, 178, 170, 0.4);
  }
`;

const NumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NumberInfo = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: ${theme.spacing.lg};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberCategory = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NumberPrice = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.sm};
`;

const SumTotal = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeight.medium};

  strong {
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

const NumberActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  position: relative;
  z-index: 2;
  justify-content: center;
`;

const NumberAction = styled.button<{ $variant: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'primary'
    ? '#ff6b35'
    : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.$variant === 'primary'
    ? theme.colors.neutral.white
    : '#20b2aa'};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${props => props.$variant === 'primary'
      ? '#e55a2b'
      : theme.colors.neutral.white};
  }

  &:active {
    transform: translateY(0);
  }
`;

// Function to calculate sum total of digits in a phone number
const calculateSumTotal = (phoneNumber: string): React.ReactNode => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');

  // Calculate sum of all digits (first sum)
  const firstSum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Calculate sum of the first sum (second sum)
  const secondSum = firstSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Calculate sum of the second sum (third sum)
  const thirdSum = secondSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Return format: "firstSum-secondSum-thirdSum" with bold formatting
  return <><strong>{firstSum}-{secondSum}-{thirdSum}</strong></>;
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const heroImages = [
    '/hero2.jpeg',
    '/hero3.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Animation for phone number highlighting
  useEffect(() => {
    const phoneNumber = "+91-97222-97222";
    const digits = phoneNumber.split('');

    const animateDigits = () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < digits.length) {
          setHighlightedIndex(index);
          index++;
        } else {
          setHighlightedIndex(-1);
          // Wait 2 seconds before restarting
          setTimeout(() => {
            index = 0;
          }, 2000);
        }
      }, 500); // Highlight each digit for 500ms

      return interval;
    };

    // Start animation after 1 second
    const initialDelay = setTimeout(() => {
      const interval = animateDigits();

      // Repeat animation every 8 seconds
      const repeatInterval = setInterval(() => {
        clearInterval(interval);
        animateDigits();
      }, 8000);

      return () => {
        clearInterval(interval);
        clearInterval(repeatInterval);
      };
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  // Component for rendering animated phone number
  const AnimatedPhoneNumber: React.FC = () => {
    const phoneNumber = "+91-97222-97722";
    const digits = phoneNumber.split('');

    return (
      <AnimatedPhoneContainer>
        <PhoneTitle>Premium VIP Mobile Numbers</PhoneTitle>
        <AnimatedNumber>
          {digits.map((digit, index) => (
            <AnimatedDigit
              key={index}
              $isHighlighted={highlightedIndex === index}
              $delay={index}
            >
              {digit}
            </AnimatedDigit>
          ))}
        </AnimatedNumber>
        <ContactSubtitle>Contact us for premium numbers</ContactSubtitle>
        <WhatsAppButton
          href="https://wa.me/919772297722?text=Hi! I'm interested in premium mobile numbers"
          target="_blank"
        >
          <span>📱</span>
          WhatsApp Now
        </WhatsAppButton>
      </AnimatedPhoneContainer>
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const sidebarCategories = [
    {
      name: "All Numbers",
      count: "5000+",
      priceRange: "₹500 - ₹50,000",
      href: "#all",
      isActive: true
    },
    {
      name: "VIP Numbers",
      count: "500+",
      priceRange: "₹5,000 - ₹25,000",
      href: "#vip"
    },
    {
      name: "Premium Numbers",
      count: "1000+",
      priceRange: "₹2,000 - ₹10,000",
      href: "#premium"
    },
    {
      name: "Lucky Numbers",
      count: "750+",
      priceRange: "₹1,000 - ₹5,000",
      href: "#lucky"
    },
    {
      name: "Sequential Numbers",
      count: "300+",
      priceRange: "₹3,000 - ₹15,000",
      href: "#sequential"
    },
    {
      name: "Repeating Numbers",
      count: "400+",
      priceRange: "₹2,500 - ₹20,000",
      href: "#repeating"
    },
    {
      name: "Mirror Numbers",
      count: "200+",
      priceRange: "₹4,000 - ₹18,000",
      href: "#mirror"
    },
    {
      name: "Easy to Remember",
      count: "800+",
      priceRange: "₹1,500 - ₹8,000",
      href: "#easy"
    }
  ];

  const features = [
    {
      icon: <FaStar />,
      title: "Premium Quality",
      description: "Handpicked premium numbers with unique patterns and combinations that stand out.",
      color: theme.colors.primary.green
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Authentic",
      description: "All numbers are verified and authentic, ensuring you get exactly what you pay for.",
      color: theme.colors.primary.skyBlue
    },
    {
      icon: <FaRocket />,
      title: "Instant Activation",
      description: "Quick and hassle-free activation process. Get your premium number activated within hours.",
      color: theme.colors.primary.orange
    }
  ];


  const categories = [
    {
      icon: <FaCrown />,
      title: "VIP Numbers",
      description: "Exclusive VIP numbers with repeating patterns and memorable combinations",
      priceRange: "₹5,000 - ₹25,000",
      count: "500+ Numbers",
      link: "/vvip-collection",
      color: theme.colors.primary.orange
    },
    {
      icon: <FaStar />,
      title: "Premium Numbers",
      description: "High-quality premium numbers with special sequences and lucky combinations",
      priceRange: "₹2,000 - ₹10,000",
      count: "1000+ Numbers",
      link: "/gallery",
      color: theme.colors.primary.skyBlue
    },
    {
      icon: <FaMagic />,
      title: "Lucky Numbers",
      description: "Numbers based on numerology and astrology for good fortune and prosperity",
      priceRange: "₹1,000 - ₹5,000",
      count: "750+ Numbers",
      link: "/numerology",
      color: theme.colors.primary.green
    },
    {
      icon: <FaRocket />,
      title: "Instant Numbers",
      description: "Ready-to-activate numbers available for immediate purchase and delivery",
      priceRange: "₹500 - ₹3,000",
      count: "2000+ Numbers",
      link: "/gallery",
      color: theme.colors.primary.yellow
    }
  ];

  const vvipNumbers = [
    {
      number: "99999-99999",
      category: "ULTRA VIP",
      price: "₹1,50,000"
    },
    {
      number: "88888-88888",
      category: "SUPER VIP",
      price: "₹1,25,000"
    },
    {
      number: "77777-77777",
      category: "PLATINUM VIP",
      price: "₹1,00,000"
    },
    {
      number: "66666-66666",
      category: "DIAMOND VIP",
      price: "₹85,000"
    }
  ];

  const featuredNumbers = [
    {
      number: "99999-88888",
      category: "SUPER VIP",
      price: "₹45,000"
    },
    {
      number: "77777-77777",
      category: "PLATINUM VIP",
      price: "₹35,000"
    },
    {
      number: "88888-99999",
      category: "GOLD VIP",
      price: "₹25,000"
    },
    {
      number: "66666-77777",
      category: "SILVER VIP",
      price: "₹18,000"
    },
    {
      number: "55555-66666",
      category: "PREMIUM",
      price: "₹12,000"
    },
    {
      number: "44444-55555",
      category: "PREMIUM",
      price: "₹8,000"
    },
    {
      number: "33333-44444",
      category: "PREMIUM",
      price: "₹6,000"
    },
    {
      number: "22222-33333",
      category: "STANDARD",
      price: "₹4,000"
    },
    {
      number: "12345-67890",
      category: "SEQUENTIAL",
      price: "₹10,000"
    },
    {
      number: "98765-43210",
      category: "REVERSE",
      price: "₹8,500"
    },
    {
      number: "11111-22222",
      category: "DOUBLE",
      price: "₹12,000"
    },
    {
      number: "12321-54345",
      category: "MIRROR",
      price: "₹9,000"
    }
  ];

  const filterTags = ["VIP", "Premium", "Lucky", "Sequential", "Repeating", "Mirror"];

  const showcaseItems = [
    {
      icon: <FaPhoneAlt />,
      title: "Premium Gallery",
      description: "Browse through our extensive collection of premium numbers with special patterns and combinations.",
      link: "/gallery",
      color: theme.colors.primary.green
    },
    {
      icon: <FaCrown />,
      title: "VVIP Collection",
      description: "Exclusive VVIP numbers for those who want the absolute best and most unique combinations.",
      link: "/vvip-collection",
      color: theme.colors.primary.orange
    },
    {
      icon: <FaMagic />,
      title: "Numerology Check",
      description: "Find numbers that align with your personality and bring you luck based on numerology.",
      link: "/numerology",
      color: theme.colors.primary.skyBlue
    }
  ];

  return (
    <HomeContainer>
      {/* Hero Section with Carousel */}
      <HeroSection>
        <CarouselContainer>
          {heroImages.map((image, index) => (
            <CarouselSlide
              key={index}
              $isActive={index === currentSlide}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}

          <CarouselArrow $direction="left" onClick={prevSlide}>
            ‹
          </CarouselArrow>

          <CarouselArrow $direction="right" onClick={nextSlide}>
            ›
          </CarouselArrow>

          <CarouselNavigation>
            {heroImages.map((_, index) => (
              <CarouselDot
                key={index}
                $isActive={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </CarouselNavigation>
        </CarouselContainer>
      </HeroSection>

      {/* Numbers Section with Sidebar */}
      <NumbersWithSidebar>
        <Sidebar>
          <SidebarTitle>Number Categories</SidebarTitle>
          <CategoryList>
            {sidebarCategories.map((category, index) => (
              <CategoryItem key={index}>
                <CategoryLink
                  as="label"
                  $isActive={category.isActive}
                >
                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryCount>{category.count}</CategoryCount>
                  </CategoryInfo>
                  <CategoryCheckbox
                    type="checkbox"
                    checked={category.isActive}
                    onChange={() => console.log('Category toggled:', category.name)}
                  />
                </CategoryLink>
              </CategoryItem>
            ))}
          </CategoryList>
        </Sidebar>

        <MainContent>
        {/* Animated Phone Number Section */}
        <AnimatedPhoneSection>
          <AnimatedPhoneNumber />
        </AnimatedPhoneSection>

        {/* Search Section */}
        <SearchSection>
          <SearchContainer>
            <SearchTitle>Find Your Perfect Premium Number</SearchTitle>
            <SearchForm>
              <SearchInputGroup>
                <SearchInput
                  type="text"
                  placeholder="Search by pattern, digits, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterButton onClick={() => console.log('Open filters')}>
                  <FaFilter />
                  Filters
                </FilterButton>
                <SearchButton onClick={() => window.location.href = `/gallery?search=${searchTerm}`}>
                  <FaSearch />
                  Search
                </SearchButton>
              </SearchInputGroup>
              <FilterTags>
                {filterTags.map((tag, index) => (
                  <FilterTag
                    key={index}
                    $isActive={activeFilter === tag.toLowerCase()}
                    onClick={() => {
                      setActiveFilter(tag.toLowerCase());
                      window.location.href = `/gallery?filter=${tag.toLowerCase()}`;
                    }}
                  >
                    {tag}
                  </FilterTag>
                ))}
              </FilterTags>
            </SearchForm>
          </SearchContainer>
        </SearchSection>

        {/* Featured Numbers Grid */}
        <NumbersSection>
          <NumbersGrid>
            {featuredNumbers.map((number, index) => (
              <NumberCard key={index}>
                <NumberDisplay>+91 {number.number}</NumberDisplay>
                <NumberInfo>
                  <NumberCategory>{number.category}</NumberCategory>
                  <NumberPrice>{number.price}</NumberPrice>
                  <SumTotal>Sum Total = {calculateSumTotal(number.number)}</SumTotal>
                </NumberInfo>
                <NumberActions>
                  <NumberAction
                    $variant="primary"
                    onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy +91 ${number.number}`, '_blank')}
                  >
                    Buy Nowc
                  </NumberAction>
                  <NumberAction
                    $variant="secondary"
                    onClick={() => alert(`Details for +91 ${number.number}\nCategory: ${number.category}\nPrice: ${number.price}\n\nCall +91 97722-97722 for more details.`)}
                  >
                    Details
                  </NumberAction>
                </NumberActions>
              </NumberCard>
            ))}
          </NumbersGrid>
        </NumbersSection>

        {/* VVIP Numbers Section - Horizontal Scroller */}
        <VVIPSection>
          <VVIPHeader>
            <VVIPTitle>VIP NUMBERS</VVIPTitle>
            <ViewAllButton to="/vvip-collection">
              <FaCrown />
              View All VIP
            </ViewAllButton>
          </VVIPHeader>
          <VVIPScrollContainer>
            <VVIPScrollWrapper>
              {[...vvipNumbers, ...vvipNumbers].map((number, index) => (
                <VVIPScrollCard key={index}>
                  <VVIPCardHeader>
                    <VVIPLabel>VIP SPECIAL</VVIPLabel>
                  </VVIPCardHeader>
                  <VVIPNumberDisplay>{number.number}</VVIPNumberDisplay>
                  <VVIPPriceInfo>
                    <VVIPCurrentPrice>{number.price}</VVIPCurrentPrice>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>Sum Total = {calculateSumTotal(number.number)}</div>
                  </VVIPPriceInfo>
                  <VVIPCardActions>
                    <VVIPBuyButton
                      onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy VIP number ${number.number} for ${number.price}`, '_blank')}
                    >
                      BUY
                    </VVIPBuyButton>
                    <VVIPDetailsButton>
                      DETAILS
                    </VVIPDetailsButton>
                  </VVIPCardActions>
                </VVIPScrollCard>
              ))}
            </VVIPScrollWrapper>
          </VVIPScrollContainer>
        </VVIPSection>

        {/* Features Section */}
        <FeaturesSection>
          <div style={{ padding: '0 ' + theme.spacing.lg }}>
            <SectionTitle>Why Choose Premium Numbers?</SectionTitle>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon $color={feature.color}>
                    {feature.icon}
                  </FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </div>
        </FeaturesSection>
        </MainContent>
      </NumbersWithSidebar>
    </HomeContainer>
  );
};

export default Home;