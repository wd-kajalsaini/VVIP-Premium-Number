import React from 'react';
import styled from 'styled-components';

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
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
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
  text-align: center;
`;

const PhoneNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: 1px;
  
  .highlight {
    color: #FFD700;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SumTotal = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: 500;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 12px 24px;
  border: 2px solid #f4c430;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  
  ${props => props.$primary ? `
    background: #f4c430;
    color: #1e3a5f;
    border-color: #f4c430;
    box-shadow: 0 2px 8px rgba(244, 196, 48, 0.3);
    font-weight: 800;
    
    &:hover {
      background: #e6b61f;
      border-color: #e6b61f;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(244, 196, 48, 0.4);
    }
  ` : `
    background: white;
    color: #f4c430;
    
    &:hover {
      background: #f9f7f0;
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

// Function to calculate sum total of digits in a phone number
const calculateSumTotal = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Calculate sum of all digits (first sum)
  const firstSum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  // Calculate sum of the first sum (second sum)
  const secondSum = firstSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  // Calculate sum of the second sum (third sum)
  const thirdSum = secondSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  // Return format: "firstSum-secondSum-thirdSum"
  return `${firstSum}-${secondSum}-${thirdSum}`;
};

const VVIPCollection: React.FC = () => {
  const sampleNumbers = [
    { id: 1, number: '70390 91107', price: '₹4,080', highlights: [0, 1, 2, 3, 4] },
    { id: 2, number: '914 2222288', price: '₹37,200', highlights: [4, 5, 6, 7, 8, 9] },
    { id: 3, number: '74 7777 1665', price: '₹2,856', highlights: [3, 4, 5, 6] },
    { id: 4, number: '9162203 888', price: '₹2,991', highlights: [8, 9, 10] },
    { id: 5, number: '91329 00097', price: '₹4,760', highlights: [6, 7, 8, 9, 10] },
    { id: 6, number: '905779 1234', price: '₹6,800', highlights: [7, 8, 9, 10] },
    { id: 7, number: '98 555555 21', price: '₹1,20,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 8, number: '9876 777777', price: '₹5,40,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 9, number: '91 888888 45', price: '₹4,80,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 10, number: '8452 000000', price: '₹4,80,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 11, number: '9 510 999999', price: '₹12,00,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 12, number: '9561 444444', price: '₹3,00,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 13, number: '917 0000001', price: '₹15,60,000', highlights: [4, 5, 6, 7, 8] },
    { id: 14, number: '94 000000 36', price: '₹2,88,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 15, number: '8888 999999', price: '₹12,50,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 16, number: '999 666666 9', price: '₹7,20,000', highlights: [4, 5, 6, 7, 8, 9] },
    { id: 17, number: '80 000000 99', price: '₹8,40,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 18, number: '9999 888888', price: '₹18,00,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 19, number: '7777 333333', price: '₹4,80,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 20, number: '9123 444444', price: '₹3,60,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 21, number: '84 888888 12', price: '₹4,92,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 22, number: '9234 999999', price: '₹12,60,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 23, number: '85 222222 89', price: '₹1,80,000', highlights: [3, 4, 5, 6, 7, 8] },
    { id: 24, number: '8345 111111', price: '₹1,92,000', highlights: [5, 6, 7, 8, 9, 10] },
    { id: 25, number: '96 444444 89', price: '₹2,64,000', highlights: [3, 4, 5, 6, 7, 8] }
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

      <MainLayout>
        <ContentArea>
          <NumbersGrid>
            {sampleNumbers.map((item) => (
              <NumberCard key={item.id}>
                <PhoneNumber>{formatNumber(item.number, item.highlights)}</PhoneNumber>
                <SumTotal>Sum Total = {calculateSumTotal(item.number)}</SumTotal>
                <PriceTag>{item.price}</PriceTag>
                <ButtonRow>
                  <ActionButton 
                    $primary
                    onClick={() => window.open(`https://wa.me/919772297722?text=I'm interested in ${item.number}`, '_blank')}
                  >
                    Buy Now
                  </ActionButton>
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