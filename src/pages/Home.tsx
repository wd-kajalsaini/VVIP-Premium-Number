import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaShieldAlt, FaRocket, FaPhoneAlt, FaCrown, FaMagic } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HomeContainer = styled.div`
  margin-top: 70px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}10, 
    ${theme.colors.primary.skyBlue}10, 
    ${theme.colors.primary.orange}10, 
    ${theme.colors.primary.yellow}10
  );
  padding: ${theme.spacing['3xl']} 0;
  text-align: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, 
      ${theme.colors.primary.skyBlue}05 0%, 
      transparent 70%
    );
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.orange}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.neutral.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Link)<{ $variant: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary' 
    ? `
      background: linear-gradient(135deg, 
        ${theme.colors.primary.green}, 
        ${theme.colors.primary.skyBlue}
      );
      color: ${theme.colors.neutral.white};
      box-shadow: ${theme.shadows.md};

      &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.xl};
      }
    `
    : `
      background: ${theme.colors.neutral.white};
      color: ${theme.colors.primary.skyBlue};
      border: 2px solid ${theme.colors.primary.skyBlue};
      box-shadow: ${theme.shadows.sm};

      &:hover {
        background: ${theme.colors.primary.skyBlue};
        color: ${theme.colors.neutral.white};
        transform: translateY(-3px);
      }
    `
  }

  @media (max-width: 768px) {
    width: 280px;
    justify-content: center;
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.neutral.gray200};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.skyBlue};
  }
`;

const FeatureIcon = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color}20;
  border-radius: ${theme.borderRadius.full};
  color: ${props => props.$color};
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.neutral.gray800};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
`;

const ShowcaseSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray100}, 
    ${theme.colors.neutral.white}
  );
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const ShowcaseCard = styled(Link)`
  display: block;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.orange};
  }
`;

const ShowcaseIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.neutral.white};
  font-size: 1.5rem;
`;

const ShowcaseTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.sm};
`;

const ShowcaseDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const ShowcaseAction = styled.span`
  color: ${theme.colors.primary.orange};
  font-weight: ${theme.typography.fontWeight.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Home: React.FC = () => {
  const features = [
    {
      icon: <FaStar />,
      title: "Premium Quality",
      description: "Handpicked premium numbers with unique patterns and combinations that stand out.",
      color: theme.colors.primary.green
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Authentic",
      description: "All numbers are verified and authentic, ensuring you get exactly what you pay for.",
      color: theme.colors.primary.skyBlue
    },
    {
      icon: <FaRocket />,
      title: "Instant Activation",
      description: "Quick and hassle-free activation process. Get your premium number activated within hours.",
      color: theme.colors.primary.orange
    }
  ];

  const showcaseItems = [
    {
      icon: <FaPhoneAlt />,
      title: "Premium Gallery",
      description: "Browse through our extensive collection of premium numbers with special patterns and combinations.",
      link: "/gallery",
      color: theme.colors.primary.green
    },
    {
      icon: <FaCrown />,
      title: "VVIP Collection",
      description: "Exclusive VVIP numbers for those who want the absolute best and most unique combinations.",
      link: "/vvip-collection",
      color: theme.colors.primary.orange
    },
    {
      icon: <FaMagic />,
      title: "Numerology Check",
      description: "Find numbers that align with your personality and bring you luck based on numerology.",
      link: "/numerology",
      color: theme.colors.primary.skyBlue
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Perfect Premium Number</HeroTitle>
          <HeroSubtitle>
            Discover exclusive premium and VIP mobile numbers that match your personality, 
            bring you luck, and make a lasting impression.
          </HeroSubtitle>
          
          <CTAButtons>
            <CTAButton to="/gallery" $variant="primary">
              <FaSearch />
              Browse Gallery
            </CTAButton>
            <CTAButton to="/vvip-collection" $variant="secondary">
              <FaCrown />
              VVIP Collection
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionTitle>Why Choose Premium Numbers?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon $color={feature.color}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <ShowcaseSection>
        <div className="container">
          <SectionTitle>Explore Our Collections</SectionTitle>
          <ShowcaseGrid>
            {showcaseItems.map((item, index) => (
              <ShowcaseCard key={index} to={item.link}>
                <ShowcaseIcon $color={item.color}>
                  {item.icon}
                </ShowcaseIcon>
                <ShowcaseTitle>{item.title}</ShowcaseTitle>
                <ShowcaseDescription>{item.description}</ShowcaseDescription>
                <ShowcaseAction>
                  Explore Now →
                </ShowcaseAction>
              </ShowcaseCard>
            ))}
          </ShowcaseGrid>
        </div>
      </ShowcaseSection>
    </HomeContainer>
  );
};

export default Home;