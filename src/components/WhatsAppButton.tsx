import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const FloatingButton = styled.a`
  /* Position and size - highest priority */
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  width: 60px !important;
  height: 60px !important;
  z-index: 9999 !important;

  /* Background - force green, override any theme colors */
  background: #25D366 !important;
  background-color: #25D366 !important;
  background-image: none !important;

  /* Shape and display */
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  /* Typography and colors */
  color: white !important;
  font-size: 30px !important;
  text-decoration: none !important;

  /* Remove any inherited styles */
  border: none !important;
  outline: none !important;
  box-sizing: border-box !important;

  /* Effects */
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3) !important;
  transition: all 0.3s ease !important;
  animation: pulse 2s infinite !important;

  /* Force icon color */
  svg,
  * {
    color: white !important;
    fill: white !important;
  }

  /* Hover state */
  &:hover,
  &:hover * {
    transform: scale(1.1) !important;
    background: #128C7E !important;
    background-color: #128C7E !important;
    background-image: none !important;
    color: white !important;
    fill: white !important;
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4) !important;
  }

  /* All interactive states */
  &:visited,
  &:active,
  &:focus,
  &:link,
  &:visited *,
  &:active *,
  &:focus *,
  &:link * {
    background: #25D366 !important;
    background-color: #25D366 !important;
    background-image: none !important;
    color: white !important;
    fill: white !important;
    text-decoration: none !important;
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
  phoneNumber = "+917700071600",
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