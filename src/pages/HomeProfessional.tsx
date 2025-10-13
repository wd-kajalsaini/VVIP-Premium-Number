import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaShieldAlt, FaRocket, FaPhoneAlt, FaCrown, FaMagic, FaFilter, FaCheck, FaArrowRight, FaUserShield, FaHeadset, FaTruck, FaMoneyBillWave } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HomeContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: #f8f9fa;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const HeroText = styled.div`
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 30px;
  opacity: 0.95;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const HeroButton = styled(Link)<{ $primary?: boolean }>`
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-size: 1rem;

  ${props => props.$primary ? `
    background: white;
    color: #1e3a8a;
    
    &:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #1e3a8a;
    }
  `}
`;

const ServiceBadges = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const ServiceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.95rem;
  opacity: 0.9;

  svg {
    color: #fbbf24;
    font-size: 1.2rem;
  }
`;

const HeroImage = styled.div`
  position: relative;

  @media (max-width: 968px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const FloatingCard = styled.div<{ $delay?: number }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const NumberShowcase = styled.div`
  text-align: center;
  
  h3 {
    font-size: 1.8rem;
    background: linear-gradient(135deg, #f59e0b, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }

  p {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e3a8a;
  }
`;

const SearchSection = styled.section`
  background: white;
  padding: 30px 20px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 70px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  background: #f3f4f6;
  padding: 8px;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: white;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 12px 24px;
  border: none;
  background: ${props => props.$active ? '#3b82f6' : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active ? '#2563eb' : '#f3f4f6'};
  }
`;

const SearchButton = styled.button`
  padding: 12px 32px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
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
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const QuickFilter = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.$active ? '#3b82f6' : '#e5e7eb'};
  background: ${props => props.$active ? '#eff6ff' : 'white'};
  color: ${props => props.$active ? '#3b82f6' : '#6b7280'};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

const CategorySection = styled.section`
  padding: 60px 20px;
  background: white;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const CategoryGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const CategoryCard = styled(Link)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-color: #3b82f6;
  }
`;

const CategoryIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.$color}15;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${props => props.$color};
  font-size: 1.8rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  color: #1f2937;
  margin-bottom: 10px;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f3f4f6;
`;

const CategoryCount = styled.span`
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.95rem;
`;

const CategoryPrice = styled.span`
  color: #10b981;
  font-weight: 600;
  font-size: 0.95rem;
`;

const NumbersSection = styled.section`
  padding: 60px 20px;
  background: #f9fafb;
`;

const NumbersGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const NumberCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    border-color: #3b82f6;
  }
