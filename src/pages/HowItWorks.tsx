import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck, FaPlay, FaChevronDown, FaChevronUp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #87CEEB 0%, 
    #87CEFA 25%, 
    #20B2AA 70%, 
    #32CD32 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(135, 206, 235, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 75% 75%, rgba(135, 206, 250, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 50% 10%, rgba(32, 178, 170, 0.1) 0%, transparent 50%);
    z-index: 0;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.xl};
  background: transparent;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.white};
  margin: 0 0 ${theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const PageSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.neutral.white};
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.md};
    padding: 0 ${theme.spacing.md};
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md} ${theme.spacing['2xl']};
  position: relative;
  z-index: 1;
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const BannerImageWrapper = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid ${theme.colors.neutral.gray200};
  
  @media (max-width: 768px) {
    border-radius: ${theme.borderRadius.md};
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`;

const FAQCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral.gray200};
  padding: ${theme.spacing.xl};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.primary.green};
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
    color: ${theme.colors.primary.green};
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
      <PageHeader>
        <PageTitle>How It Works</PageTitle>
        <PageSubtitle>
          Get your premium mobile number in just 5 simple steps. Fast, secure, and hassle-free process.
        </PageSubtitle>
      </PageHeader>
      
      <MainContent>
        <MainLayout>
          <LeftPanel>
            <BannerImageWrapper>
              <BannerImage 
                src="/howItWorks.jpg" 
                alt="How It Works - 5 Step Process: 1. Selection, 2. Availability, 3. Booking, 4. Schedule, 5. Delivery"
                loading="eager"
                decoding="async"
              />
            </BannerImageWrapper>
          </LeftPanel>

          <RightPanel>
            <FAQCard>
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
            </FAQCard>
          </RightPanel>
        </MainLayout>

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