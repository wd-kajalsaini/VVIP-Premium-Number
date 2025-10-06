import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaWhatsapp, FaPhone, FaChevronDown, FaChevronUp, FaArrowRight, FaCog, FaStar } from '../utils/iconComponents';
import { carouselService, CarouselSlide as CarouselSlideType } from '../services/carouselService';
import { categoryService, Category } from '../services/categoryService';
import { phoneNumberService, PhoneNumber } from '../services/phoneNumberService';

const HomeContainer = styled.div`
  margin-top: 89px;
  min-height: calc(100vh - 70px);
  background: #f5f6fa;
`;

const MainContent = styled.div`
  width: 100%;
`;

const TopBanner = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const BannerTitle = styled.h2`
  text-align: center;
  color: #2c5282;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 700;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-width: 800px;
  margin: 0 auto 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeaturedCard = styled.div`
  background: #2c5282;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  color: white;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(44, 82, 130, 0.3);
  }
`;

const FeaturedNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;

  span.highlight {
    color: #ff6b35;
  }
`;

const FeaturedSum = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  text-align: center;
  font-weight: 500;

  strong {
    font-weight: 700;
  }
`;

const FeaturedPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 10px;
`;

const FeaturedActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const FeaturedButton = styled.button<{ $primary?: boolean }>`
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$primary ? `
    background: white;
    color: #2c5282;

    &:hover {
      background: #f0f0f0;
    }
  ` : `
    background: transparent;
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

// Carousel Section
const CarouselSection = styled.section`
  position: relative;
  width: 800px;
  height: 449px;
  max-width: calc(100% - 40px);
  overflow: hidden;
  background: #1e3a5f;
  margin: 0 auto;
  border-radius: 8px;
  user-select: none; /* Prevent text selection during swipe */
  -webkit-touch-callout: none; /* Disable callout on iOS */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
  touch-action: pan-y; /* Allow vertical scrolling but handle horizontal ourselves */

  @media (max-width: 840px) {
    width: 100%;
    max-width: 100%;
    height: calc(100vw * 449 / 800);
    margin: 0;
    border-radius: 0;
    cursor: grab; /* Show grab cursor on touch devices */

    &:active {
      cursor: grabbing;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: calc(100vw * 449 / 800);
    margin: 0;
    border-radius: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    height: calc(100vw * 449 / 800);
    margin: 0;
    border-radius: 0;
  }
`;

const CarouselSlide = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
`;

const CarouselContent = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const CarouselTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarouselSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CarouselButton = styled(Link)`
  display: inline-block;
  padding: 12px 30px;
  background: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #e55a2b;
    transform: translateY(-2px);
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
  }
`;

const CarouselArrows = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

// VIP Search Section Components
const VipTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  
  span {
    color: #ff6b35;
    font-size: 1.2rem;
  }
`;

const VipDescription = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  width: 100%;
`;

const SearchTabButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#ff6b35' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: 1px solid ${props => props.$active ? '#ff6b35' : '#ddd'};
  border-bottom: none;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  &:first-child {
    border-top-left-radius: 8px;
    border-right: ${props => props.$active ? '1px solid #ff6b35' : '1px solid #ddd'};
  }
  
  &:last-child {
    border-top-right-radius: 8px;
    border-left: none;
  }
  
  &:hover {
    background: ${props => props.$active ? '#e55a2b' : '#e9e9e9'};
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  position: relative;
  z-index: 1;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const SearchInputField = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const SearchIconButton = styled.button`
  background: #ff6b35;
  color: white;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e55a2b;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

// Search Bar Section
const SearchSection = styled.section`
  background: white;
  padding: 40px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #ff6b35;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SortSelect = styled.select`
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:hover {
    border-color: #6366f1;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 18px;
  }
`;

const BreadcrumbText = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 16px 24px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  font-weight: 500;
  min-height: 56px;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &:hover {
    border-color: #ff6b35;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 20px;
    min-height: 50px;
  }
`;

const SearchButton = styled.button`
  padding: 16px 40px;
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e55a2b;
    transform: translateY(-2px);
  }
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

// Numbers Section with Sidebar Layout
const NumbersSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1e3a5f;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
`;

const FeaturedLayout = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 0 10px;
  }
