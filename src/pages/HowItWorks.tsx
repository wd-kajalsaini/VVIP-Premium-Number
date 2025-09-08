import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}15, 
    ${theme.colors.primary.green}15
  );
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const StepsSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const StepsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const StepsTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50px;
    top: 80px;
    bottom: 80px;
    width: 4px;
    background: linear-gradient(to bottom, 
      ${theme.colors.primary.skyBlue}, 
      ${theme.colors.primary.green}
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    &::before {
      left: 30px;
    }
  }
`;

const StepCard = styled.div<{ $index: number }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  border: 2px solid ${theme.colors.neutral.gray200};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateX(10px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${props => 
      props.$index % 2 === 0 
        ? theme.colors.primary.skyBlue 
        : theme.colors.primary.green
    };
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.md};

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const StepNumber = styled.div<{ $index: number }>`
  position: absolute;
  left: -70px;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  background: ${props => 
    props.$index % 2 === 0 
      ? `linear-gradient(135deg, ${theme.colors.primary.skyBlue}, ${theme.colors.primary.green})`
      : `linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.orange})`
  };
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.white};
  font-size: 2rem;
  font-weight: ${theme.typography.fontWeight.bold};
  box-shadow: ${theme.shadows.lg};
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
    margin: 0 auto;
  }
`;

const StepContent = styled.div`
  flex: 1;
  margin-left: 50px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StepTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.xl};
`;

const StepDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`;

const StepFeatures = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StepFeature = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.neutral.gray600};
  margin-bottom: ${theme.spacing.xs};

  svg {
    color: ${theme.colors.primary.green};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const ProcessOverview = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray100}, 
    ${theme.colors.neutral.white}
  );
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const OverviewCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const OverviewIcon = styled.div<{ $color: string }>`
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

const OverviewTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.sm};
`;

const OverviewDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
`;

const CTASection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  color: ${theme.colors.neutral.white};
  text-align: center;
`;

const CTATitle = styled.h2`
  color: ${theme.colors.neutral.white};
  margin-bottom: ${theme.spacing.md};
`;

const CTADescription = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled.a<{ $variant: 'primary' | 'secondary' }>`
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
      background: ${theme.colors.neutral.white};
      color: ${theme.colors.primary.skyBlue};

      &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.xl};
      }
    `
    : `
      background: transparent;
      color: ${theme.colors.neutral.white};
      border: 2px solid ${theme.colors.neutral.white};

      &:hover {
        background: ${theme.colors.neutral.white};
        color: ${theme.colors.primary.skyBlue};
        transform: translateY(-3px);
      }
    `
  }

  @media (max-width: 768px) {
    width: 280px;
    justify-content: center;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse & Search",
      description: "Explore our extensive collection of premium numbers. Use filters to find numbers that match your preferences, budget, and numerological requirements.",
      features: [
        "Search by pattern, digits, or price range",
        "Filter by category (VIP, Premium, Lucky)",
        "Check numerological significance",
        "View detailed number information"
      ]
    },
    {
      icon: <FaHandshake />,
      title: "Select & Inquire",
      description: "Found the perfect number? Contact us directly through WhatsApp to discuss availability, pricing, and special offers.",
      features: [
        "Direct WhatsApp consultation",
        "Personalized recommendations",
        "Special discount negotiations",
        "Instant availability confirmation"
      ]
    },
    {
      icon: <FaCreditCard />,
      title: "Secure Payment",
      description: "Complete your purchase through secure payment methods. We accept various payment options for your convenience.",
      features: [
        "Multiple payment options available",
        "Secure transaction processing",
        "Instant payment confirmation",
        "Digital receipt and documentation"
      ]
    },
    {
      icon: <FaUserCheck />,
      title: "Documentation & Verification",
      description: "Provide necessary documents for number registration and complete the verification process quickly and securely.",
      features: [
        "Simple document submission",
        "Quick verification process",
        "Secure data handling",
        "Progress tracking updates"
      ]
    },
    {
      icon: <FaPhoneAlt />,
      title: "Activation & Delivery",
      description: "Your premium number gets activated and delivered to your location. Start using your new prestigious number immediately!",
      features: [
        "Priority activation service",
        "Home/office delivery option",
        "Immediate number portability",
        "24/7 activation support"
      ]
    },
    {
      icon: <FaCheckCircle />,
      title: "Ongoing Support",
      description: "Enjoy premium customer support for any queries or assistance needed with your new number.",
      features: [
        "Dedicated customer support",
        "Technical assistance",
        "Number portability help",
        "Lifetime support guarantee"
      ]
    }
  ];

  const processOverview = [
    {
      icon: <FaSearch />,
      title: "Easy Discovery",
      description: "Find your perfect number in minutes with our advanced search and filtering system",
      color: theme.colors.primary.skyBlue
    },
    {
      icon: <FaHandshake />,
      title: "Personal Service",
      description: "Get personalized assistance from our experts throughout the entire process",
      color: theme.colors.primary.green
    },
    {
      icon: <FaCheckCircle />,
      title: "Quick Activation",
      description: "Fast and secure activation with priority processing for premium customers",
      color: theme.colors.primary.orange
    }
  ];

  return (
    <HowItWorksContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle>How It Works</HeroTitle>
          <p style={{ 
            color: theme.colors.neutral.gray600, 
            fontSize: theme.typography.fontSize.lg,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Getting your perfect premium number is simple and straightforward. 
            Follow our 6-step process to own your dream number today!
          </p>
        </div>
      </HeroSection>

      <ProcessOverview>
        <div className="container">
          <SectionTitle>Why Choose Our Process?</SectionTitle>
          <OverviewGrid>
            {processOverview.map((item, index) => (
              <OverviewCard key={index}>
                <OverviewIcon $color={item.color}>
                  {item.icon}
                </OverviewIcon>
                <OverviewTitle>{item.title}</OverviewTitle>
                <OverviewDescription>{item.description}</OverviewDescription>
              </OverviewCard>
            ))}
          </OverviewGrid>
        </div>
      </ProcessOverview>

      <StepsSection>
        <StepsContainer>
          <SectionTitle>Step-by-Step Process</SectionTitle>
          <StepsTimeline>
            {steps.map((step, index) => (
              <StepCard key={index} $index={index}>
                <StepNumber $index={index}>
                  {index + 1}
                </StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                  <StepFeatures>
                    {step.features.map((feature, idx) => (
                      <StepFeature key={idx}>
                        <FaCheckCircle />
                        {feature}
                      </StepFeature>
                    ))}
                  </StepFeatures>
                </StepContent>
              </StepCard>
            ))}
          </StepsTimeline>
        </StepsContainer>
      </StepsSection>

      <CTASection>
        <div className="container">
          <CTATitle>Ready to Get Your Premium Number?</CTATitle>
          <CTADescription>
            Start your journey to owning a prestigious mobile number today. 
            Our team is ready to help you find the perfect match!
          </CTADescription>
          <CTAButtons>
            <CTAButton href="/gallery" $variant="primary">
              <FaSearch />
              Browse Numbers
            </CTAButton>
            <CTAButton 
              href="https://wa.me/919876543210?text=Hi! I want to know more about your premium numbers process." 
              target="_blank" 
              rel="noopener noreferrer"
              $variant="secondary"
            >
              <FaHandshake />
              Get Personal Consultation
            </CTAButton>
          </CTAButtons>
        </div>
      </CTASection>
    </HowItWorksContainer>
  );
};

export default HowItWorks;