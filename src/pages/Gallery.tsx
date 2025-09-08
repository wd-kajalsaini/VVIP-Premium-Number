import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaStar } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const GalleryContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}15, 
    ${theme.colors.primary.skyBlue}15
  );
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const SearchSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: ${theme.colors.neutral.white};
`;

const SearchControls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  min-width: 300px;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.neutral.white};
  font-size: ${theme.typography.fontSize.md};

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
  }
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.$isActive 
    ? theme.colors.primary.orange 
    : theme.colors.neutral.gray300};
  background: ${props => props.$isActive 
    ? theme.colors.primary.orange 
    : theme.colors.neutral.white};
  color: ${props => props.$isActive 
    ? theme.colors.neutral.white 
    : theme.colors.neutral.gray700};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary.orange};
    background: ${props => props.$isActive 
      ? theme.colors.primary.orange 
      : theme.colors.primary.orange}10;
  }
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const NumberCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.skyBlue};
  }
`;

const NumberHeader = styled.div<{ $category: string }>`
  padding: ${theme.spacing.md};
  background: ${props => {
    switch(props.$category) {
      case 'VIP': return `linear-gradient(135deg, ${theme.colors.primary.orange}, ${theme.colors.primary.yellow})`;
      case 'Premium': return `linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.skyBlue})`;
      default: return `linear-gradient(135deg, ${theme.colors.primary.skyBlue}, ${theme.colors.primary.green})`;
    }
  }};
  color: ${theme.colors.neutral.white};
  text-align: center;
`;

const CategoryBadge = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const NumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-top: ${theme.spacing.sm};
  letter-spacing: 2px;
`;

const NumberBody = styled.div`
  padding: ${theme.spacing.lg};
`;

const NumberFeatures = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Feature = styled.span<{ $color: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${props => props.$color}20;
  color: ${props => props.$color};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: ${theme.spacing.xs} ${theme.spacing.xs} 0 0;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const Price = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.green};
`;

const OriginalPrice = styled.span`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.neutral.gray400};
  text-decoration: line-through;
  margin-left: ${theme.spacing.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.a<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;

  ${props => props.$variant === 'primary' 
    ? `
      background: linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.skyBlue});
      color: ${theme.colors.neutral.white};

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
    `
    : `
      background: #25D366;
      color: ${theme.colors.neutral.white};

      &:hover {
        background: #128C7E;
        transform: translateY(-2px);
      }
    `
  }
`;

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const categories = ['All', 'VIP', 'Premium', 'Lucky', 'Sequential'];
  const priceRanges = ['All', '< ₹10,000', '₹10,000 - ₹50,000', '₹50,000 - ₹1,00,000', '> ₹1,00,000'];

  const demoNumbers = [
    {
      number: '+91 98765 43210',
      category: 'VIP',
      features: ['Sequential', 'Easy to Remember'],
      price: 75000,
      originalPrice: 85000,
      pattern: 'Descending Sequential'
    },
    {
      number: '+91 99999 88888',
      category: 'Premium',
      features: ['Repeated Pattern', 'Lucky Numbers'],
      price: 45000,
      originalPrice: 55000,
      pattern: 'Repeated Digits'
    },
    {
      number: '+91 98888 88888',
      category: 'VIP',
      features: ['Lucky Number 8', 'Prosperity'],
      price: 125000,
      originalPrice: 150000,
      pattern: 'Eight Pattern'
    },
    {
      number: '+91 97777 77777',
      category: 'Premium',
      features: ['Lucky Number 7', 'Spiritual'],
      price: 95000,
      originalPrice: 110000,
      pattern: 'Seven Pattern'
    },
    {
      number: '+91 91234 56789',
      category: 'Sequential',
      features: ['Ascending Sequential', 'Mathematical'],
      price: 35000,
      originalPrice: 40000,
      pattern: 'Ascending Sequential'
    },
    {
      number: '+91 96666 66666',
      category: 'Premium',
      features: ['Repeated Pattern', 'Symmetrical'],
      price: 65000,
      originalPrice: 75000,
      pattern: 'Six Pattern'
    },
  ];

  const filteredNumbers = demoNumbers.filter(number => {
    const matchesSearch = number.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         number.pattern.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || number.category === selectedCategory;
    
    const matchesPrice = priceRange === 'All' || (() => {
      switch(priceRange) {
        case '< ₹10,000': return number.price < 10000;
        case '₹10,000 - ₹50,000': return number.price >= 10000 && number.price <= 50000;
        case '₹50,000 - ₹1,00,000': return number.price >= 50000 && number.price <= 100000;
        case '> ₹1,00,000': return number.price > 100000;
        default: return true;
      }
    })();

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getWhatsAppLink = (number: string, price: number) => {
    const message = `Hi! I'm interested in purchasing the premium number ${number} for ₹${price.toLocaleString('en-IN')}. Please provide more details.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  return (
    <GalleryContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle>Premium Numbers Gallery</HeroTitle>
          <p style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.lg }}>
            Discover premium mobile numbers with unique patterns and special significance
          </p>
        </div>
      </HeroSection>

      <SearchSection>
        <div className="container">
          <SearchControls>
            <SearchInput
              type="text"
              placeholder="Search numbers, patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <FilterSelect
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </FilterSelect>
          </SearchControls>

          <SearchControls>
            {categories.map(category => (
              <FilterButton
                key={category}
                $isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </SearchControls>

          <NumbersGrid>
            {filteredNumbers.map((number, index) => (
              <NumberCard key={index}>
                <NumberHeader $category={number.category}>
                  <CategoryBadge>
                    <FaStar />
                    {number.category}
                  </CategoryBadge>
                  <NumberDisplay>{number.number}</NumberDisplay>
                  <div style={{ fontSize: theme.typography.fontSize.sm, marginTop: theme.spacing.xs }}>
                    {number.pattern}
                  </div>
                </NumberHeader>

                <NumberBody>
                  <NumberFeatures>
                    {number.features.map((feature, idx) => (
                      <Feature 
                        key={idx} 
                        $color={idx % 2 === 0 ? theme.colors.primary.green : theme.colors.primary.orange}
                      >
                        {feature}
                      </Feature>
                    ))}
                  </NumberFeatures>

                  <PriceSection>
                    <Price>
                      ₹{number.price.toLocaleString('en-IN')}
                      <OriginalPrice>₹{number.originalPrice.toLocaleString('en-IN')}</OriginalPrice>
                    </Price>
                  </PriceSection>

                  <ActionButtons>
                    <ActionButton
                      href={getWhatsAppLink(number.number, number.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      $variant="primary"
                    >
                      Buy Now
                    </ActionButton>
                    <ActionButton
                      href={getWhatsAppLink(number.number, number.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      $variant="secondary"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </ActionButton>
                  </ActionButtons>
                </NumberBody>
              </NumberCard>
            ))}
          </NumbersGrid>

          {filteredNumbers.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: theme.spacing['2xl'],
              color: theme.colors.neutral.gray500 
            }}>
              <p>No numbers found matching your criteria. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </SearchSection>
    </GalleryContainer>
  );
};

export default Gallery;