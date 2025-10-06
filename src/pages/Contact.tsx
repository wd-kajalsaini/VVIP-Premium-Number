import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaStore } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const ContactContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}15, 
    ${theme.colors.primary.skyBlue}15
  );
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const ContactSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
    padding: 0 ${theme.spacing.sm};
  }
`;

const ContactForm = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['2xl']};
  border: 2px solid ${theme.colors.neutral.gray200};
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${theme.spacing.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg,
      ${theme.colors.primary.green},
      ${theme.colors.primary.skyBlue}
    );
    border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.xs};
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
    box-shadow: 0 0 0 3px ${theme.colors.primary.skyBlue}20;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
    box-shadow: 0 0 0 3px ${theme.colors.primary.skyBlue}20;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  color: ${theme.colors.neutral.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InfoTitle = styled.h2`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const ShopCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  border-left: 6px solid ${theme.colors.primary.orange};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const ShopName = styled.h3`
  color: ${theme.colors.primary.orange};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.lg};
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.neutral.gray700};

  svg {
    margin-top: 2px;
    color: ${theme.colors.primary.green};
    font-size: ${theme.typography.fontSize.md};
  }
`;

const ContactLink = styled.a`
  color: ${theme.colors.neutral.gray700};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.skyBlue};
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.a<{ $variant: 'whatsapp' | 'call' }>`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;
  font-size: ${theme.typography.fontSize.sm};

  ${props => props.$variant === 'whatsapp' 
    ? `
      background: #25D366;
      color: ${theme.colors.neutral.white};

      &:hover {
        background: #128C7E;
        transform: translateY(-1px);
      }
    `
    : `
      background: ${theme.colors.primary.skyBlue};
      color: ${theme.colors.neutral.white};

      &:hover {
        background: ${theme.colors.primary.green};
        transform: translateY(-1px);
      }
    `
  }
`;

const MapSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray100}, 
    ${theme.colors.neutral.white}
  );
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  text-align: center;
`;

const MapFrame = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  
  iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: ${theme.borderRadius.lg};
  }
`;

const BusinessHours = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  border-top: 4px solid ${theme.colors.primary.yellow};
`;

const HoursTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const HoursGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const HourRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.neutral.gray700};

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.neutral.gray200};
  }
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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `
📞 *Contact Form Submission* 📞

👤 *Contact Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

📋 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

---
Please respond to this inquiry at your earliest convenience. Thank you!
    `;

    const whatsappUrl = `https://wa.me/917700071600?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      alert('Your message has been sent via WhatsApp! We\'ll get back to you soon.');
    }, 1000);
  };

  return (
    <ContactContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle>Contact Us</HeroTitle>
          <p style={{ 
            color: theme.colors.neutral.gray600, 
            fontSize: theme.typography.fontSize.lg,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get in touch with our premium number experts. We're here to help you find 
            the perfect number that matches your needs and preferences.
          </p>
        </div>
      </HeroSection>

      <ContactSection>
        <ContactGrid>
          <ContactForm>
            <FormTitle>Send us a Message</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, preferred numbers, or any questions you have..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                <FaWhatsapp />
                {isSubmitting ? 'Sending...' : 'Send Message via WhatsApp'}
              </SubmitButton>
            </Form>
          </ContactForm>

          <ContactInfo>
            <InfoTitle>Our Locations</InfoTitle>
            
            <ShopCard>
              <ShopName>
                <FaStore />
                Elite Vip Numbers
              </ShopName>
              
              <ContactDetail>
                <FaMapMarkerAlt />
                <div>
                  Shop 1, Akalsar Road<br />
                  Moga, Punjab - 142001
                </div>
              </ContactDetail>

              <ContactDetail>
                <FaPhone />
                <ContactLink href="tel:+919876543210">+91 98765 43210</ContactLink>
              </ContactDetail>

              <ContactDetail>
                <FaEnvelope />
                <ContactLink href="mailto:elite@premiumnumbers.com">elite@premiumnumbers.com</ContactLink>
              </ContactDetail>

              <QuickActions>
                <ActionButton
                  href="https://wa.me/919876543210?text=Hi! I'm interested in premium numbers from Elite Vip Numbers, Moga."
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="whatsapp"
                >
                  <FaWhatsapp />
                  WhatsApp
                </ActionButton>
                <ActionButton
                  href="tel:+919876543210"
                  $variant="call"
                >
                  <FaPhone />
                  Call Now
                </ActionButton>
              </QuickActions>
            </ShopCard>

            <ShopCard>
              <ShopName>
                <FaStore />
                Happy Communication
              </ShopName>
              
              <ContactDetail>
                <FaMapMarkerAlt />
                <div>
                  Booth No. 20, Main Market<br />
                  Opp. Nijjer Tourist, Sunny Enclave<br />
                  Kharar, Punjab - 140301
                </div>
              </ContactDetail>

              <ContactDetail>
                <FaPhone />
                <ContactLink href="tel:+919876543210">+91 98765 43210</ContactLink>
              </ContactDetail>

              <ContactDetail>
                <FaEnvelope />
                <ContactLink href="mailto:happy@premiumnumbers.com">happy@premiumnumbers.com</ContactLink>
              </ContactDetail>

              <QuickActions>
                <ActionButton
                  href="https://wa.me/919876543210?text=Hi! I'm interested in premium numbers from Happy Communication, Kharar."
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="whatsapp"
                >
                  <FaWhatsapp />
                  WhatsApp
                </ActionButton>
                <ActionButton
                  href="tel:+919876543210"
                  $variant="call"
                >
                  <FaPhone />
                  Call Now
                </ActionButton>
              </QuickActions>
            </ShopCard>

            <BusinessHours>
              <HoursTitle>
                <FaClock />
                Business Hours
              </HoursTitle>
              <HoursGrid>
                <HourRow>
                  <span>Monday - Saturday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </HourRow>
                <HourRow>
                  <span>Sunday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </HourRow>
                <HourRow style={{ color: theme.colors.primary.green, fontWeight: theme.typography.fontWeight.semibold }}>
                  <span>WhatsApp Support</span>
                  <span>24/7 Available</span>
                </HourRow>
              </HoursGrid>
            </BusinessHours>
          </ContactInfo>
        </ContactGrid>
      </ContactSection>

      <MapSection>
        <MapContainer>
          <SectionTitle>Find Us on Map</SectionTitle>
          <MapFrame>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109739.3665465607!2d75.10863637890625!3d30.790987700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sMoga%2C%20Punjab!5e0!3m2!1sen!2sin!4v1609876543210!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Locations"
            ></iframe>
          </MapFrame>
          <p style={{ 
            marginTop: theme.spacing.lg,
            color: theme.colors.neutral.gray600,
            fontSize: theme.typography.fontSize.md
          }}>
            Visit our physical stores for personalized consultation and immediate assistance. 
            Our experts are always ready to help you find the perfect premium number!
          </p>
        </MapContainer>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;