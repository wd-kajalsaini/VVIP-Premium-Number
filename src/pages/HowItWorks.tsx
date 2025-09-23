import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck, FaPlay, FaChevronDown, FaChevronUp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

const PageHeader = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.md} 0;
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(32, 178, 170, 0.2);
  margin: 0 ${theme.spacing.md} ${theme.spacing.xl};
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${theme.spacing.xl} ${theme.spacing.sm} 0;
    margin: 0 ${theme.spacing.sm} ${theme.spacing.xl};
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${theme.colors.neutral.white};
  margin: 0 0 ${theme.spacing.md};
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
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

const HeaderBannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 400px;
  border-radius: 12px;
  margin-top: ${theme.spacing.lg};

  @media (max-width: 768px) {
    max-height: 300px;
    margin-top: ${theme.spacing.md};
  }
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.lg};
  position: relative;

  @media (max-width: 768px) {
    padding: ${theme.spacing.md} ${theme.spacing.md};
  }
`;

const ProcessSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  margin-bottom: ${theme.spacing['2xl']};
  padding: ${theme.spacing['2xl']};
  background: linear-gradient(135deg, #f8fffe 0%, #ffffff 100%);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(32, 178, 170, 0.12);
  align-items: flex-start;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(32, 178, 170, 0.03) 0%, transparent 70%);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
    padding: ${theme.spacing.xl};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.lg};
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.md};
    border-radius: 16px;
  }
`;

const SectionDivider = styled.div`
  height: 40px;
  position: relative;
  margin: ${theme.spacing['2xl']} 0;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #20b2aa, #48cae4);
    border-radius: 2px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 45px rgba(32, 178, 170, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(32, 178, 170, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 60px rgba(32, 178, 170, 0.25);
    border-color: rgba(32, 178, 170, 0.3);
  }

  @media (max-width: 1024px) {
    order: 2;
  }

  @media (max-width: 768px) {
    border-radius: 16px;

    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};

  @media (max-width: 1024px) {
    order: 1;
    padding: ${theme.spacing.md};
  }

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: ${theme.spacing.sm};
    padding: 0;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
  border: 1px solid rgba(32, 178, 170, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 255, 254, 0.8) 100%);
    transform: translateX(8px);
    box-shadow: 0 8px 30px rgba(32, 178, 170, 0.15);
    border-color: rgba(32, 178, 170, 0.2);

    &::before {
      transform: scaleY(1);
    }
  }

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    border-radius: 12px;

    &:hover {
      transform: translateX(4px);
    }
  }

  @media (max-width: 480px) {
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm};
    border-radius: 10px;

    &:hover {
      transform: translateX(2px);
    }
  }
`;

const StepNumber = styled.div`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff8c42 100%);
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 12px 16px;
  border-radius: 12px;
  min-width: fit-content;
  text-align: center;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 8px 12px;
    border-radius: 8px;
    letter-spacing: 0.3px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 6px 10px;
    border-radius: 6px;
    letter-spacing: 0.2px;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: #1a1a1a;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 0.5px;
    margin: 0 0 ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    letter-spacing: 0.3px;
    margin: 0 0 6px;
  }
`;

const StepDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  position: relative;
  background: ${theme.colors.neutral.white};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  display: block;
  object-fit: contain;
  background: white;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    height: 400px;
    max-height: 400px;
  }
`;

const ImageTitle = styled.div`
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 50%, #20b2aa 100%);
  color: white;
  padding: ${theme.spacing.xl} ${theme.spacing['2xl']};
  text-align: center;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 6px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    letter-spacing: 0.5px;
  }
`;

const FAQSection = styled.div`
  margin-top: ${theme.spacing.xl};

  @media (max-width: 768px) {
    margin-top: ${theme.spacing.lg};
  }
`;

const FAQContainer = styled.div`
  width: 100%;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const SectionTitle = styled.h2`
  color: #1a1a1a;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #20b2aa, #48cae4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #20b2aa, #48cae4);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SectionSubtitle = styled.p`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.md};
  margin-top: ${theme.spacing.lg};
  margin-bottom: 0;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FAQItem = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: 12px;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid rgba(32, 178, 170, 0.15);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #20b2aa;
    box-shadow: 0 8px 25px rgba(32, 178, 170, 0.15);
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  padding: 0;
  margin-bottom: ${theme.spacing.sm};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: color 0.3s ease;
  line-height: 1.4;

  &:hover {
    color: #20b2aa;
  }

  svg {
    flex-shrink: 0;
    margin-left: ${theme.spacing.sm};
    margin-top: 3px;
    color: #20b2aa;
    transition: transform 0.3s ease;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: ${theme.colors.neutral.gray600};
  line-height: 1.7;
  padding-top: ${props => props.$isOpen ? theme.spacing.sm : '0'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  font-size: 0.95rem;
`;


const PrivacySection = styled.div`
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 100%);
  padding: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['3xl']};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(32, 178, 170, 0.2);

  &::before {
    content: '🔒';
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 60px;
    opacity: 0.1;
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.xl};

    &::before {
      font-size: 40px;
      right: 20px;
    }
  }
`;

const PrivacyContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const PrivacyTitle = styled.h3`
  color: ${theme.colors.neutral.white};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PrivacyText = styled.p`
  color: ${theme.colors.neutral.white};
  line-height: 1.8;
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const HowItWorks: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const steps = [
    {
      number: "STEP 01",
      title: "SELECTION",
      description: "Send us a HI using WhatsApp on 77000 71600 to get a list of paid VIP Numbers."
    },
    {
      number: "STEP 02",
      title: "AVAILABILITY",
      description: "Confirm the availability of your NEW VIP NUMBER."
    },
    {
      number: "STEP 03",
      title: "BOOKING",
      description: "We book your choice by Advance payment only. Use PAYTM and reserve your number on 77000 71600."
    },
    {
      number: "STEP 04",
      title: "SCHEDULE",
      description: "Our team will call you & fix an appointment as per your schedule."
    },
    {
      number: "STEP 05",
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
      <PageHeader>
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '20px'}}>
            How It Works
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#FFFFFF', maxWidth: '600px', margin: '0 auto' }}>
            Get your premium mobile number in just a few simple steps. Fast, secure, and hassle-free process.
          </p>
        </div>
      </PageHeader>

      <MainContent>
        <ProcessSection>
          <ImageCard>
            <ImageTitle>✅ Complete Your Purchase</ImageTitle>
            <BannerImageWrapper>
              <BannerImage
                src="/howitworks2.jpg"
                alt="Complete Your Purchase Process"
                loading="eager"
                decoding="async"
              />
            </BannerImageWrapper>
          </ImageCard>

          <StepsContainer>
            {steps.map((step, index) => (
              <StepItem key={index}>
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </StepItem>
            ))}
          </StepsContainer>
        </ProcessSection>

        <FAQSection>
          <FAQContainer>
            <FAQHeader>
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <SectionSubtitle>Everything you need to know about getting your premium number</SectionSubtitle>
            </FAQHeader>
            <FAQGrid>
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
            </FAQGrid>
          </FAQContainer>
        </FAQSection>

        <PrivacySection>
          <PrivacyContent>
            <PrivacyTitle>Your Privacy Matters</PrivacyTitle>
            <PrivacyText>
              We do not store your credit card or other payment information. Your data is encrypted and secure. We never share your personal information with third parties.
            </PrivacyText>
          </PrivacyContent>
        </PrivacySection>
      </MainContent>
    </HowItWorksContainer>
  );
};

export default HowItWorks;