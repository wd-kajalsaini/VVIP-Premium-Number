import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronLeft, FaChevronRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaArrowRight, FaCog, FaStar } from '../utils/iconComponents';
import { carouselService, CarouselSlide as CarouselSlideType } from '../services/carouselService';
import { phoneNumberService, PhoneNumber } from '../services/phoneNumberService';
import { categoryService, Category } from '../services/categoryService';

// Import all the styled components from HomeRedesigned
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
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;

  @media (max-width: 840px) {
    width: calc(100% - 40px);
    height: calc((100vw - 40px) * 449 / 800);
    margin: 0 20px;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 30px);
    height: calc((100vw - 30px) * 449 / 800);
    margin: 0 15px;
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
    height: calc((100vw - 20px) * 449 / 800);
    margin: 0 10px;
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

// Search Section
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

// Numbers Section
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

const CategoryLink = styled.div<{ $isActive?: boolean }>`
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
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 2px 8px;
  border-radius: 12px;
`;

const FeaturedContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  flex: 1;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const VipCard = styled(NumberCard)`
  background: linear-gradient(135deg, #2c5282, #1e3a5f);
  border: 2px solid #1e3a5f;

  &::after {
    content: 'VIP';
    position: absolute;
    top: 15px;
    right: 15px;
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

  pointer-events: auto;
  touch-action: pan-y;
`;

// FAQ and other sections remain the same...
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

