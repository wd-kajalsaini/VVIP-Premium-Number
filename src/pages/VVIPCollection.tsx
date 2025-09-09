import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaSearch } from '../utils/iconComponents';

const VVIPContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: #f8f9fa;
`;

const HeroBanner = styled.section`
  height: 300px;
  background: linear-gradient(135deg, #6366f1, #4f46e5, #374151);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 30%, rgba(220, 38, 38, 0.2) 30%, rgba(220, 38, 38, 0.2) 33%, transparent 33%),
      linear-gradient(-45deg, transparent 67%, rgba(59, 130, 246, 0.2) 67%, rgba(59, 130, 246, 0.2) 70%, transparent 70%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 8px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    letter-spacing: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
`;

const VIPBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
  
  &::before {
    content: '★';
    margin-right: 8px;
    color: #fbbf24;
  }
`;

const LuxuryIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 12px;
  border-radius: 50%;
  font-size: 1.5rem;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  
  &::before {
    content: '✈';
  }
`;

const TopSection = styled.div`
  background: white;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;


const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #1f2937, #374151);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #374151, #4b5563);
    transform: translateY(-1px);
  }
`;

const SortRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 15px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const Breadcrumb = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-left: auto;
`;

const MainLayout = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
  padding: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  padding: 5px 0;
`;

const FilterTitle = styled.h3`
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 10px;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const FilterButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background: linear-gradient(135deg, #4f46e5, #4338ca);
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  &:hover {
    color: #6366f1;
  }
`;

const CategoryCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  accent-color: #6366f1;
`;

const CategoryCount = styled.span`
  color: #6b7280;
  font-size: 12px;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
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
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
    
    &::before {
      animation: shine 0.5s ease-in-out;
    }
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const PriceTag = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PhoneNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  
  .highlight {
    color: #f97316;
  }
`;

const SumTotal = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 15px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #6366f1;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border-color: #6366f1;
    
    &:hover {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      border-color: #4f46e5;
    }
  ` : `
    background: white;
    color: #6366f1;
    
    &:hover {
      background: #f1f5f9;
    }
  `}
`;


const OwnerTag = styled.div`
  position: absolute;
  top: -5px;
  right: 50px;
  background: #3b82f6;
  color: white;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  transform: rotate(15deg);
`;

const VVIPCollection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Sort By');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sumTotal, setSumTotal] = useState('');

  const categories = [
    { name: 'Numerology Without 2 4 8', count: '14178' },
    { name: 'PENTA NUMBERS', count: '325' },
    { name: 'HEXA NUMBER', count: '427' },
    { name: 'SEPTA (9XY AAA AAA A)', count: '108' },
    { name: 'OCTA NUMBERS', count: '13' },
    { name: 'ENDING AAAA NUMBERS', count: '1078' },
    { name: 'AB AB (XXXXXX 1212)', count: '1212' }
  ];

  const sampleNumbers = [
    { id: 1, number: '70390 91107', price: '₹4080', highlights: [0, 1, 2, 3, 4] },
    { id: 2, number: '914 2222288', price: '₹37200', highlights: [4, 5, 6, 7, 8, 9] },
    { id: 3, number: '74 7777 1665', price: '₹2856', highlights: [3, 4, 5, 6] },
    { id: 4, number: '9162203 888', price: '₹2991', highlights: [8, 9, 10] },
    { id: 5, number: '91329 00097', price: '₹4760', highlights: [6, 7, 8, 9, 10] },
    { id: 6, number: '905779 1234', price: '₹6800', highlights: [7, 8, 9, 10] }
  ];

  const formatNumber = (number: string, highlights: number[]) => {
    return number.split('').map((char, index) => (
      <span key={index} className={highlights.includes(index) ? 'highlight' : ''}>
        {char}
      </span>
    ));
  };


  return (
    <VVIPContainer>
      <HeroBanner>
        <VIPBadge>EXCLUSIVE VIP</VIPBadge>
        <LuxuryIcon />
        <HeroContent>
          <HeroTitle>VIP NUMBERS</HeroTitle>
          <HeroSubtitle>Premium • Exclusive • Prestigious</HeroSubtitle>
        </HeroContent>
      </HeroBanner>
      
      <TopSection>
        <SearchRow>
          <SearchInput
            type="text"
            placeholder="Search Your Choice Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton>
            <FaSearch style={{ marginRight: '5px' }} />
            SEARCH
          </SearchButton>
        </SearchRow>
        
        <SortRow>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Sort By ▼</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Latest First</option>
          </SortSelect>
          <SortSelect>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </SortSelect>
          <SortSelect>
            <option>Price High to Low</option>
            <option>Price Low to High</option>
          </SortSelect>
          <Breadcrumb>HOME / VIP NUMBER</Breadcrumb>
        </SortRow>
      </TopSection>

      <MainLayout>
        <Sidebar>
          <FilterSection>
            <FilterHeader>
              <FilterTitle>SUM TOTAL</FilterTitle>
              <FaChevronDown />
            </FilterHeader>
            <FilterInput
              type="text"
              placeholder="Enter Number Like 12 or 3"
              value={sumTotal}
              onChange={(e) => setSumTotal(e.target.value)}
            />
          </FilterSection>

          <FilterSection>
            <FilterHeader>
              <FilterTitle>PRICE</FilterTitle>
              <FaChevronDown />
            </FilterHeader>
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6b7280' }}>
              Minimum Price
            </div>
            <PriceInput
              type="text"
              placeholder="Minimum Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6b7280', marginTop: '10px' }}>
              Maximum Price
            </div>
            <PriceInput
              type="text"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <FilterButton>Filter</FilterButton>
          </FilterSection>

          <FilterSection>
            <FilterHeader>
              <FilterTitle>CATEGORY</FilterTitle>
              <FaChevronDown />
            </FilterHeader>
            <CategoryList>
              {categories.map((category, index) => (
                <CategoryItem key={index}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryCheckbox />
                    {category.name}
                  </div>
                  <CategoryCount>{category.count}</CategoryCount>
                </CategoryItem>
              ))}
            </CategoryList>
          </FilterSection>
        </Sidebar>

        <ContentArea>
          <NumbersGrid>
            {sampleNumbers.map((item) => (
              <NumberCard key={item.id}>
                <PhoneNumber>{formatNumber(item.number, item.highlights)}</PhoneNumber>
                <PriceTag>{item.price}</PriceTag>
                <ButtonRow>
                  <ActionButton>Details</ActionButton>
                  <ActionButton $primary>Buy Now</ActionButton>
                </ButtonRow>
              </NumberCard>
            ))}
          </NumbersGrid>
        </ContentArea>
      </MainLayout>
    </VVIPContainer>
  );
};

export default VVIPCollection;