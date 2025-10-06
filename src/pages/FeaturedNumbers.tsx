import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
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
  height: fit-content;
  position: sticky;
  top: 90px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    width: 100%;
    position: relative;
    top: 0;
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

const FeaturedNumbers: React.FC = () => {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 20;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getActiveCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Fetch featured numbers
  const fetchNumbers = useCallback(async (pageNum: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const offset = pageNum * ITEMS_PER_PAGE;
      const newNumbers = await phoneNumberService.getFeaturedNumbersPaginated(offset, ITEMS_PER_PAGE);

      if (newNumbers.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      if (pageNum === 0) {
        setNumbers(newNumbers);
      } else {
        setNumbers(prev => [...prev, ...newNumbers]);
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchNumbers(0);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage(prev => {
            const nextPage = prev + 1;
            fetchNumbers(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading, fetchNumbers]);

  // Filter numbers by selected categories and search term
  const filteredNumbers = numbers.filter(num => {
    // Filter by category
    const matchesCategory = selectedCategories.length === 0 ||
      (num.category_id && selectedCategories.includes(num.category_id));

    // Filter by search term (search in number, price, and category name)
    const matchesSearch = searchTerm === '' ||
      num.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      num.price.toString().includes(searchTerm) ||
      categories.find(c => c.id === num.category_id)?.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Sidebar with dynamic categories */}
        <Sidebar>
          <SidebarTitle>Category</SidebarTitle>
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
              Browse our collection of premium featured phone numbers. Scroll down to load more.
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
              {selectedCategories.length > 0
                ? 'No featured numbers found in selected categories.'
                : 'No featured numbers available at the moment.'}
            </EmptyState>
          ) : (
            <>
              <NumbersGrid>
                {filteredNumbers.map((number) => {
                  const categoryName = categories.find(c => c.id === number.category_id)?.name || 'Featured';

                  return (
                    <NumberCard key={number.id}>
                      <NumberDisplay>+91 {number.number}</NumberDisplay>
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
                          onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy +91 ${number.number}`, '_blank')}
                        >
                          Buy Now
                        </NumberAction>
                        <NumberAction
                          $variant="secondary"
                          onClick={() => alert(`Details for +91 ${number.number}\nCategory: ${categoryName}\nPrice: ₹${number.price.toLocaleString()}\n\nCall +91 97722-97722 for more details.`)}
                        >
                          Details
                        </NumberAction>
                      </NumberActions>
                    </NumberCard>
                  );
                })}
              </NumbersGrid>

              {/* Infinite scroll trigger */}
              {hasMore && selectedCategories.length === 0 && (
                <LoadMoreTrigger ref={loaderRef}>
                  {loading ? 'Loading more numbers...' : 'Scroll for more'}
                </LoadMoreTrigger>
              )}
            </>
          )}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default FeaturedNumbers;
