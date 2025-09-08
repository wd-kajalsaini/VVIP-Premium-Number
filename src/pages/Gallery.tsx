import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaStar, FaFilter, FaSearch } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const GalleryContainer = styled.div`
  margin-top: 70px;
  display: flex;
  min-height: calc(100vh - 70px);
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(135deg, #20b2aa15, #48cae415);
  border-right: 2px solid #20b2aa30;
  padding: ${theme.spacing.md};
  box-shadow: 2px 0 10px rgba(32, 178, 170, 0.1);

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
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: left;
  border-bottom: 3px solid #20b2aa;
  padding-bottom: ${theme.spacing.sm};
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
  flex: 1;
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

const PriceRange = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.7;
  color: ${theme.colors.neutral.gray500};
`;

const CategoryCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing.sm};
  accent-color: #20b2aa;
  cursor: pointer;
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
  grid-template-columns: 1fr auto;
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

const NumbersSection = styled.section`
  padding: ${theme.spacing.lg};
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const NumberCard = styled.div`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.neutral.white};
  text-align: center;
  box-shadow: ${theme.shadows.md};
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
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};

    &::before {
      right: -30%;
    }
  }
`;

const NumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.sm};
  letter-spacing: 1px;
  position: relative;
  z-index: 2;
`;

const NumberInfo = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: ${theme.spacing.lg};
`;

const NumberCategory = styled.div`
  background: ${theme.colors.neutral.white}20;
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.xs};
  display: inline-block;
`;

const NumberPrice = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.sm};
`;

const NumberActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
  position: relative;
  z-index: 2;
`;

const NumberAction = styled.button<{ $variant: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'primary' 
    ? theme.colors.primary.orange 
    : theme.colors.neutral.white};
  color: ${props => props.$variant === 'primary' 
    ? theme.colors.neutral.white 
    : theme.colors.primary.skyBlue};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$variant === 'primary' 
      ? theme.colors.primary.yellow 
      : theme.colors.neutral.gray100};
    transform: translateY(-1px);
  }
`;

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const sidebarCategories = [
    {
      name: "All Numbers",
      count: "2500+",
      priceRange: "₹500 - ₹1,50,000",
      isActive: true
    },
    {
      name: "VIP Numbers",
      count: "500+",
      priceRange: "₹5,000 - ₹25,000"
    },
    {
      name: "Premium Numbers",
      count: "800+", 
      priceRange: "₹2,000 - ₹10,000"
    },
    {
      name: "Lucky Numbers",
      count: "400+",
      priceRange: "₹1,000 - ₹5,000"
    },
    {
      name: "Sequential Numbers",
      count: "200+",
      priceRange: "₹3,000 - ₹15,000"
    },
    {
      name: "Repeating Numbers", 
      count: "300+",
      priceRange: "₹2,500 - ₹20,000"
    },
    {
      name: "Mirror Numbers",
      count: "150+",
      priceRange: "₹4,000 - ₹18,000"
    },
    {
      name: "Easy to Remember",
      count: "450+",
      priceRange: "₹1,500 - ₹8,000"
    }
  ];

  const filterTags = ["VIP", "Premium", "Lucky", "Sequential", "Repeating", "Mirror"];

  const demoNumbers = [
    {
      number: '98765-43210',
      category: 'SEQUENTIAL VIP',
      price: '₹75,000'
    },
    {
      number: '99999-88888',
      category: 'SUPER VIP',
      price: '₹45,000'
    },
    {
      number: '88888-88888',
      category: 'ULTRA VIP',
      price: '₹1,25,000'
    },
    {
      number: '77777-77777',
      category: 'PLATINUM VIP',
      price: '₹95,000'
    },
    {
      number: '12345-67890',
      category: 'SEQUENTIAL',
      price: '₹35,000'
    },
    {
      number: '66666-66666',
      category: 'DIAMOND VIP',
      price: '₹65,000'
    },
    {
      number: '55555-55555',
      category: 'GOLD VIP',
      price: '₹55,000'
    },
    {
      number: '44444-44444',
      category: 'SILVER VIP',
      price: '₹35,000'
    },
    {
      number: '12321-54345',
      category: 'MIRROR',
      price: '₹25,000'
    },
    {
      number: '98787-87898',
      category: 'PATTERN',
      price: '₹18,000'
    },
    {
      number: '91111-11111',
      category: 'REPEATING',
      price: '₹42,000'
    },
    {
      number: '90000-00009',
      category: 'MIRROR VIP',
      price: '₹38,000'
    }
  ];

  const filteredNumbers = demoNumbers.filter(number => {
    const matchesSearch = number.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         number.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           number.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <GalleryContainer>
      {/* Left Sidebar */}
      <Sidebar>
        <SidebarTitle>Categories</SidebarTitle>
        <CategoryList>
          {sidebarCategories.map((category, index) => (
            <CategoryItem key={index}>
              <CategoryLink 
                $isActive={selectedCategory === (category.name.includes('All') ? 'All' : category.name)}
                onClick={() => setSelectedCategory(category.name.includes('All') ? 'All' : category.name)}
              >
                <div style={{ flex: 1 }}>
                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryCount>{category.count}</CategoryCount>
                  </CategoryInfo>
                </div>
                <CategoryCheckbox 
                  type="checkbox" 
                  checked={selectedCategory === (category.name.includes('All') ? 'All' : category.name)}
                  onChange={() => setSelectedCategory(category.name.includes('All') ? 'All' : category.name)}
                />
              </CategoryLink>
            </CategoryItem>
          ))}
        </CategoryList>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Search Section */}
        <SearchSection>
          <SearchContainer>
            <SearchTitle>Premium Numbers Gallery</SearchTitle>
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
              <FilterTags>
                {filterTags.map((tag, index) => (
                  <FilterTag 
                    key={index} 
                    $isActive={selectedCategory.toLowerCase().includes(tag.toLowerCase())}
                    onClick={() => setSelectedCategory(tag)}
                  >
                    {tag}
                  </FilterTag>
                ))}
              </FilterTags>
            </SearchForm>
          </SearchContainer>
        </SearchSection>

        {/* Numbers Grid */}
        <NumbersSection>
          <NumbersGrid>
            {filteredNumbers.map((number, index) => (
              <NumberCard key={index}>
                <NumberDisplay>+91 {number.number}</NumberDisplay>
                <NumberInfo>
                  <NumberCategory>{number.category}</NumberCategory>
                  <NumberPrice>{number.price}</NumberPrice>
                </NumberInfo>
                <NumberActions>
                  <NumberAction 
                    $variant="primary"
                    onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy +91 ${number.number} for ${number.price}`, '_blank')}
                  >
                    Buy Now
                  </NumberAction>
                  <NumberAction 
                    $variant="secondary"
                    onClick={() => alert(`Number Details:\n+91 ${number.number}\nCategory: ${number.category}\nPrice: ${number.price}\n\nCall +91 97722-97722 for more details.`)}
                  >
                    Details
                  </NumberAction>
                </NumberActions>
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
        </NumbersSection>
      </MainContent>
    </GalleryContainer>
  );
};

export default Gallery;