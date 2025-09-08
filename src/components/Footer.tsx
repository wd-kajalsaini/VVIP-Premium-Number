import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray800}, 
    ${theme.colors.neutral.gray900}
  );
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${theme.colors.neutral.white};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.lg};
    background: linear-gradient(135deg, 
      ${theme.colors.primary.green}, 
      ${theme.colors.primary.skyBlue}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.neutral.gray300};
  display: block;
  margin-bottom: ${theme.spacing.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.skyBlue};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.neutral.gray300};
  line-height: 1.6;

  svg {
    margin-top: 2px;
    color: ${theme.colors.primary.green};
  }
`;

const ShopInfo = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary.orange};

  h4 {
    color: ${theme.colors.primary.orange};
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.md};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.neutral.gray700};
  color: ${theme.colors.neutral.gray400};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Premium Numbers</h3>
          <p style={{ color: theme.colors.neutral.gray300, marginBottom: theme.spacing.md }}>
            Your trusted partner for premium and VIP mobile numbers. 
            Find the perfect number that matches your personality and brings you luck.
          </p>
          <ContactInfo>
            <FaWhatsapp />
            <div>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: theme.colors.neutral.gray300, textDecoration: 'none' }}
              >
                +91 98765 43210
              </a>
            </div>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/vvip-collection">VVIP Collection</FooterLink>
          <FooterLink to="/how-it-works">How it Works</FooterLink>
          <FooterLink to="/numerology">Numerology</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>

        <FooterSection>
          <h3>Our Locations</h3>
          
          <ShopInfo>
            <h4>Elite Vip Numbers</h4>
            <ContactInfo>
              <FaMapMarkerAlt />
              <div>
                Shop 1, Akalsar Road<br />
                Moga, Punjab - 142001
              </div>
            </ContactInfo>
          </ShopInfo>

          <ShopInfo>
            <h4>Happy Communication</h4>
            <ContactInfo>
              <FaMapMarkerAlt />
              <div>
                Booth No. 20, Main Market<br />
                Opp. Nijjer Tourist, Sunny Enclave<br />
                Kharar, Punjab - 140301
              </div>
            </ContactInfo>
          </ShopInfo>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <FaPhone />
            <div>+91 98765 43210</div>
          </ContactInfo>
          <ContactInfo>
            <FaEnvelope />
            <div>info@premiumnumbers.com</div>
          </ContactInfo>
          <ContactInfo>
            <FaWhatsapp />
            <div>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: theme.colors.neutral.gray300, textDecoration: 'none' }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.md}` }}>
          <p>&copy; {new Date().getFullYear()} Premium Numbers. All rights reserved.</p>
          <p style={{ marginTop: theme.spacing.sm, fontSize: theme.typography.fontSize.sm }}>
            Designed with ❤️ for premium number enthusiasts
          </p>
        </div>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;