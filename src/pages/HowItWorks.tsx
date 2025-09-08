import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck, FaPlay, FaChevronDown, FaChevronUp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: ${theme.colors.neutral.gray50};
`;

const HeroSection = styled.section`
  background: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
`;

const HeroTitle = styled.h1`
  color: ${theme.colors.primary.orange};
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};
`;

const StepsSection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const StepCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral.gray200};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.lg};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary.orange};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const StepNumber = styled.div`
  background: ${theme.colors.primary.orange};
  color: ${theme.colors.neutral.white};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  min-width: 100px;
  text-align: center;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

const StepDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  line-height: 1.6;
  margin: 0;
`;

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

  const steps = [
    {
      number: "01",
      title: "SELECTION",
      description: "Send us a HI using WhatsApp on 97722-97722 to get a list of paid VIP Numbers."
    },
    {
      number: "02", 
      title: "AVAILABILITY",
      description: "Confirm the availability of your NEW VIP NUMBER."
    },
    {
      number: "03",
      title: "BOOKING", 
      description: "We book your choice by Advance payment only. Use PAYTM and reserve your number on 97722-97722."
    },
    {
      number: "04",
      title: "SCHEDULE",
      description: "Our team will call you & fix an appointment as per your schedule."
    },
    {
      number: "05",
      title: "THE DELIVERY",
      description: "Done! We are always on time."
    }
  ];

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
      <HeroSection>
        <div className="container">
          <HeroTitle>How It Works</HeroTitle>
        </div>
      </HeroSection>

      <MainContent>
        <StepsSection>
          {steps.map((step, index) => (
            <StepCard key={index}>
              <StepNumber>STEP {step.number}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </StepCard>
          ))}
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