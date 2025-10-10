import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { phoneNumberService, PhoneNumber } from '../services/phoneNumberService';
import { categoryService, Category } from '../services/categoryService';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: #f5f6fa;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 12px;
  padding: 24px;
  max-height: calc(100vh - 120px);
  position: sticky;
  top: 90px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 968px) {
    width: 100%;
    position: relative;
    top: 0;
    max-height: none;
  }
`;

const SidebarTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 2px solid #ff6b35;
  padding-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 107, 53, 0.6);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 107, 53, 0.8);
  }
`;

const CategoryItem = styled.li`
  margin: 0;
`;

const CategoryLink = styled.label<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props => props.$isActive ? '#ff6b35' : '#ffffff'};
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${props => props.$isActive ? 'rgba(255, 107, 53, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CategoryCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #ff6b35;
  cursor: pointer;
  flex-shrink: 0;
`;

const CategoryName = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NumberCard = styled.div`
  background: linear-gradient(135deg, #20b2aa, #48cae4);
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 8px 32px rgba(32, 178, 170, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(32, 178, 170, 0.4);
  }
`;

const NumberDisplay = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
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
  margin-bottom: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberCategory = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 12px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const NumberPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
`;

const SumTotal = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  strong {
    font-weight: 700;
  }
`;

const NumberActions = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
  z-index: 2;
  justify-content: center;
`;

const NumberAction = styled.button<{ $variant: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'primary' ? '#ff6b35' : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#20b2aa'};
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${props => props.$variant === 'primary' ? '#e55a2b' : 'white'};
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

const LoadMoreTrigger = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
`;

// Function to calculate sum total
const calculateSumTotal = (phoneNumber: string): React.ReactNode => {
  const digits = phoneNumber.replace(/\D/g, '');
  const firstSum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  const secondSum = firstSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  const thirdSum = secondSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
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

const FeaturedNumbers: React.FC = () => {
  const location = useLocation();
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sumTotalSearch, setSumTotalSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Advanced search states
  const [advancedSearch, setAdvancedSearch] = useState({
    startWith: '',
    anywhere: '',
    endWith: '',
    mustContain: '',
    notContain: '',
    total: '',
    sum: ''
  });

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoriesParam = params.get('categories');
    const sumParam = params.get('sum');
    const searchParam = params.get('search');

    // Advanced search params
    const startWith = params.get('startWith') || '';
    const anywhere = params.get('anywhere') || '';
    const endWith = params.get('endWith') || '';
    const mustContain = params.get('mustContain') || '';
    const notContain = params.get('notContain') || '';
    const total = params.get('total') || '';
    const advSum = params.get('sum') || '';

    if (categoriesParam) {
      const categoryIds = categoriesParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      setSelectedCategories(categoryIds);
      console.log('Loaded categories from URL:', categoryIds);
    }

    if (sumParam) {
      setSumTotalSearch(sumParam);
      console.log('Loaded sum search from URL:', sumParam);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
      console.log('Loaded search term from URL:', searchParam);
    }

    // Set advanced search params
    if (startWith || anywhere || endWith || mustContain || notContain || total || advSum) {
      setAdvancedSearch({
        startWith,
        anywhere,
        endWith,
        mustContain,
        notContain,
        total,
        sum: advSum
      });
      console.log('Loaded advanced search from URL:', { startWith, anywhere, endWith, mustContain, notContain, total, sum: advSum });
    }
  }, [location.search]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getActiveCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Fetch all active numbers at once (not just featured)
  const fetchNumbers = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Fetch ALL active numbers for filtering
      const allNumbers = await phoneNumberService.getActivePhoneNumbers({});

      console.log('Fetched all active numbers:', allNumbers);
      console.log('Total active numbers:', allNumbers.length);

      // Debug: Show category_id distribution
      const categoryDistribution = allNumbers.reduce((acc: any, num) => {
        const catId = num.category_id;
        const catIdType = typeof catId;
        const key = `${catId} (${catIdType})`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      console.log('Category distribution with types:', categoryDistribution);

      // Debug: Show a few examples
      console.log('Sample numbers with category 15:',
        allNumbers.filter(n => String(n.category_id) === '15').slice(0, 3)
      );

      setNumbers(allNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchNumbers();
  }, [fetchNumbers]);

  // No infinite scroll needed - all numbers loaded at once

  // Filter numbers by selected categories, search term, and sum total
  const filteredNumbers = numbers.filter(num => {
    const cleanNumber = num.number.replace(/\D/g, ''); // Remove all non-digit characters

    // Filter by category
    let matchesCategory = false;

    if (selectedCategories.length === 0) {
      // No category selected, show all
      matchesCategory = true;
    } else {
      // Category selected, check if number's category_id matches
      if (num.category_id) {
        const categoryIdStr = String(num.category_id).trim();

        // Check if category_id contains comma-separated values
        if (categoryIdStr.includes(',')) {
          // Multiple categories - split and check if any match
          const numberCategories = categoryIdStr.split(',')
            .map(id => id.trim())
            .filter(id => id.length > 0)
            .map(id => parseInt(id))
            .filter(id => !isNaN(id));

          matchesCategory = selectedCategories.some(selectedId =>
            numberCategories.includes(Number(selectedId))
          );
        } else {
          // Single category - direct match (compare as both string and number)
          const catIdNum = parseInt(categoryIdStr);
          const catIdStr = categoryIdStr;

          matchesCategory = selectedCategories.some(selectedId => {
            // Try both number and string comparison
            return Number(selectedId) === catIdNum ||
                   String(selectedId) === catIdStr;
          });
        }
      }
    }

    // Filter by search term (search in number, price, and category name)
    let categoryMatches = false;
    if (num.category_id && searchTerm) {
      const categoryIdStr = String(num.category_id).trim();
      if (categoryIdStr.includes(',')) {
        // Multiple categories
        const catIds = categoryIdStr.split(',')
          .map(id => id.trim())
          .filter(id => id.length > 0)
          .map(id => parseInt(id))
          .filter(id => !isNaN(id));

        categoryMatches = catIds.some(catId =>
          categories.find(c => c.id === catId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // Single category
        const catId = parseInt(categoryIdStr);
        categoryMatches = !isNaN(catId) && !!categories.find(c => c.id === catId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    }

    const matchesSearch = searchTerm === '' ||
      num.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cleanNumber.includes(searchTerm.replace(/\D/g, '')) ||
      num.price.toString().includes(searchTerm) ||
      categoryMatches;

    // Filter by sum total
    const matchesSumTotal = sumTotalSearch === '' || (() => {
      const sumTotal = getSumTotalString(num.number);
      return sumTotal.includes(sumTotalSearch);
    })();

    // Advanced search filters
    const matchesStartWith = !advancedSearch.startWith || cleanNumber.startsWith(advancedSearch.startWith.replace(/\D/g, ''));

    const matchesAnywhere = !advancedSearch.anywhere || cleanNumber.includes(advancedSearch.anywhere.replace(/\D/g, ''));

    const matchesEndWith = !advancedSearch.endWith || cleanNumber.endsWith(advancedSearch.endWith.replace(/\D/g, ''));

    const matchesMustContain = !advancedSearch.mustContain || (() => {
      const mustContainDigits = advancedSearch.mustContain.split(',').map(d => d.trim().replace(/\D/g, '')).filter(d => d);
      return mustContainDigits.every(digit => cleanNumber.includes(digit));
    })();

    const matchesNotContain = !advancedSearch.notContain || (() => {
      const notContainDigits = advancedSearch.notContain.split(',').map(d => d.trim().replace(/\D/g, '')).filter(d => d);
      return notContainDigits.every(digit => !cleanNumber.includes(digit));
    })();

    const matchesTotal = !advancedSearch.total || (() => {
      const digits = cleanNumber.split('');
      const total = digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
      return total.toString() === advancedSearch.total.trim();
    })();

    const matchesAdvSum = !advancedSearch.sum || (() => {
      const sumTotal = getSumTotalString(num.number);
      const parts = sumTotal.split('-');
      // Check if any part of the sum total matches
      return parts.some(part => part === advancedSearch.sum.trim());
    })();

    return matchesCategory && matchesSearch && matchesSumTotal &&
           matchesStartWith && matchesAnywhere && matchesEndWith &&
           matchesMustContain && matchesNotContain && matchesTotal && matchesAdvSum;
  });

  // Debug logging
  useEffect(() => {
    if (selectedCategories.length > 0) {
      console.log('Selected category IDs:', selectedCategories);
      console.log('Total numbers:', numbers.length);
      console.log('Filtered numbers:', filteredNumbers.length);
      console.log('Sample numbers with category_id:', numbers.slice(0, 5).map(n => ({ id: n.id, number: n.number, category_id: n.category_id })));
    }
  }, [selectedCategories, numbers, filteredNumbers.length]);

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Sidebar with dynamic categories */}
        <Sidebar>
          <div style={{ flexShrink: 0 }}>
            <SidebarTitle>Sum Total</SidebarTitle>
            <div style={{ padding: '0 0 20px' }}>
              <SearchInput
                type="text"
                placeholder="Search by sum (e.g., 20)"
                value={sumTotalSearch}
                onChange={(e) => setSumTotalSearch(e.target.value)}
              />
            </div>

            <SidebarTitle>Category</SidebarTitle>
          </div>
          <CategoryList>
            {/* All Option */}
            <CategoryItem>
              <CategoryLink $isActive={selectedCategories.length === 0}>
                <CategoryCheckbox
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={() => setSelectedCategories([])}
                />
                <CategoryName>All</CategoryName>
              </CategoryLink>
            </CategoryItem>

            {/* Dynamic Categories */}
            {categories.map((category) => (
              <CategoryItem key={category.id}>
                <CategoryLink $isActive={selectedCategories.includes(category.id)}>
                  <CategoryCheckbox
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      );
                    }}
                  />
                  <CategoryName>{category.name}</CategoryName>
                </CategoryLink>
              </CategoryItem>
            ))}
          </CategoryList>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header>
            <Title>Featured Numbers</Title>
            <Subtitle>
              Browse our collection of featured premium numbers. Scroll down to load more.
            </Subtitle>

            {/* Search Bar */}
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search by number, price, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </Header>

          {filteredNumbers.length === 0 && !loading ? (
            <EmptyState>
              {selectedCategories.length > 0 ? (
                <>
                  <p>No featured numbers found in selected categories.</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#999' }}>
                    Selected categories: {selectedCategories.map(id =>
                      categories.find(c => c.id === id)?.name || `ID ${id}`
                    ).join(', ')}
                  </p>
                  <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#999' }}>
                    Total numbers: {numbers.length}
                  </p>
                </>
              ) : searchTerm ? (
                <>
                  <p>No numbers match your search "{searchTerm}"</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#999' }}>
                    Try a different search term
                  </p>
                </>
              ) : (
                'No featured numbers available at the moment.'
              )}
            </EmptyState>
          ) : (
            <>
              <NumbersGrid>
                {filteredNumbers.map((number) => {
                  // Handle multiple categories
                  let categoryName = 'Premium';
                  if (number.category_id) {
                    const categoryIdStr = String(number.category_id);
                    if (categoryIdStr.includes(',')) {
                      // Multiple categories
                      const catIds = categoryIdStr.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
                      const catNames = catIds.map(id => categories.find(c => c.id === id)?.name).filter(Boolean);
                      categoryName = catNames.join(', ') || 'Premium';
                    } else {
                      // Single category
                      const catId = parseInt(categoryIdStr);
                      categoryName = categories.find(c => c.id === catId)?.name || 'Premium';
                    }
                  }

                  return (
                    <NumberCard key={number.id}>
                      <NumberDisplay>{number.number}</NumberDisplay>
                      <NumberInfo>
                        <NumberCategory title={categoryName}>
                          {categoryName}
                        </NumberCategory>
                        <NumberPrice>₹{number.price.toLocaleString()}</NumberPrice>
                        <SumTotal>Sum Total = {calculateSumTotal(number.number)}</SumTotal>
                      </NumberInfo>
                      <NumberActions>
                        <NumberAction
                          $variant="primary"
                          onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy ${number.number}`, '_blank')}
                        >
                          Buy Now
                        </NumberAction>
                        <NumberAction
                          $variant="secondary"
                          onClick={() => alert(`Details for ${number.number}\nCategory: ${categoryName}\nPrice: ₹${number.price.toLocaleString()}\n\nCall 97722-97722 for more details.`)}
                        >
                          Details
                        </NumberAction>
                      </NumberActions>
                    </NumberCard>
                  );
                })}
              </NumbersGrid>

              {/* All numbers loaded */}
            </>
          )}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default FeaturedNumbers;
