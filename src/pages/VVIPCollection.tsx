import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCrown, FaStar, FaGem, FaWhatsapp, FaSearch } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const VVIPContainer = styled.div`
  margin-top: 70px;
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
`;

const SidebarTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: left;
  border-bottom: 2px solid ${theme.colors.primary.orange};
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
  color: ${props => props.$isActive ? theme.colors.primary.orange : theme.colors.neutral.gray700};
  background: ${props => props.$isActive 
    ? theme.colors.primary.orange + '15'
    : 'transparent'};
  border: 1px solid ${props => props.$isActive 
    ? theme.colors.primary.orange
    : theme.colors.neutral.gray300};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.xs};

  &:hover {
    background: ${theme.colors.primary.orange}20;
    border-color: ${theme.colors.primary.orange};
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  accent-color: ${theme.colors.primary.orange};
  cursor: pointer;
`;

const PriceRange = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.7;
  color: ${theme.colors.neutral.gray500};
`;

const SearchSection = styled.section`
  background: linear-gradient(135deg, 
    #667eea 0%,
    #764ba2 100%
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const CrownIcon = styled(FaCrown)`
  color: ${theme.colors.neutral.white};
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
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
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.sm};

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

const NumbersSection = styled.section`
  padding: ${theme.spacing.lg} 0;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const VVIPCard = styled.div`
  background: linear-gradient(135deg, 
    #667eea 0%,
    #764ba2 100%
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
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
  display: inline-block;
  position: relative;
  z-index: 2;
`;

const NumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 1px;
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
`;

const NumberPrice = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.md};
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
  padding: ${theme.spacing.md} ${theme.spacing.lg};
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

const VVIPBody = styled.div`
  padding: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
`;

const FeaturesList = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.neutral.gray700};

  svg {
    color: ${theme.colors.primary.orange};
  }
`;

const PriceSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}10, 
    ${theme.colors.primary.yellow}10
  );
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.primary.orange}30;
`;

const Price = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const OriginalPrice = styled.div`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.neutral.gray400};
  text-decoration: line-through;
  margin-top: ${theme.spacing.xs};
`;

const SavingsTag = styled.div`
  display: inline-block;
  background: ${theme.colors.primary.green};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-top: ${theme.spacing.sm};
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  color: ${theme.colors.neutral.white};
  text-decoration: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
    background: linear-gradient(135deg, 
      ${theme.colors.primary.yellow}, 
      ${theme.colors.primary.orange}
    );
  }
`;

const ExclusiveFeatures = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray100}, 
    ${theme.colors.neutral.white}
  );
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  border-top: 4px solid ${theme.colors.primary.orange};
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.neutral.white};
  font-size: 1.8rem;
`;

const VVIPCollection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Numbers');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'All Numbers', count: 150 },
    { name: 'VIP Numbers', count: 45 },
    { name: 'Fancy Numbers', count: 32 },
    { name: 'Lucky Numbers', count: 28 },
    { name: 'Premium Numbers', count: 25 },
    { name: 'Golden Numbers', count: 20 },
    { name: 'Diamond Numbers', count: 15 },
    { name: 'Platinum Numbers', count: 12 }
  ];

  const vvipNumbers = [
    {
      number: '99999 99999',
      specialty: 'Ultimate Nine Pattern',
      category: 'Ultra Premium',
      price: 500000,
      originalPrice: 650000,
      savings: 150000
    },
    {
      number: '88888 88888',
      specialty: 'Infinity Power Pattern',
      category: 'Diamond Elite',
      price: 450000,
      originalPrice: 575000,
      savings: 125000
    },
    {
      number: '77777 77777',
      specialty: 'Seven Chakra Alignment',
      category: 'Ultra Premium',
      price: 350000,
      originalPrice: 425000,
      savings: 75000
    },
    {
      number: '11111 11111',
      specialty: 'Master Manifestation',
      category: 'Golden VIP',
      price: 300000,
      originalPrice: 375000,
      savings: 75000
    },
    {
      number: '12345 67890',
      specialty: 'Perfect Sequential Flow',
      category: 'Platinum Plus',
      price: 275000,
      originalPrice: 325000,
      savings: 50000
    },
    {
      number: '98765 43210',
      specialty: 'Reverse Sequential Power',
      category: 'Golden VIP',
      price: 250000,
      originalPrice: 300000,
      savings: 50000
    }
  ];

  const filteredNumbers = vvipNumbers.filter(number => {
    const matchesCategory = selectedCategory === 'All Numbers' || number.category === selectedCategory;
    const matchesSearch = number.number.includes(searchTerm) || 
                         number.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getWhatsAppLink = (number: string, price: number) => {
    const message = `Hi! I'm interested in the VVIP number +91 ${number} for ₹${price.toLocaleString('en-IN')}. Please provide complete details.`;
    return `https://wa.me/919772297722?text=${encodeURIComponent(message)}`;
  };

  return (
    <VVIPContainer>
      <Sidebar>
        <SidebarTitle>VVIP Categories</SidebarTitle>
        <CategoryList>
          {categories.map((category, index) => (
            <CategoryItem key={index}>
              <CategoryLink 
                as="label"
                $isActive={selectedCategory === category.name}
              >
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryCount>{category.count}</CategoryCount>
                </CategoryInfo>
                <CategoryCheckbox 
                  type="checkbox" 
                  checked={selectedCategory === category.name}
                  onChange={() => setSelectedCategory(category.name)}
                />
              </CategoryLink>
            </CategoryItem>
          ))}
        </CategoryList>
      </Sidebar>

      <MainContent>
        <SearchSection>
          <SearchContainer>
            <SearchTitle>
              <CrownIcon />
              Find Your Perfect VVIP Number
            </SearchTitle>
            <SearchForm>
              <SearchInputGroup>
                <SearchInput
                  type="text"
                  placeholder="Search by number or pattern..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton>
                  <FaSearch />
                  Search
                </SearchButton>
              </SearchInputGroup>
            </SearchForm>
          </SearchContainer>
        </SearchSection>

        <NumbersSection>
          <NumbersGrid>
            {filteredNumbers.map((number, index) => (
              <VVIPCard key={index}>
                <VVIPBadge>
                  <FaCrown />
                  {number.category}
                </VVIPBadge>
                <NumberDisplay>+91 {number.number}</NumberDisplay>
                <NumberInfo>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    opacity: 0.9,
                    marginBottom: theme.spacing.md
                  }}>
                    {number.specialty}
                  </div>
                  <NumberPrice>₹{number.price.toLocaleString('en-IN')}</NumberPrice>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    opacity: 0.7,
                    textDecoration: 'line-through'
                  }}>
                    ₹{number.originalPrice.toLocaleString('en-IN')}
                  </div>
                </NumberInfo>
                <VVIPActions>
                  <VVIPAction 
                    $variant="primary"
                    onClick={() => window.open(getWhatsAppLink(number.number, number.price), '_blank')}
                  >
                    Buy Now
                  </VVIPAction>
                  <VVIPAction $variant="secondary">
                    Details
                  </VVIPAction>
                </VVIPActions>
              </VVIPCard>
            ))}
          </NumbersGrid>
        </NumbersSection>
      </MainContent>
    </VVIPContainer>
  );
};

export default VVIPCollection;