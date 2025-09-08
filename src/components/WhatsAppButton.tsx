import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const FloatingButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.white};
  font-size: 30px;
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  transition: all 0.3s ease;
  text-decoration: none;
  animation: pulse 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${theme.shadows.xl};
    color: ${theme.colors.neutral.white};
    opacity: 1;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(37, 211, 102, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
    }
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 15px;
    right: 15px;
    font-size: 24px;
  }
`;

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "+919876543210", 
  message = "Hi! I'm interested in premium numbers." 
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <FloatingButton
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </FloatingButton>
  );
};

export default WhatsAppButton;