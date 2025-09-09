import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaWhatsapp, FaPhone, FaChevronDown, FaChevronUp, FaArrowRight, FaCog, FaStar } from '../utils/iconComponents';
import { carouselService, CarouselSlide as CarouselSlideType } from '../services/carouselService';

const HomeContainer = styled.div`
  margin-top: 70px;
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
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
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
  width: 100%;
  height: 600px;
  overflow: hidden;
  background: #1e3a5f;

  @media (max-width: 768px) {
    height: 450px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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

// Search Bar Section
const SearchSection = styled.section`
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 70px;
  z-index: 100;
`;

const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SortSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  @media (max-width: 768px) {
    width: 100%;
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
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b35;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 12px 30px;
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
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
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
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
    background: linear-gradient(90deg, #6366f1, #4f46e5);
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
  color: ${props => props.$isActive ? '#374151' : '#6b7280'};
  text-decoration: none;
  padding: 14px 16px;
  border-radius: 12px;
  background: ${props => props.$isActive
    ? 'linear-gradient(135deg, #eff6ff, #dbeafe)'
    : 'transparent'};
  border: 2px solid ${props => props.$isActive
    ? '#374151'
    : 'transparent'};
  transition: all 0.3s ease;
  font-size: 15px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${props => props.$isActive ? '#6366f1' : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' 
      : '#f9fafb'};
    color: ${props => props.$isActive ? '#6366f1' : '#374151'};
    transform: translateX(2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    
    &::before {
      background: ${props => props.$isActive ? '#6366f1' : '#d1d5db'};
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
  margin-left: 10px;
  accent-color: #6b7280;
  cursor: pointer;
`;

const FeaturedContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const VipScrollWrapper = styled.div`
  display: flex;
  gap: 25px;
  width: max-content;
  animation: autoScroll 60s linear infinite;

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
`;

const VipCard = styled.div`
  background: linear-gradient(135deg, #6366f1, #4f46e5, #374151);
  border: 2px solid #6366f1;
  border-radius: 12px;
  padding: 25px;
  min-width: 340px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
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
    top: 15px;
    right: 15px;
    background: linear-gradient(135deg, #6366f1, #6b7280);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    z-index: 3;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
    border-color: #6b7280;

    &::before {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15));
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
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  span.highlight {
    color: #ff6b35;
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  }

  @media (max-width: 1200px) {
    font-size: 1.1rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  position: relative;
  z-index: 2;
`;

const CardButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

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

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numbersToShow] = useState(10); // Show fixed 10 numbers
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visitorCount] = useState('033015'); // Static visitor count
  const [sortBy, setSortBy] = useState('Sort By');
  const [priceFilter, setPriceFilter] = useState('Price Low to High');
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlideType[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);

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

  // Load carousel slides from admin panel
  useEffect(() => {
    const loadCarouselSlides = async () => {
      try {
        setIsLoadingCarousel(true);
        const slides = await carouselService.getCarouselSlides();
        setCarouselSlides(slides);
      } catch (error) {
        console.error('Error loading carousel slides:', error);
        // Fallback to default slides if API fails
        setCarouselSlides([
          {
            id: 1,
            image: "/hero2.jpeg",
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setIsLoadingCarousel(false);
      }
    };

    loadCarouselSlides();
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    if (carouselSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
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

  return (
    <HomeContainer>
      <MainContent>
        {/* Carousel Section */}
        <CarouselSection>
          {isLoadingCarousel ? (
            <div style={{ 
              height: '500px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              Loading carousel...
            </div>
          ) : carouselSlides.length > 0 ? (
            <>
              {carouselSlides.map((slide, index) => (
                <CarouselSlide
                  key={slide.id}
                  $active={index === currentSlide}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                </CarouselSlide>
              ))}

              {carouselSlides.length > 1 && (
                <>
                  <CarouselArrows>
                    <ArrowButton onClick={prevSlide}>
                      <FaChevronLeft />
                    </ArrowButton>
                    <ArrowButton onClick={nextSlide}>
                      <FaChevronRight />
                    </ArrowButton>
                  </CarouselArrows>

                  <CarouselDots>
                    {carouselSlides.map((_, index) => (
                      <CarouselDot
                        key={index}
                        $active={index === currentSlide}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </CarouselDots>
                </>
              )}
            </>
          ) : (
            <div style={{ 
              height: '500px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              No carousel slides available
            </div>
          )}
        </CarouselSection>

        {/* Search Section */}
        <SearchSection>
          <SearchContainer>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option>Sort By</option>
              <option>Latest First</option>
              <option>Most Popular</option>
              <option>Best Value</option>
            </SortSelect>
            <SortSelect value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
              <option>Under ₹10,000</option>
              <option>₹10,000 - ₹50,000</option>
              <option>Above ₹50,000</option>
            </SortSelect>
            <SearchInput
              type="text"
              placeholder="Search Your Choice Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton onClick={() => window.location.href = `/gallery?search=${searchTerm}`}>
              <FaSearch />
              SEARCH
            </SearchButton>
            <BreadcrumbText>HOME / VIP NUMBER</BreadcrumbText>
          </SearchContainer>
        </SearchSection>

        {/* Featured Numbers Section */}
        <NumbersSection>
          <SectionTitle>Featured Numbers</SectionTitle>
          <FeaturedContent>
              <NumbersGrid>
                {featuredNumbers.slice(0, numbersToShow).map((item, index) => (
                  <NumberCard key={index}>
                    <NumberDisplay>
                      {formatNumberDisplay(item.number, item.highlights)}
                    </NumberDisplay>
                    <NumberPrice>{item.price}</NumberPrice>
                    <CardActions>
                      <CardButton>Details</CardButton>
                      <CardButton
                        $primary
                        onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in ${item.number}`, '_blank')}
                      >
                        Buy Now
                      </CardButton>
                    </CardActions>
                  </NumberCard>
                ))}
              </NumbersGrid>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <MoreButton onClick={() => window.location.href = '/vvip-collection'}>
                  View All VIP Numbers
                </MoreButton>
              </div>
          </FeaturedContent>
        </NumbersSection>

        {/* VIP Numbers Auto-Scroll Section */}
        <NumbersSection>
          <SectionTitle>Premium VIP Numbers</SectionTitle>
          <VipScrollContainer>
            <VipScrollWrapper>
              {[...vipNumbers, ...vipNumbers].map((item, index) => (
                <VipCard key={index}>
                  <NumberDisplay>
                    {formatNumberDisplay(item.number, item.highlights)}
                  </NumberDisplay>
                  <NumberPrice>{item.price}</NumberPrice>
                  <CardActions>
                    <CardButton>Details</CardButton>
                    <CardButton
                      $primary
                      onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in ${item.number}`, '_blank')}
                    >
                      Buy Now
                    </CardButton>
                  </CardActions>
                </VipCard>
              ))}
            </VipScrollWrapper>
          </VipScrollContainer>
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