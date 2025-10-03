import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope, FaArrowRight, FaStar, FaShieldAlt, FaRocket } from '../utils/iconComponents';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e40af, #3b82f6, #06b6d4, #10b981);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px 0;
  color: white;
`;

const TopSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const FooterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const FooterSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 10px;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MainFooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 25px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #ff6b35, #ffd700);
      border-radius: 2px;
    }
  }
`;

const CompanySection = styled(FooterSection)`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const CompanyDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }

  svg {
    font-size: 1.1rem;
    color: #ff6b35;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 0;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);

    svg {
      transform: translateX(3px);
    }
  }

  svg {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
  }
`;

const ScrollToTopLink = styled(FooterLink)``;

const LocationCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }
`;

const LocationTitle = styled.h4`
  color: #ffd700;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const LocationAddress = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  font-size: 0.9rem;
`;

const BottomSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px 0;
  text-align: center;
`;

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BottomLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer>
      <FooterContent>
        <TopSection>
          <FooterTitle>Elite VIP Numbers</FooterTitle>
          <FooterSubtitle>
            India's Leading Premium & VIP Mobile Numbers Provider
          </FooterSubtitle>

          <StatsContainer>
            <StatCard>
              <StatIcon><FaStar /></StatIcon>
              <StatNumber>5000+</StatNumber>
              <StatLabel>Premium Numbers</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon><FaShieldAlt /></StatIcon>
              <StatNumber>100%</StatNumber>
              <StatLabel>Guaranteed Delivery</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon><FaRocket /></StatIcon>
              <StatNumber>2500+</StatNumber>
              <StatLabel>Happy Customers</StatLabel>
            </StatCard>
          </StatsContainer>
        </TopSection>

        <MainFooterContent>
          <CompanySection>
            <h3>About Elite VIP Numbers</h3>
            <CompanyDescription>
              We are India's most trusted premium and VIP mobile numbers provider,
              offering exclusive collections of lucky numbers, sequential patterns,
              and personalized digits that match your personality and bring prosperity.
            </CompanyDescription>
            <ContactItem>
              <FaWhatsapp />
              <a href="https://wa.me/917700071600" target="_blank" rel="noopener noreferrer">
                +91 97722-97722
              </a>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <a href="tel:+917700071600">+91 97722-97722</a>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <span>info@premiumnumbers.com</span>
            </ContactItem>
          </CompanySection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ScrollToTopLink to="/" onClick={scrollToTop}><FaArrowRight />Home</ScrollToTopLink>
            <ScrollToTopLink to="/gallery" onClick={scrollToTop}><FaArrowRight />Gallery</ScrollToTopLink>
            <ScrollToTopLink to="/vvip-collection" onClick={scrollToTop}><FaArrowRight />VVIP Collection</ScrollToTopLink>
            <ScrollToTopLink to="/how-it-works" onClick={scrollToTop}><FaArrowRight />How it Works</ScrollToTopLink>
            <ScrollToTopLink to="/numerology" onClick={scrollToTop}><FaArrowRight />Numerology</ScrollToTopLink>
            <ScrollToTopLink to="/contact" onClick={scrollToTop}><FaArrowRight />Contact Us</ScrollToTopLink>
          </FooterSection>


          <FooterSection>
            <h3>Our Locations</h3>
            <LocationCard>
              <LocationTitle>Elite VIP Numbers</LocationTitle>
              <LocationAddress>
                <FaMapMarkerAlt style={{ marginRight: '8px', color: '#ff6b35' }} />
                Shop 1, Akalsar Road<br />
                Moga, Punjab - 142001
              </LocationAddress>
            </LocationCard>

            <LocationCard>
              <LocationTitle>Happy Communication</LocationTitle>
              <LocationAddress>
                <FaMapMarkerAlt style={{ marginRight: '8px', color: '#ff6b35' }} />
                Booth No. 20, Main Market<br />
                Opp. Nijjer Tourist, Sunny Enclave<br />
                Kharar, Punjab - 140301
              </LocationAddress>
            </LocationCard>
          </FooterSection>
        </MainFooterContent>

        <BottomSection>
          <Copyright>
            &copy; {new Date().getFullYear()} Elite VIP Numbers. All rights reserved.
          </Copyright>
          <BottomLinks>
            <BottomLink to="/privacy" onClick={scrollToTop}>Privacy Policy</BottomLink>
            <BottomLink to="/terms" onClick={scrollToTop}>Terms & Conditions</BottomLink>
            <BottomLink to="/refund" onClick={scrollToTop}>Refund Policy</BottomLink>
            <BottomLink to="/sitemap" onClick={scrollToTop}>Sitemap</BottomLink>
          </BottomLinks>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;