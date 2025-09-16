import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHandshake, FaCreditCard, FaPhoneAlt, FaCheckCircle, FaUserCheck, FaPlay, FaChevronDown, FaChevronUp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const HowItWorksContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(32, 178, 170, 0.03) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.03) 0%, transparent 70%);
    animation: float 25s ease-in-out infinite reverse;
    z-index: 0;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
`;

const PageHeader = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} 0 ${theme.spacing['2xl']};
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 100%);
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(32, 178, 170, 0.2);
  margin-bottom: ${theme.spacing['3xl']};

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 30px solid #48cae4;
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

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`;

const ImagesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
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
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
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
  min-height: 300px;
  padding: ${theme.spacing.md};

  @media (max-width: 768px) {
    min-height: 250px;
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

  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

const ImageTitle = styled.div`
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 100%);
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 12px 12px 0 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const FAQSection = styled.div`
  margin-top: ${theme.spacing['2xl']};
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
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #20b2aa, #48cae4);
    border-radius: 2px;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FAQItem = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: 15px;
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.neutral.gray200};
  transition: all 0.3s ease;

  &:hover {
    border-color: #20b2aa;
    box-shadow: 0 10px 30px rgba(32, 178, 170, 0.1);
    transform: translateY(-5px);
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
        <ImagesSection>
          <ImageCard>
            <ImageTitle>📋 Step by Step Process</ImageTitle>
            <BannerImageWrapper>
              <BannerImage
                src="/howItWorks.jpg"
                alt="How It Works - 5 Step Process"
                loading="eager"
                decoding="async"
              />
            </BannerImageWrapper>
          </ImageCard>
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
        </ImagesSection>

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