const HomeDynamic: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [vvipNumbers, setVvipNumbers] = useState<PhoneNumber[]>([]);
  const [todayOffers, setTodayOffers] = useState<PhoneNumber[]>([]);
  const [featuredNumbers, setFeaturedNumbers] = useState<PhoneNumber[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlideType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('global');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isLoadingNumbers, setIsLoadingNumbers] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    loadCarouselSlides();
    loadCategories();
    loadPhoneNumbers();
  }, []);

  const loadCarouselSlides = async () => {
    try {
      setIsLoadingCarousel(true);
      const slides = await carouselService.getCarouselSlides();
      setCarouselSlides(slides);
    } catch (error) {
      console.error('Error loading carousel slides:', error);
    } finally {
      setIsLoadingCarousel(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await categoryService.getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadPhoneNumbers = async () => {
    try {
      setIsLoadingNumbers(true);

      // Load different sets of numbers
      const [featured, vvip, offers] = await Promise.all([
        phoneNumberService.getFeaturedNumbers(),
        phoneNumberService.getVVIPNumbers(),
        phoneNumberService.getTodayOffers()
      ]);

      setFeaturedNumbers(featured.slice(0, 15)); // Show max 15 featured
      setVvipNumbers(vvip.slice(0, 10)); // Show max 10 VVIP
      setTodayOffers(offers.slice(0, 10)); // Show max 10 today offers

      // Load all active numbers for general display
      const all = await phoneNumberService.getActivePhoneNumbers();
      setPhoneNumbers(all);
    } catch (error) {
      console.error('Error loading phone numbers:', error);
    } finally {
      setIsLoadingNumbers(false);
    }
  };

  const loadNumbersByCategory = async (categoryId: number) => {
    try {
      setIsLoadingNumbers(true);
      const filtered = await phoneNumberService.getActivePhoneNumbers({ category_id: categoryId });
      setPhoneNumbers(filtered);
    } catch (error) {
      console.error('Error loading numbers by category:', error);
    } finally {
      setIsLoadingNumbers(false);
    }
  };

  // Format number with highlights
  const formatNumberDisplay = (number: PhoneNumber): React.ReactElement => {
    const display = number.display_number || number.number;
    const highlights = number.highlights || [];
    const digits = display.split('');

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

  // Format sum total display
  const formatSumTotal = (number: PhoneNumber): React.ReactElement => {
    if (!number.sum_total_1) return <></>;

    return (
      <>
        <strong>{number.sum_total_1}-{number.sum_total_2}-{number.sum_total_3}</strong>
      </>
    );
  };

  // Auto-slide carousel
  useEffect(() => {
    if (carouselSlides.length === 0 || isUserInteracting) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselSlides.length, isUserInteracting]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsUserInteracting(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsUserInteracting(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) {
      setIsUserInteracting(false);
      return;
    }

    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      loadPhoneNumbers();
    } else {
      setSelectedCategory(categoryId);
      loadNumbersByCategory(categoryId);
    }
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

  const getCategoryNumberCount = (categoryId: number): number => {
    return phoneNumbers.filter(num => num.category_id === categoryId).length;
  };

  return (
    <HomeContainer>
      <MainContent>
        {/* Carousel Section */}
        <CarouselSection
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoadingCarousel ? (
            <div style={{
              height: '449px',
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
                >
                  <img
                    src={slide.image || slide.image_url || "/hero2.jpeg"}
                    alt={slide.description || `Carousel slide ${index + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/hero2.jpeg";
                    }}
                  />
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
                        onClick={() => {
                          setCurrentSlide(index);
                          setIsUserInteracting(true);
                          setTimeout(() => setIsUserInteracting(false), 3000);
                        }}
                      />
                    ))}
                  </CarouselDots>
                </>
              )}
            </>
          ) : (
            <div style={{
              height: '449px',
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

        {/* Featured Numbers with Category Sidebar */}
        <NumbersSection>
          <SectionTitle>Featured Numbers</SectionTitle>
          <FeaturedLayout>
            {categories.length > 0 && (
              <Sidebar>
                <SidebarTitle>Categories</SidebarTitle>
                <CategorySection>
                  <CategoryList>
                    {categories.map(category => (
                      <CategoryItem key={category.id}>
                        <CategoryLink
                          $isActive={selectedCategory === category.id}
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <CategoryInfo>
                            <CategoryName>{category.name}</CategoryName>
                            <CategoryCount>{getCategoryNumberCount(category.id)}</CategoryCount>
                          </CategoryInfo>
                        </CategoryLink>
                      </CategoryItem>
                    ))}
                  </CategoryList>
                </CategorySection>
              </Sidebar>
            )}

            <FeaturedContent>
              {isLoadingNumbers ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                  Loading numbers...
                </div>
              ) : featuredNumbers.length > 0 ? (
                <>
                  <NumbersGrid>
                    {featuredNumbers.map((number) => (
                      <NumberCard key={number.id}>
                        <NumberDisplay>
                          {formatNumberDisplay(number)}
                        </NumberDisplay>
                        <FeaturedSum>Sum Total = {formatSumTotal(number)}</FeaturedSum>
                        <NumberPrice>₹{number.price.toLocaleString()}</NumberPrice>
                        <CardActions>
                          <CardButton
                            $primary
                            onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in ${number.number}`, '_blank')}
                          >
                            Buy Now
                          </CardButton>
                        </CardActions>
                      </NumberCard>
                    ))}
                  </NumbersGrid>

                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <MoreButton onClick={() => window.location.href = '/vvip-collection'}>
                      View All Numbers
                    </MoreButton>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                  No featured numbers available
                </div>
              )}
            </FeaturedContent>
          </FeaturedLayout>
        </NumbersSection>

        {/* Today's Offers Section */}
        {todayOffers.length > 0 && (
          <NumbersSection>
            <SectionTitle>Today's Offers</SectionTitle>
            <VipScrollContainer>
              <VipScrollWrapper>
                {[...todayOffers, ...todayOffers].map((number, index) => (
                  <VipCard key={`offer-${index}`}>
                    <NumberDisplay>
                      {formatNumberDisplay(number)}
                    </NumberDisplay>
                    <FeaturedSum>Sum Total = {formatSumTotal(number)}</FeaturedSum>
                    <NumberPrice>
                      ₹{number.price.toLocaleString()}
                      {number.original_price && number.original_price > number.price && (
                        <span style={{
                          textDecoration: 'line-through',
                          marginLeft: '10px',
                          opacity: 0.7,
                          fontSize: '0.9em'
                        }}>
                          ₹{number.original_price.toLocaleString()}
                        </span>
                      )}
                    </NumberPrice>
                    <CardActions>
                      <CardButton
                        $primary
                        onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in Today's Offer: ${number.number}`, '_blank')}
                      >
                        Buy Now
                      </CardButton>
                    </CardActions>
                  </VipCard>
                ))}
              </VipScrollWrapper>
            </VipScrollContainer>
          </NumbersSection>
        )}

        {/* VVIP Numbers Section */}
        {vvipNumbers.length > 0 && (
          <NumbersSection>
            <SectionTitle>VVIP Numbers</SectionTitle>
            <VipScrollContainer>
              <VipScrollWrapper>
                {[...vvipNumbers, ...vvipNumbers].map((number, index) => (
                  <VipCard key={`vvip-${index}`}>
                    <NumberDisplay>
                      {formatNumberDisplay(number)}
                    </NumberDisplay>
                    <FeaturedSum>Sum Total = {formatSumTotal(number)}</FeaturedSum>
                    <NumberPrice>₹{number.price.toLocaleString()}</NumberPrice>
                    <CardActions>
                      <CardButton
                        $primary
                        onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in VVIP number: ${number.number}`, '_blank')}
                      >
                        Buy Now
                      </CardButton>
                    </CardActions>
                  </VipCard>
                ))}
              </VipScrollWrapper>
            </VipScrollContainer>
          </NumbersSection>
        )}
      </MainContent>

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
    </HomeContainer>
  );
};

export default HomeDynamic;