`;

const Sidebar = styled.div<{ $expandHeight?: boolean }>`
  width: 320px;
  background: #2c5aa0;
  border: 1px solid #1e3a5f;
  border-radius: 16px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  ${props => props.$expandHeight ? `
    min-height: 100%;
  ` : `
    height: fit-content;
  `}

  @media (max-width: 968px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;


const CategorySection = styled.div`
  padding: 24px;
  flex: 1;
`;

const SidebarTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
  position: relative;
  padding: 24px 24px 0;

  &::after {
    content: '';
    position: absolute;
    left: 24px;
    bottom: -12px;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #e55a2b);
    border-radius: 2px;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryItem = styled.li`
  margin: 0;
`;

const CategoryLink = styled.label<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  color: ${props => props.$isActive ? '#ff6b35' : '#ffffff'};
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${props => props.$isActive
    ? 'rgba(255, 107, 53, 0.1)'
    : 'transparent'};
  border: none;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: ${props => props.$isActive ? '#ff6b35' : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${props => props.$isActive
      ? 'rgba(255, 107, 53, 0.15)'
      : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.$isActive ? '#ff6b35' : '#ffffff'};
    transform: translateX(2px);

    &::before {
      background: ${props => props.$isActive ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)'};
    }
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const CategoryName = styled.span`
  font-weight: 600;
`;

const CategoryCount = styled.span`
  font-size: 12px;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
`;

const CategoryCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 12px;
  accent-color: #ff6b35;
  cursor: pointer;
`;

const FeaturedContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MoreButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 30px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);

  &:hover {
    background: linear-gradient(135deg, #374151, #4b5563);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);
  }
`;

// VIP Auto-Scroll Container
const VipScrollContainer = styled.div`
  overflow: hidden;
  padding: 20px 0;
  position: relative;
`;

const VipScrollWrapper = styled.div`
  display: flex;
  gap: 25px;
  width: max-content;
  animation: autoScroll 80s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes autoScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  /* Ensure this doesn't interfere with page scroll */
  pointer-events: auto;
  touch-action: pan-y;
`;

const VipCard = styled.div`
  background: linear-gradient(135deg, #2c5282, #1e3a5f);
  border: 2px solid #1e3a5f;
  border-radius: 12px;
  padding: 25px;
  min-width: 340px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 58, 95, 0.3);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
    z-index: 1;
  }

  &::after {
    content: 'VIP';
    position: absolute;
    top: 8px;
    right: 8px;
    background: linear-gradient(135deg, #FFD700, #FFC700);
    color: #1e3a5f;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    z-index: 3;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(30, 58, 95, 0.4);
    border-color: #2563eb;

    &::before {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 199, 0, 0.1));
    }
  }
`;

const NumberCard = styled.div`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 64, 175, 0.2);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4);

    &::before {
      right: -30%;
    }
  }
`;

const NumberDisplay = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1.5px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  span.highlight {
    color: #e67e50;
    text-shadow: 0 0 10px rgba(230, 126, 80, 0.5);
  }

  @media (max-width: 1200px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const NumberPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 1200px) {
    font-size: 1rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const CardButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 24px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid #e67e50;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  @media (max-width: 1200px) {
    padding: 8px 20px;
    font-size: 0.9rem;
    min-width: 100px;
  }

  ${props => props.$primary ? `
    background: #e67e50;
    color: white;
    box-shadow: 0 2px 8px rgba(230, 126, 80, 0.2);

    &:hover {
      background: #d16840;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(230, 126, 80, 0.3);
    }
  ` : `
    background: transparent;
    color: #e67e50;

    &:hover {
      background: rgba(230, 126, 80, 0.1);
    }
  `}
`;

const VipCardButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 24px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid #f4c430;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  @media (max-width: 1200px) {
    padding: 8px 20px;
    font-size: 0.9rem;
    min-width: 100px;
  }

  ${props => props.$primary ? `
    background: #f4c430;
    color: #1e3a5f;
    box-shadow: 0 2px 8px rgba(244, 196, 48, 0.3);
    font-weight: 800;

    &:hover {
      background: #e6b61f;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(244, 196, 48, 0.4);
    }
  ` : `
    background: transparent;
    color: #f4c430;

    &:hover {
      background: rgba(244, 196, 48, 0.1);
    }
  `}
`;

// Attractive Numbers Styled Components
const AttractiveScrollContainer = styled.div`
  overflow: hidden;
  padding: 20px 0;
  position: relative;
`;

const AttractiveScrollWrapper = styled.div`
  display: flex;
  gap: 25px;
  width: max-content;
  animation: autoScrollReverse 85s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes autoScrollReverse {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const AttractiveCard = styled.div`
  background: linear-gradient(135deg, #059669, #0ea5e9, #10b981);
  border: 3px solid #eab308;
  border-radius: 20px;
  padding: 25px;
  min-width: 340px;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 32px rgba(234, 179, 8, 0.4),
    0 0 40px rgba(14, 165, 233, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(234, 179, 8, 0.15) 0%,
      rgba(14, 165, 233, 0.1) 50%,
      rgba(16, 185, 129, 0.05) 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(234, 179, 8, 0.3) 30deg,
      transparent 60deg,
      rgba(14, 165, 233, 0.25) 120deg,
      transparent 150deg,
      rgba(16, 185, 129, 0.2) 240deg,
      transparent 270deg
    );
    animation: attractiveShimmer 6s linear infinite;
    z-index: 1;
  }

  @keyframes attractiveShimmer {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow:
      0 15px 45px rgba(234, 179, 8, 0.6),
      0 0 60px rgba(14, 165, 233, 0.5),
      0 0 80px rgba(16, 185, 129, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: #facc15;

    &::before {
      background: linear-gradient(135deg,
        rgba(234, 179, 8, 0.25) 0%,
        rgba(14, 165, 233, 0.2) 50%,
        rgba(16, 185, 129, 0.15) 100%);
    }
  }

  @media (max-width: 1200px) {
    min-width: 280px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    min-width: 260px;
    padding: 18px;
  }
`;

const AttractiveNumberDisplay = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1.8px;
  position: relative;
  z-index: 2;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(245, 158, 11, 0.3);

  span.highlight {
    color: #fbbf24;
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 3px 15px rgba(0, 0, 0, 0.4);
    font-weight: 800;
    filter: brightness(1.2);
  }
`;

const AttractiveSum = styled.div`
  font-size: 1rem;
  color: #e5e7eb;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 500;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  strong {
    font-weight: 700;
    color: #fbbf24;
    text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const AttractivePrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fbbf24;
  text-align: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-shadow: 0 3px 12px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.4);
  filter: brightness(1.1);
`;

const AttractiveButton = styled.button`
  padding: 12px 28px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid #fbbf24;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 130px;
  background: linear-gradient(135deg, #eab308, #fbbf24);
  color: #059669;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #ffffff, #f0fdf4);
    color: #059669;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(251, 191, 36, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: #facc15;
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 4px 15px rgba(251, 191, 36, 0.5);
  }
`;

// Quick Contact Section
const QuickContact = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
`;

const ContactButton = styled.a<{ $whatsapp?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  ${props => props.$whatsapp ? `
    background: #25d366;

    &:hover {
      background: #20bd5a;
      transform: scale(1.1);
    }
  ` : `
    background: #ff6b35;

    &:hover {
      background: #e55a2b;
      transform: scale(1.1);
    }
  `}
`;

// FAQ Section Styles
const FAQSection = styled.section`
  padding: 60px 20px;
  background: #f8fafc;
`;

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FAQTitle = styled.h2`
  font-size: 2.5rem;
  color: #374151;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
`;

const FAQSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.1);
    border-color: #6366f1;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: #6366f1;
    background: #f8fafc;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: #64748b;
  line-height: 1.6;
  padding: ${props => props.$isOpen ? '0 24px 20px 24px' : '0 24px'};
  border-top: ${props => props.$isOpen ? '1px solid #e2e8f0' : 'none'};
`;

const FAQIcon = styled.div<{ $isOpen: boolean }>`
  color: #6366f1;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

// Additional Content Section Styles
const AdditionalContentSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
    background: linear-gradient(90deg, #374151, #6366f1, #6b7280, #6366f1);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(30, 64, 175, 0.15);
    border-color: #6366f1;
  }
`;

const ContentIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #6b7280);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  ${ContentCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
  }
`;

const ContentTitle = styled.h3`
  font-size: 1.8rem;
  color: #374151;
  margin-bottom: 20px;
  font-weight: 700;
`;

const ContentDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const ContentButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);

  &:hover {
    background: linear-gradient(135deg, #374151, #4b5563);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);

    svg {
      transform: translateX(3px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const AdditionalSectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #374151;
  margin-bottom: 15px;
  font-weight: 700;
`;

const AdditionalSectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

// Removed AnimatedPhoneSection

// Removed AnimatedPhoneContainer

// Removed PhoneTitle

// Removed PhoneNumberRow

// Removed WhatsAppIcon

// Removed AnimatedNumber

// Removed AnimatedDigit

// Visitor Counter Section
const VisitorCounterSection = styled.section`
  background: #ffffff;
  margin-top: 40px;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

const VisitorCounterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const VisitorCounterTitle = styled.h3`
  color: #1f2937;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CounterDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

const CounterDigit = styled.div`
  background: #1f2937;
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #374151;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 60px;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 10px 12px;
    min-width: 50px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 8px 10px;
    min-width: 40px;
  }
`;

const VisitorCounterSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
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

// Function to get sum total as string for filtering
const getSumTotalString = (phoneNumber: string): string => {
  const digits = phoneNumber.replace(/\D/g, '');
  const firstSum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  const secondSum = firstSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  const thirdSum = secondSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return `${firstSum}-${secondSum}-${thirdSum}`;
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numbersToShow] = useState(10); // Show fixed 10 numbers
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visitorCount] = useState('033015'); // Static visitor count
  const [sortBy, setSortBy] = useState('Sort By');
  const [priceFilter, setPriceFilter] = useState('Price Low to High');
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlideType[]>([]);
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('global');
  const [sumTotalSearch, setSumTotalSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [dbFeaturedNumbers, setDbFeaturedNumbers] = useState<PhoneNumber[]>([]);
  const [dbTodayOffers, setDbTodayOffers] = useState<PhoneNumber[]>([]);
  const [dbAttractiveNumbers, setDbAttractiveNumbers] = useState<PhoneNumber[]>([]);
  // Touch/Swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  // Removed highlightedIndex state

  // Format number with highlights
  const formatNumberDisplay = (number: string, highlights: number[]): React.ReactElement => {
    const digits = number.split('');
    return (
      <>
        {digits.map((digit, index) => (
          <span key={index} className={highlights.includes(index) ? 'highlight' : ''}>
            {digit}
          </span>
        ))}
      </>
    );
  };

  // Handle category toggle
  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(cat => cat !== category && cat !== 'All')
        : [...selectedCategories.filter(cat => cat !== 'All'), category];

      setSelectedCategories(newCategories.length > 0 ? newCategories : ['All']);
    }
  };


  const vipNumbers = [
    {
      number: "90 555555 60",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,13,400"
    },
    {
      number: "8452 000000",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹4,80,000"
    },
    {
      number: "9 510 999999",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹12,00,000"
    },
    {
      number: "9561 444444",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹3,00,000"
    },
    {
      number: "917 0000001",
      highlights: [4, 5, 6, 7, 8],
      price: "₹15,60,000"
    },
    {
      number: "94 000000 36",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,88,000"
    }
  ];

  const attractiveNumbers = [
    {
      number: "98 98 00 00 00",
      highlights: [6, 7, 8, 9, 10],
      price: "₹28,000"
    },
    {
      number: "99 55 88 55 88",
      highlights: [3, 4, 6, 7, 9, 10],
      price: "₹35,000"
    },
    {
      number: "88 00 88 00 88",
      highlights: [0, 1, 4, 5, 8, 9],
      price: "₹42,000"
    },
    {
      number: "77 77 00 00 77",
      highlights: [0, 1, 2, 3, 8, 9],
      price: "₹32,000"
    },
    {
      number: "90 90 12 12 12",
      highlights: [6, 7, 8, 9, 10],
      price: "₹25,000"
    },
    {
      number: "88 88 55 55 00",
      highlights: [0, 1, 2, 3, 4, 5, 6, 7],
      price: "₹38,000"
    },
    {
      number: "99 00 99 00 99",
      highlights: [0, 1, 4, 5, 8, 9],
      price: "₹45,000"
    },
    {
      number: "777 888 9999",
      highlights: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      price: "₹55,000"
    }
  ];

  const topBannerNumbers = [
    {
      number: "98 777777 29",
      highlights: [3, 4, 5, 6, 7, 8],
      sumTotal: "Sum Total = 78 - 7 - 7",
      price: "₹1,84,000"
    },
    {
      number: "90 555555 76",
      highlights: [3, 4, 5, 6, 7, 8],
      sumTotal: "Sum Total = 62 - 7 - 7",
      price: "₹1,34,000"
    },
    {
      number: "9 6 0 999999",
      highlights: [6, 7, 8, 9, 10, 11],
      sumTotal: "Sum Total = 78 - 15 - 6",
      price: "₹15,64,000"
    },
    {
      number: "928 555555 1",
      highlights: [4, 5, 6, 7, 8, 9],
      sumTotal: "Sum Total = 60 - 6 - 6",
      price: "₹89,000"
    }
  ];

  const featuredNumbers = [
    {
      number: "7 666666 028",
      highlights: [2, 3, 4, 5, 6, 7],
      price: "₹45,000"
    },
    {
      number: "9898 222222",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹15,60,000"
    },
    {
      number: "90 777777 59",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹84,000"
    },
    {
      number: "7 999999 64 9",
      highlights: [2, 3, 4, 5, 6, 7],
      price: "₹56,250"
    },
    {
      number: "90 555555 69",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,02,000"
    },
    {
      number: "90 555555 08",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹90,000"
    },
    {
      number: "8509 777777",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹3,30,000"
    },
    {
      number: "9367 222222",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹2,76,000"
    },
    {
      number: "72 111111 36",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹60,600"
    },
    {
      number: "7069 555555",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹3,36,000"
    },
    {
      number: "90 777777 88",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,86,000"
    },
    {
      number: "999 666666 9",
      highlights: [4, 5, 6, 7, 8, 9],
      price: "₹7,20,000"
    },
    {
      number: "8888 999999",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹12,50,000"
    },
    {
      number: "91 888888 77",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,40,000"
    },
    {
      number: "7777 333333",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹4,80,000"
    },
    {
      number: "9123 444444",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹3,60,000"
    },
    {
      number: "80 000000 99",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹8,40,000"
    },
    {
      number: "6789 111111",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹1,80,000"
    },
    {
      number: "95 222222 00",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,20,000"
    },
    {
      number: "8765 777777",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹4,20,000"
    },
    {
      number: "91 333333 45",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,65,000"
    },
    {
      number: "9999 888888",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹18,00,000"
    },
    {
      number: "87 444444 12",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,10,000"
    },
    {
      number: "7654 555555",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹3,75,000"
    },
    {
      number: "92 666666 88",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,85,000"
    },
    {
      number: "8901 777777",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹5,40,000"
    },
    {
      number: "93 888888 21",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹3,90,000"
    },
    {
      number: "7890 999999",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹9,60,000"
    },
    {
      number: "94 000000 12",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹4,80,000"
    },
    {
      number: "8123 111111",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹1,44,000"
    },
    {
      number: "95 222222 67",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,32,000"
    },
    {
      number: "7456 333333",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹2,28,000"
    },
    {
      number: "96 444444 89",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,64,000"
    },
    {
      number: "8567 555555",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹4,56,000"
    },
    {
      number: "97 666666 01",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹3,12,000"
    },
    {
      number: "7678 777777",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹6,24,000"
    },
    {
      number: "98 888888 34",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹4,68,000"
    },
    {
      number: "8789 999999",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹11,40,000"
    },
    {
      number: "99 000000 56",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹7,20,000"
    },
    {
      number: "7890 111111",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹1,68,000"
    },
    {
      number: "80 222222 78",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,56,000"
    },
    {
      number: "8901 333333",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹2,52,000"
    },
    {
      number: "81 444444 90",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹2,88,000"
    },
    {
      number: "9012 555555",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹4,80,000"
    },
    {
      number: "82 666666 13",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹3,36,000"
    },
    {
      number: "8123 777777",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹6,48,000"
    },
    {
      number: "83 888888 45",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹4,92,000"
    },
    {
      number: "9234 999999",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹12,60,000"
    },
    {
      number: "84 000000 67",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹7,44,000"
    },
    {
      number: "8345 111111",
      highlights: [5, 6, 7, 8, 9, 10],
      price: "₹1,92,000"
    },
    {
      number: "85 222222 89",
      highlights: [3, 4, 5, 6, 7, 8],
      price: "₹1,80,000"
    }
  ];

  // Filter featured numbers based on search and categories
  const filteredFeaturedNumbers = featuredNumbers.filter(number => {
    // Filter by sum total search
    if (sumTotalSearch) {
      const sumTotal = getSumTotalString(number.number);
      if (!sumTotal.includes(sumTotalSearch)) {
        return false;
      }
    }

    // Filter by categories (for now just show all since we don't have category data)
    return true;
  });

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getActiveCategories();
      console.log('Fetched categories:', fetchedCategories);
      setDbCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Fetch featured numbers, attractive numbers, and today's offers
  useEffect(() => {
    const fetchAllNumbers = async () => {
      try {
        // Fetch ALL featured numbers for filtering (no limit)
        const featuredNumbers = await phoneNumberService.getFeaturedNumbers();

        // Fetch attractive numbers and today's offers for home sections
        const attractiveNumbers = await phoneNumberService.getAttractiveNumbers();
        const todayOffers = await phoneNumberService.getTodayOffers();

        console.log('===== HOME PAGE DATA FETCH =====');
        console.log('Fetched featured numbers count:', featuredNumbers.length);
        if (featuredNumbers.length > 0) {
          console.log('First 3 featured numbers with categories:', featuredNumbers.slice(0, 3).map(n => ({
            id: n.id,
            number: n.number,
            category_id: n.category_id,
            is_featured: n.is_featured
          })));
        }
        console.log('Fetched attractive numbers count:', attractiveNumbers.length);
        console.log('Fetched today offers count:', todayOffers.length);

        setDbFeaturedNumbers(featuredNumbers); // All featured numbers for filtering
        setDbAttractiveNumbers(attractiveNumbers.slice(0, 8)); // Limit to 8
        setDbTodayOffers(todayOffers.slice(0, 8)); // Limit to 8
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };
    fetchAllNumbers();
  }, []);

  // Load carousel slides from admin panel
  useEffect(() => {
    const loadCarouselSlides = async () => {
      try {
        const slides = await carouselService.getCarouselSlides();
        console.log('Loaded carousel slides:', slides);

        if (slides && slides.length > 0) {
          setCarouselSlides(slides);
          setIsCarouselReady(true);
        } else {
          // If no slides from database, use fallback slides
          setCarouselSlides([
            {
              id: 1,
              image: "/hero2.jpeg",
              isActive: true,
              display_order: 0,
              createdAt: new Date().toISOString(),
              description: "Premium Numbers Collection"
            },
            {
              id: 2,
              image: "/hero3.jpeg",
              isActive: true,
              display_order: 1,
              createdAt: new Date().toISOString(),
              description: "Lucky Numbers for Success"
            }
          ]);
          setIsCarouselReady(true);
        }
      } catch (error) {
        console.error('Error loading carousel slides:', error);
        // Use fallback slides in case of error
        setCarouselSlides([
          {
            id: 1,
            image: "/hero2.jpeg",
            isActive: true,
            display_order: 0,
            createdAt: new Date().toISOString(),
            description: "Premium Numbers Collection"
          },
          {
            id: 2,
            image: "/hero3.jpeg",
            isActive: true,
            display_order: 1,
            createdAt: new Date().toISOString(),
            description: "Lucky Numbers for Success"
          }
        ]);
        setIsCarouselReady(true);
      }
    };

    loadCarouselSlides();
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    if (carouselSlides.length === 0 || isUserInteracting) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselSlides.length, isUserInteracting]);

  // Animation for phone number highlighting - removed

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    // Pause auto-slide when user manually navigates
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    // Pause auto-slide when user manually navigates
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
    setIsUserInteracting(true); // Pause auto-slide
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsUserInteracting(false); // Resume auto-slide
      return;
    }

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum distance for a swipe

    if (Math.abs(distance) < minSwipeDistance) {
      setIsUserInteracting(false); // Resume auto-slide
      return;
    }

    if (distance > 0) {
      // Swiped left - go to next slide
      nextSlide();
    } else {
      // Swiped right - go to previous slide
      prevSlide();
    }

    // Resume auto-slide after a delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000); // Resume after 3 seconds
  };

  const faqs = [
    {
      question: "Does the number I purchase belong to me?",
      answer: "Yes, once you complete the purchase and documentation process, the number legally belongs to you with full ownership rights."
    },
    {
      question: "Are these numbers currently under contract?",
      answer: "All our premium numbers are available for immediate purchase and are not under any existing contracts."
    },
    {
      question: "What is number porting?",
      answer: "Number porting allows you to keep your existing number while switching to a different network provider. We provide full assistance with the porting process."
    },
    {
      question: "What kind of guarantee do you offer?",
      answer: "We offer a 100% guarantee on number delivery and activation. If we cannot deliver your purchased number, we provide a full refund."
    },
    {
      question: "What is UPC (Unique Porting Code) for MNP Process?",
      answer: "UPC is a unique code required for Mobile Number Portability. We handle all UPC related processes for seamless number transfer."
    },
    {
      question: "What does RTP (Ready To Port) mean?",
      answer: "RTP numbers are unique and easy-to-remember numbers that are readily available for transfer by changing the network or circle."
    },
    {
      question: "Can there be a transfer of ownership of the SIM card?",
      answer: "Yes, we provide complete assistance with ownership transfer including all necessary documentation and legal processes."
    },
    {
      question: "What documents are needed to buy a SIM card?",
      answer: "You need valid government ID proof (Aadhar, PAN, Passport, or Driving License) and address proof for SIM card purchase and activation."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Component for rendering animated phone number - removed

  return (
    <HomeContainer>
      <MainContent>
        {/* Carousel Section */}
        <CarouselSection
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            opacity: isCarouselReady ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {isCarouselReady && carouselSlides.map((slide, index) => (
            <CarouselSlide
              key={slide.id}
              $active={index === currentSlide}
            >
              <img
                src={slide.image || slide.image_url || "/hero2.jpeg"}
                alt={slide.description || `Carousel slide ${index + 1}`}
                onError={(e) => {
                  // Fallback to default image if the slide image fails to load
                  (e.target as HTMLImageElement).src = "/hero2.jpeg";
                }}
                loading="eager"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center top'
                }}
              />
            </CarouselSlide>
          ))}

          {isCarouselReady && carouselSlides.length > 1 && (
            <>
              <CarouselArrows>
                <ArrowButton onClick={prevSlide}>
                  <FaChevronLeft />
                </ArrowButton>
                <ArrowButton onClick={nextSlide}>
                  <FaChevronRight />
                </ArrowButton>
              </CarouselArrows>
            </>
          )}
        </CarouselSection>

        {/* Animated Phone Number Section - Removed */}

        {/* Search Section */}
        <SearchSection>
          <SearchContainer>
            <SearchButtonsContainer>
              <SearchTabButton 
                $active={activeSearchTab === 'global'}
                onClick={() => setActiveSearchTab('global')}
              >
                Global Search
              </SearchTabButton>
              <SearchTabButton 
                $active={activeSearchTab === 'advanced'}
                onClick={() => setActiveSearchTab('advanced')}
              >
                Advanced Search
              </SearchTabButton>
            </SearchButtonsContainer>

            <SearchInputContainer>
              <SearchInputField
                type="text"
                placeholder="Search Any Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIconButton onClick={() => window.location.href = `/gallery?search=${searchTerm}`}>
                <FaSearch />
              </SearchIconButton>
            </SearchInputContainer>
          </SearchContainer>
        </SearchSection>

        {/* Featured Numbers Section */}
        <NumbersSection>
          <SectionTitle>Featured Numbers</SectionTitle>
          <FeaturedLayout>
            <Sidebar $expandHeight={true}>
              <SidebarTitle>Sum Total</SidebarTitle>
              <CategorySection>
                <SearchInput
                  type="text"
                  placeholder="Sum"
                  value={sumTotalSearch}
                  onChange={(e) => setSumTotalSearch(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />

                <SidebarTitle style={{ paddingTop: '0', marginBottom: '20px' }}>CATEGORY</SidebarTitle>
                <CategoryList>
                  {/* All Option */}
                  <CategoryItem>
                    <CategoryLink $isActive={selectedCategoryIds.length === 0}>
                      <CategoryCheckbox
                        type="checkbox"
                        checked={selectedCategoryIds.length === 0}
                        onChange={() => setSelectedCategoryIds([])}
                      />
                      <CategoryInfo>
                        <CategoryName>All</CategoryName>
                      </CategoryInfo>
                    </CategoryLink>
                  </CategoryItem>

                  {/* Dynamic Categories from Database */}
                  {dbCategories.length > 0 ? (
                    dbCategories.map((category) => (
                      <CategoryItem key={category.id}>
                        <CategoryLink $isActive={selectedCategoryIds.includes(category.id)}>
                          <CategoryCheckbox
                            type="checkbox"
                            checked={selectedCategoryIds.includes(category.id)}
                            onChange={() => {
                              setSelectedCategoryIds(prev =>
                                prev.includes(category.id)
                                  ? prev.filter(id => id !== category.id)
                                  : [...prev, category.id]
                              );
                            }}
                          />
                          <CategoryInfo>
                            <CategoryName>{category.name}</CategoryName>
                          </CategoryInfo>
                        </CategoryLink>
                      </CategoryItem>
                    ))
                  ) : (
                    <div style={{ padding: '1rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.875rem' }}>
                      Loading categories...
                    </div>
                  )}
                </CategoryList>
              </CategorySection>
            </Sidebar>

            <div style={{ flex: 1 }}>
              <NumbersGrid>
                {dbFeaturedNumbers.length > 0 ? (
                  (() => {
                    // Filter numbers based on category and sum total
                    let filtered = dbFeaturedNumbers;

                    // Debug logging
                    console.log('===== FILTERING DEBUG =====');
                    console.log('Total featured numbers:', dbFeaturedNumbers.length);
                    console.log('Selected category IDs:', selectedCategoryIds);
                    console.log('Sum total search:', sumTotalSearch);

                    if (dbFeaturedNumbers.length > 0) {
                      const categoryCounts = dbFeaturedNumbers.reduce((acc: any, num) => {
                        const catId = num.category_id || 'null';
                        acc[catId] = (acc[catId] || 0) + 1;
                        return acc;
                      }, {});
                      console.log('Numbers by category_id:', categoryCounts);
                      console.log('First 5 numbers:', dbFeaturedNumbers.slice(0, 5).map(n => ({
                        id: n.id,
                        number: n.number,
                        category_id: n.category_id
                      })));
                    }

                    // Filter by category
                    if (selectedCategoryIds.length > 0) {
                      console.log('Filtering by categories:', selectedCategoryIds);
                      const beforeFilter = filtered.length;
                      filtered = filtered.filter(num => {
                        if (num.category_id === null || num.category_id === undefined) {
                          return false;
                        }
                        return selectedCategoryIds.includes(num.category_id);
                      });
                      console.log(`Category filter: ${beforeFilter} -> ${filtered.length} numbers`);
                      if (filtered.length > 0) {
                        console.log('Sample filtered number:', filtered[0]);
                      }
                    }

                    // Filter by sum total
                    if (sumTotalSearch) {
                      filtered = filtered.filter(num => {
                        const sumTotal = getSumTotalString(num.number);
                        return sumTotal.includes(sumTotalSearch);
                      });
                      console.log('After sum total filter:', filtered.length);
                    }

                    // Limit to 20 numbers
                    const displayNumbers = filtered.slice(0, 20);

                    return displayNumbers.length > 0 ? (
                      displayNumbers.map((item) => (
                        <NumberCard key={item.id}>
                          <NumberDisplay>
                            {item.number}
                          </NumberDisplay>
                          <FeaturedSum>Sum Total = {calculateSumTotal(item.number)}</FeaturedSum>
                          <NumberPrice>₹{item.price.toLocaleString()}</NumberPrice>
                          <CardActions>
                            <CardButton
                              $primary
                              onClick={() => window.open(`https://wa.me/917700071600?text=I'm interested in ${item.number}`, '_blank')}
                            >
                              Buy Now
                            </CardButton>
                          </CardActions>
                        </NumberCard>
                      ))
                    ) : (
                      <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                        No numbers found matching your criteria.
                      </div>
                    );
                  })()
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                    Loading featured numbers...
                  </div>
                )}
              </NumbersGrid>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <MoreButton onClick={() => {
                  // Build URL with search params
                  const params = new URLSearchParams();
                  if (selectedCategoryIds.length > 0) {
                    params.set('categories', selectedCategoryIds.join(','));
                  }
                  if (sumTotalSearch) {
                    params.set('sum', sumTotalSearch);
                  }
                  const url = params.toString() ? `/featured-numbers?${params.toString()}` : '/featured-numbers';
                  window.location.href = url;
                }}>
                  View All Numbers
                </MoreButton>
              </div>
            </div>
          </FeaturedLayout>
        </NumbersSection>

        {/* Today's Offers Auto-Scroll Section */}
        <NumbersSection>
          <SectionTitle>Today's Offers</SectionTitle>
          <VipScrollContainer>
            <VipScrollWrapper>
              {dbTodayOffers.length > 0 ? (
                [...dbTodayOffers, ...dbTodayOffers].map((item, index) => (
                  <VipCard key={index}>
                    <NumberDisplay>
                      +91 {item.number}
                    </NumberDisplay>
                    <FeaturedSum>Sum Total = {calculateSumTotal(item.number)}</FeaturedSum>
                    <NumberPrice>₹{item.price.toLocaleString()}</NumberPrice>
                    <CardActions>
                      <VipCardButton
                        $primary
                        onClick={() => window.open(`https://wa.me/917700071600?text=I'm interested in +91 ${item.number}`, '_blank')}
                      >
                        Buy Now
                      </VipCardButton>
                    </CardActions>
                  </VipCard>
                ))
              ) : (
                <div style={{ padding: '40px', color: '#666', textAlign: 'center', width: '100%' }}>
                  Loading today's offers...
                </div>
              )}
            </VipScrollWrapper>
          </VipScrollContainer>
        </NumbersSection>

        {/* Attractive Numbers Auto-Scroll Section */}
        <NumbersSection>
          <SectionTitle>Attractive Numbers</SectionTitle>
          <AttractiveScrollContainer>
            <AttractiveScrollWrapper>
              {dbAttractiveNumbers.length > 0 ? (
                [...dbAttractiveNumbers, ...dbAttractiveNumbers].map((item, index) => (
                  <AttractiveCard key={index}>
                    <AttractiveNumberDisplay>
                      +91 {item.number}
                    </AttractiveNumberDisplay>
                    <AttractiveSum>Sum Total = {calculateSumTotal(item.number)}</AttractiveSum>
                    <AttractivePrice>₹{item.price.toLocaleString()}</AttractivePrice>
                    <CardActions>
                      <AttractiveButton
                        onClick={() => window.open(`https://wa.me/917700071600?text=I'm interested in +91 ${item.number}`, '_blank')}
                      >
                        Buy Now
                      </AttractiveButton>
                    </CardActions>
                  </AttractiveCard>
                ))
              ) : (
                <div style={{ padding: '40px', color: '#666', textAlign: 'center', width: '100%' }}>
                  Loading attractive numbers...
                </div>
              )}
            </AttractiveScrollWrapper>
          </AttractiveScrollContainer>
        </NumbersSection>
      </MainContent>

      {/* Visitor Counter Section */}
      <VisitorCounterSection>
        <VisitorCounterContent>
          <VisitorCounterTitle>Visitors</VisitorCounterTitle>
          <CounterDisplay>
            {visitorCount.split('').map((digit, index) => (
              <CounterDigit key={index}>{digit}</CounterDigit>
            ))}
          </CounterDisplay>
          <VisitorCounterSubtitle>Vip Numbers</VisitorCounterSubtitle>
        </VisitorCounterContent>
      </VisitorCounterSection>

      {/* FAQ Section */}
      <FAQSection>
        <FAQContainer>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          <FAQSubtitle>
            Get answers to common questions about our premium numbers and services
          </FAQSubtitle>
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <FAQIcon $isOpen={openFAQ === index}>
                    {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                  </FAQIcon>
                </FAQQuestion>
                <FAQAnswer $isOpen={openFAQ === index}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQGrid>
        </FAQContainer>
      </FAQSection>

      {/* Additional Content Section */}
      <AdditionalContentSection>
        <ContentContainer>
          <SectionHeader>
            <AdditionalSectionTitle>Explore More Services</AdditionalSectionTitle>
            <AdditionalSectionSubtitle>
              Discover how we make premium number purchasing seamless and learn about the power of numerology
            </AdditionalSectionSubtitle>
          </SectionHeader>

          <ContentGrid>
            <ContentCard>
              <ContentIcon>
                <FaCog />
              </ContentIcon>
              <ContentTitle>How It Works</ContentTitle>
              <ContentDescription>
                Learn our simple 5-step process from selection to delivery. We guide you through
                booking, documentation, and activation to ensure a smooth experience with your premium number.
              </ContentDescription>
              <ContentButton to="/how-it-works">
                Learn Our Process
                <FaArrowRight />
              </ContentButton>
            </ContentCard>

            <ContentCard>
              <ContentIcon>
                <FaStar />
              </ContentIcon>
              <ContentTitle>Numerology</ContentTitle>
              <ContentDescription>
                Discover the mystical power of numbers and find digits that align with your destiny.
                Our numerology experts help you choose numbers that bring prosperity and good fortune.
              </ContentDescription>
              <ContentButton to="/numerology">
                Explore Numerology
                <FaArrowRight />
              </ContentButton>
            </ContentCard>
          </ContentGrid>
        </ContentContainer>
      </AdditionalContentSection>
    </HomeContainer>
  );
};

export default Home;