`;

const NumberBadge = styled.div<{ $type: string }>`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch(props.$type) {
      case 'vip':
        return `
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: white;
        `;
      case 'premium':
        return `
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const NumberDisplay = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;
  font-family: 'Monaco', 'Courier New', monospace;
`;

const NumberDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NumberPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

const NumberProvider = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
`;

const NumberActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$primary ? `
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
  ` : `
    background: #f3f4f6;
    color: #6b7280;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled.div`
  text-align: center;
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: #f59e0b;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #1f2937;
  margin-bottom: 10px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 40px;
  opacity: 0.95;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  padding: 16px 40px;
  background: white;
  color: #1e3a8a;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
`;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      icon: <FaCrown />,
      title: "VIP Numbers",
      description: "Exclusive numbers with repeating patterns",
      count: "500+ Available",
      price: "₹5,000 - ₹50,000",
      link: "/vvip-collection",
      color: "#f59e0b"
    },
    {
      icon: <FaStar />,
      title: "Premium Numbers",
      description: "High-quality numbers with special sequences",
      count: "1000+ Available",
      price: "₹2,000 - ₹25,000",
      link: "/gallery",
      color: "#8b5cf6"
    },
    {
      icon: <FaMagic />,
      title: "Lucky Numbers",
      description: "Numerology-based fortune numbers",
      count: "750+ Available",
      price: "₹1,000 - ₹15,000",
      link: "/numerology",
      color: "#10b981"
    },
    {
      icon: <FaRocket />,
      title: "Business Numbers",
      description: "Professional numbers for enterprises",
      count: "300+ Available",
      price: "₹3,000 - ₹30,000",
      link: "/gallery",
      color: "#3b82f6"
    }
  ];

  const featuredNumbers = [
    { number: "98765-43210", type: "vip", price: "₹25,000", provider: "Airtel" },
    { number: "77777-77777", type: "vip", price: "₹45,000", provider: "Jio" },
    { number: "88888-99999", type: "premium", price: "₹18,000", provider: "VI" },
    { number: "12345-67890", type: "premium", price: "₹12,000", provider: "BSNL" },
    { number: "99999-00000", type: "vip", price: "₹35,000", provider: "Airtel" },
    { number: "11111-22222", type: "standard", price: "₹8,000", provider: "Jio" }
  ];

  const features = [
    {
      icon: <FaUserShield />,
      title: "100% Verified",
      description: "All numbers are verified and authentic with legal documentation"
    },
    {
      icon: <FaTruck />,
      title: "Quick Delivery",
      description: "Get your number activated within 24-48 hours of purchase"
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Dedicated customer support to help you choose the perfect number"
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Prices",
      description: "Competitive pricing with flexible payment options available"
    }
  ];

  const quickFilters = [
    "VIP", "Premium", "Sequential", "Repeating", "Mirror", "Lucky", "Business"
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>Find Your Perfect Premium Mobile Number</HeroTitle>
            <HeroSubtitle>
              Choose from India's largest collection of VIP, fancy, and premium mobile numbers. 
              Stand out with a number that defines you.
            </HeroSubtitle>
            <HeroButtons>
              <HeroButton to="/gallery" $primary>
                Browse Collection
                <FaArrowRight />
              </HeroButton>
              <HeroButton to="/how-it-works">
                How It Works
              </HeroButton>
            </HeroButtons>
            <ServiceBadges>
              <ServiceBadge>
                <FaCheck />
                100% Verified Numbers
              </ServiceBadge>
              <ServiceBadge>
                <FaCheck />
                Instant Activation
              </ServiceBadge>
              <ServiceBadge>
                <FaCheck />
                All Operators
              </ServiceBadge>
            </ServiceBadges>
          </HeroText>
          <HeroImage>
            <FloatingCard>
              <NumberShowcase>
                <h3>98765-43210</h3>
                <p>Premium Sequential</p>
                <div className="price">₹25,000</div>
              </NumberShowcase>
            </FloatingCard>
          </HeroImage>
        </HeroContent>
      </HeroSection>

      <SearchSection>
        <SearchContainer>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search by number pattern, digits, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchFilters>
              <FilterButton $active={selectedCategory === 'vip'} onClick={() => setSelectedCategory('vip')}>
                VIP
              </FilterButton>
              <FilterButton $active={selectedCategory === 'premium'} onClick={() => setSelectedCategory('premium')}>
                Premium
              </FilterButton>
              <FilterButton onClick={() => {}}>
                <FaFilter /> More Filters
              </FilterButton>
            </SearchFilters>
            <SearchButton onClick={() => window.location.href = `/gallery?search=${searchTerm}`}>
              <FaSearch />
              Search
            </SearchButton>
          </SearchBar>
          <QuickFilters>
            {quickFilters.map((filter, index) => (
              <QuickFilter
                key={index}
                $active={activeFilter === filter.toLowerCase()}
                onClick={() => setActiveFilter(filter.toLowerCase())}
              >
                {filter}
              </QuickFilter>
            ))}
          </QuickFilters>
        </SearchContainer>
      </SearchSection>

      <CategorySection>
        <SectionHeader>
          <SectionTitle>Choose Your Category</SectionTitle>
          <SectionDescription>
            Select from our wide range of premium number categories tailored to your needs
          </SectionDescription>
        </SectionHeader>
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index} to={category.link}>
              <CategoryIcon $color={category.color}>
                {category.icon}
              </CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
              <CategoryStats>
                <CategoryCount>{category.count}</CategoryCount>
                <CategoryPrice>{category.price}</CategoryPrice>
              </CategoryStats>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySection>

      <NumbersSection>
        <SectionHeader>
          <SectionTitle>Featured Premium Numbers</SectionTitle>
          <SectionDescription>
            Handpicked selection of our most popular premium numbers
          </SectionDescription>
        </SectionHeader>
        <NumbersGrid>
          {featuredNumbers.map((number, index) => (
            <NumberCard key={index}>
              <NumberBadge $type={number.type}>{number.type}</NumberBadge>
              <NumberDisplay>+91 {number.number}</NumberDisplay>
              <NumberDetails>
                <NumberPrice>{number.price}</NumberPrice>
                <NumberProvider>{number.provider}</NumberProvider>
              </NumberDetails>
              <NumberActions>
                <ActionButton $primary onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy +91 ${number.number}`, '_blank')}>
                  Buy Now
                </ActionButton>
                <ActionButton onClick={() => {}}>
                  Details
                </ActionButton>
              </NumberActions>
            </NumberCard>
          ))}
        </NumbersGrid>
      </NumbersSection>

      <FeaturesSection>
        <SectionHeader>
          <SectionTitle>Why Choose Premium Numbers?</SectionTitle>
          <SectionDescription>
            We make it easy to find and purchase your perfect premium number
          </SectionDescription>
        </SectionHeader>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Get Your Premium Number?</CTATitle>
          <CTADescription>
            Join thousands of satisfied customers who have found their perfect number with us
          </CTADescription>
          <CTAButtons>
            <CTAButton href="https://wa.me/917700071600">
              <FaPhoneAlt />
              Contact Us on WhatsApp
            </CTAButton>
          </CTAButtons>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;