import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck, FaPlay, FaChevronDown, FaChevronUp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: ${theme.colors.neutral.gray50};
`;

// Hero section removed - showing image directly

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md} ${theme.spacing['2xl']};
`;

const StepsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
`;

const StepsImageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 0;
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    border-radius: ${theme.borderRadius.md};
    &:hover {
      transform: none;
    }
  }
`;

const StepsImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
`;

// Step components removed as we're using an image instead

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FAQSection = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral.gray200};
  padding: ${theme.spacing.xl};
`;

const VideoSection = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral.gray200};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.primary.orange};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
`;

const FAQItem = styled.div`
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray800};
  padding: ${theme.spacing.sm} 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: ${theme.colors.primary.orange};
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: ${theme.colors.neutral.gray600};
  line-height: 1.6;
  padding-top: ${props => props.$isOpen ? theme.spacing.sm : '0'};
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, ${theme.colors.neutral.gray200}, ${theme.colors.neutral.gray100});
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  border: 2px dashed ${theme.colors.neutral.gray400};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primary.orange}10, ${theme.colors.primary.yellow}10);
    border-color: ${theme.colors.primary.orange};
  }
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.colors.primary.orange};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.white};
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${theme.colors.primary.yellow};
  }
`;

const PrivacySection = styled.div`
  background: ${theme.colors.neutral.gray100};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.neutral.gray200};
`;

const PrivacyTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
`;

const PrivacyText = styled.p`
  color: ${theme.colors.neutral.gray600};
  line-height: 1.6;
  margin: 0;
`;

const HowItWorks: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Steps data removed as we're using an image instead

  const faqs = [
    {
      question: "Does the number I purchase belong to me?",
      answer: "Yes, once you complete the purchase and documentation process, the number legally belongs to you with full ownership rights."
    },
    {
      question: "Are these numbers currently under contract?",
      answer: "All our premium numbers are available for immediate purchase and are not under any existing contracts."
    },
    {
      question: "What is number porting?",
      answer: "Number porting allows you to keep your existing number while switching to a different network provider. We provide full assistance with the porting process."
    },
    {
      question: "What kind of guarantee do you offer?",
      answer: "We offer a 100% guarantee on number delivery and activation. If we cannot deliver your purchased number, we provide a full refund."
    },
    {
      question: "What is UPC (Unique Porting Code) for MNP Process?",
      answer: "UPC is a unique code required for Mobile Number Portability. We handle all UPC related processes for seamless number transfer."
    },
    {
      question: "What does RTP (Ready To Port) mean?",
      answer: "RTP numbers are unique and easy-to-remember numbers that are readily available for transfer by changing the network or circle."
    },
    {
      question: "Can there be a transfer of ownership of the SIM card?",
      answer: "Yes, we provide complete assistance with ownership transfer including all necessary documentation and legal processes."
    },
    {
      question: "What documents are needed to buy a SIM card?",
      answer: "You need valid government ID proof (Aadhar, PAN, Passport, or Driving License) and address proof for SIM card purchase and activation."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <HowItWorksContainer>
      <MainContent>
        <StepsSection>
          <StepsImageWrapper>
            <StepsImage 
              src="/howItWorks.jpg" 
              alt="How It Works - 5 Step Process: 1. Selection, 2. Availability, 3. Booking, 4. Schedule, 5. Delivery"
              loading="eager"
              decoding="async"
            />
          </StepsImageWrapper>
        </StepsSection>

        <BottomSection>
          <FAQSection>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </FAQQuestion>
                <FAQAnswer $isOpen={openFAQ === index}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQSection>

          <VideoSection>
            <SectionTitle>Watch How It Works</SectionTitle>
            <VideoPlaceholder>
              <PlayButton>
                <FaPlay />
              </PlayButton>
              <p style={{ 
                color: theme.colors.neutral.gray600, 
                textAlign: 'center',
                margin: 0
              }}>
                Click to watch our process video
              </p>
            </VideoPlaceholder>
          </VideoSection>
        </BottomSection>

        <PrivacySection>
          <PrivacyTitle>Privacy</PrivacyTitle>
          <PrivacyText>
            We do not store your credit card or other payment information. And we do not share your information with anyone else.
          </PrivacyText>
        </PrivacySection>
      </MainContent>
    </HowItWorksContainer>
  );
};

export default HowItWorks;