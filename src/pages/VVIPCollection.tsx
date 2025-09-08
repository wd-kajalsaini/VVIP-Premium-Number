import React from 'react';
import styled from 'styled-components';
import { FaCrown, FaStar, FaGem, FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const VVIPContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}20, 
    ${theme.colors.primary.yellow}20,
    ${theme.colors.primary.orange}15
  );
  padding: ${theme.spacing['2xl']} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E") repeat;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow},
    ${theme.colors.primary.orange}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const CrownIcon = styled(FaCrown)`
  color: ${theme.colors.primary.orange};
  filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3));
`;

const ExclusiveSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const VVIPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const VVIPCard = styled.div`
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.white}, 
    ${theme.colors.neutral.gray100}
  );
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;
  transition: all 0.4s ease;
  border: 3px solid transparent;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.orange}, 
      ${theme.colors.primary.yellow}, 
      ${theme.colors.primary.orange}
    );
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: ${theme.shadows.xl}, 0 20px 40px rgba(249, 115, 22, 0.2);
    border-color: ${theme.colors.primary.orange};
  }
`;

const VVIPHeader = styled.div`
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  color: ${theme.colors.neutral.white};
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid ${theme.colors.primary.orange};
  }
`;

const VVIPBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

const NumberDisplay = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: 3px;
  margin: ${theme.spacing.sm} 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SpecialtyTag = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  background: rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  display: inline-block;
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
  const vvipNumbers = [
    {
      number: '+91 99999 99999',
      specialty: 'Ultimate Nine Pattern',
      category: 'Ultra Premium',
      features: [
        'Most auspicious number in numerology',
        'Perfect for business leaders',
        'Brings maximum prosperity',
        'Extremely rare and exclusive',
        'Lifetime prestige symbol'
      ],
      price: 500000,
      originalPrice: 650000,
      savings: 150000
    },
    {
      number: '+91 88888 88888',
      specialty: 'Infinity Power Pattern',
      category: 'Diamond Elite',
      features: [
        'Symbol of infinity and abundance',
        'Lucky number in Chinese culture',
        'Perfect for wealth creation',
        'Double prosperity pattern',
        'Celebrity favorite choice'
      ],
      price: 450000,
      originalPrice: 575000,
      savings: 125000
    },
    {
      number: '+91 77777 77777',
      specialty: 'Seven Chakra Alignment',
      category: 'Spiritual Premium',
      features: [
        'Spiritual enlightenment number',
        'Perfect for healers and coaches',
        'Brings inner wisdom',
        'Mystical and powerful',
        'Attracts positive energy'
      ],
      price: 350000,
      originalPrice: 425000,
      savings: 75000
    },
    {
      number: '+91 11111 11111',
      specialty: 'Master Manifestation',
      category: 'Manifestor Elite',
      features: [
        'Master number for manifestation',
        'Perfect for entrepreneurs',
        'Leadership and innovation',
        'Attracts opportunities',
        'Gateway to success'
      ],
      price: 300000,
      originalPrice: 375000,
      savings: 75000
    },
    {
      number: '+91 12345 67890',
      specialty: 'Perfect Sequential Flow',
      category: 'Mathematical Elite',
      features: [
        'Complete numerical sequence',
        'Perfect mathematical harmony',
        'Easy to remember and dial',
        'Represents progress and growth',
        'Unique conversation starter'
      ],
      price: 275000,
      originalPrice: 325000,
      savings: 50000
    },
    {
      number: '+91 98765 43210',
      specialty: 'Reverse Sequential Power',
      category: 'Countdown Elite',
      features: [
        'Descending numerical sequence',
        'Represents mastery and completion',
        'Perfect for achievers',
        'Countdown to success pattern',
        'Memorable and prestigious'
      ],
      price: 250000,
      originalPrice: 300000,
      savings: 50000
    }
  ];

  const exclusiveFeatures = [
    {
      icon: <FaCrown />,
      title: "Lifetime Exclusivity",
      description: "Once sold, these numbers will never be available again"
    },
    {
      icon: <FaGem />,
      title: "Authenticated Certificate",
      description: "Official certificate of authenticity with each purchase"
    },
    {
      icon: <FaGem />,
      title: "VIP Customer Support",
      description: "Dedicated premium support for all VVIP customers"
    },
    {
      icon: <FaStar />,
      title: "Immediate Activation",
      description: "Priority activation within 2 hours of payment"
    }
  ];

  const getWhatsAppLink = (number: string, price: number) => {
    const message = `Hi! I'm interested in the VVIP number ${number} for ₹${price.toLocaleString('en-IN')}. This is truly exclusive! Please provide complete details and payment process.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  return (
    <VVIPContainer>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <HeroTitle>
              <CrownIcon />
              VVIP Exclusive Collection
              <CrownIcon />
            </HeroTitle>
            <p style={{ 
              color: theme.colors.neutral.gray600, 
              fontSize: theme.typography.fontSize.lg,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Ultra-premium numbers for those who demand absolute exclusivity. 
              These rare gems are available for a limited time only.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      <ExclusiveSection>
        <div className="container">
          <SectionTitle>Ultra-Exclusive Numbers</SectionTitle>
          <VVIPGrid>
            {vvipNumbers.map((number, index) => (
              <VVIPCard key={index}>
                <VVIPHeader>
                  <VVIPBadge>
                    <FaCrown />
                    {number.category}
                  </VVIPBadge>
                  <NumberDisplay>{number.number}</NumberDisplay>
                  <SpecialtyTag>{number.specialty}</SpecialtyTag>
                </VVIPHeader>

                <VVIPBody>
                  <FeaturesList>
                    {number.features.map((feature, idx) => (
                      <FeatureItem key={idx}>
                        <FaStar />
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeaturesList>

                  <PriceSection>
                    <Price>₹{number.price.toLocaleString('en-IN')}</Price>
                    <OriginalPrice>₹{number.originalPrice.toLocaleString('en-IN')}</OriginalPrice>
                    <SavingsTag>Save ₹{number.savings.toLocaleString('en-IN')}</SavingsTag>
                  </PriceSection>

                  <CTAButton
                    href={getWhatsAppLink(number.number, number.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp />
                    Reserve This Exclusive Number
                  </CTAButton>
                </VVIPBody>
              </VVIPCard>
            ))}
          </VVIPGrid>
        </div>
      </ExclusiveSection>

      <ExclusiveFeatures>
        <div className="container">
          <SectionTitle>VVIP Exclusive Benefits</SectionTitle>
          <FeaturesGrid>
            {exclusiveFeatures.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <h3 style={{ marginBottom: theme.spacing.sm, color: theme.colors.neutral.gray800 }}>
                  {feature.title}
                </h3>
                <p style={{ color: theme.colors.neutral.gray600 }}>
                  {feature.description}
                </p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </ExclusiveFeatures>
    </VVIPContainer>
  );
};

export default VVIPCollection;