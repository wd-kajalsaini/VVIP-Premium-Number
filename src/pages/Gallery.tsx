import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
`;

const HeroBanner = styled.section`
  background: linear-gradient(135deg, #6366f1, #4f46e5, #374151);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><polygon points="30,0 60,30 30,60 0,30"/></g></g></svg>') repeat;
    z-index: 1;
  }
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  z-index: 2;
  position: relative;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 4px;

  @media (max-width: 768px) {
    font-size: 3rem;
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
`;


// Vehicle VIP Numbers Section
const VehicleSection = styled.section`
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-2c9.94 0 18-8.06 18-18s-8.06-18-18-18V0c11.046 0 20 8.954 20 20zM0 20C0 8.954 8.954 0 20 0v2C11.06 2 2 10.06 2 20s8.06 18 18 18v2C8.954 40 0 31.046 0 20z'/%3E%3C/g%3E%3C/svg%3E") repeat;
    z-index: 1;
  }
`;

const VehicleSectionTitle = styled.h2`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VehicleIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
`;

const VehicleIcon = styled.div`
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
    }
  }
`;

const VehicleScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 769px) {
    overflow: hidden;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
  }
`;

const VehicleScrollWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  padding: 20px 0;

  @media (min-width: 769px) {
    animation: vehicleScroll 25s linear infinite;

    @keyframes vehicleScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @media (max-width: 768px) {
    animation: none;
    padding: 20px 10px;
  }
`;

const VehicleScrollCard = styled.div`
  width: 250px;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  border-radius: 15px;
  padding: 25px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(255, 107, 53, 0.4);
    animation-play-state: paused;
  }
`;

const VehicleTopIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.4rem;
  opacity: 0.7;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
`;

const VehicleBottomIcon = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 1.2rem;
  opacity: 0.7;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
`;

const VehicleNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VehicleType = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 12px;
  display: inline-block;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const VehiclePrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const VehicleActions = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const VehicleButton = styled.button`
  background: white;
  color: #ff6b35;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background: #f8f9fa;
  }
`;


// Numerology Special Section
const NumerologySection = styled.section`
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20v-2c12.077 0 22 9.923 22 22s-9.923 22-22 22v-2c11.046 0 20-8.954 20-20zM60 30c0 11.046-8.954 20-20 20v2c12.077 0 22-9.923 22-22s-9.923-22-22-22v2c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    z-index: 1;
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const NumerologySectionTitle = styled.h2`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const NumerologyIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
`;

const NumerologyIcon = styled.div`
  font-size: 4rem;
  animation: mystical 3s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 1s;
  }

  @keyframes mystical {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      opacity: 0.8;
    }
    25% {
      transform: scale(1.1) rotate(5deg);
      opacity: 1;
    }
    50% {
      transform: scale(1.2) rotate(-5deg);
      opacity: 1;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
    75% {
      transform: scale(1.1) rotate(5deg);
      opacity: 1;
    }
  }
`;

const NumerologyScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 769px) {
    overflow: hidden;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
  }
`;

const NumerologyScrollWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  padding: 20px 0;

  @media (min-width: 769px) {
    animation: numerologyScroll 30s linear infinite;

    @keyframes numerologyScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @media (max-width: 768px) {
    animation: none;
    padding: 20px 10px;
  }
`;

const NumerologyScrollCard = styled.div`
  width: 250px;
  background: linear-gradient(135deg, #8360c3, #2ebf91);
  border-radius: 15px;
  padding: 25px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(131, 96, 195, 0.3);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(131, 96, 195, 0.4);
    animation-play-state: paused;
  }
`;

const NumerologyTopIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.4rem;
  opacity: 0.7;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
`;

const NumerologyBottomIcon = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 1.2rem;
  opacity: 0.7;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
`;

const NumerologyNumber = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NumerologyMeaning = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 12px;
  display: inline-block;
  position: relative;
  z-index: 2;
  font-style: italic;
  text-align: center;
`;

const NumerologyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const NumerologyActions = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const NumerologyButton = styled.button`
  background: white;
  color: #8360c3;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background: #f8f9fa;
  }
`;

// Currency Numbers Section
const CurrencySection = styled.section`
  padding: 60px 20px;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 25%, #ff8c00 50%, #ffd700 75%, #ffb347 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-size='20' fill='%23ffffff' fill-opacity='0.05' transform='rotate(-45 50 50)'>₹%3C/text%3E%3Ctext x='10' y='60' font-size='20' fill='%23ffffff' fill-opacity='0.05' transform='rotate(-45 50 50)'>₹%3C/text%3E%3Ctext x='10' y='90' font-size='20' fill='%23ffffff' fill-opacity='0.05' transform='rotate(-45 50 50)'>₹%3C/text%3E%3C/svg%3E") repeat;
    z-index: 1;
  }
`;

const CurrencySectionTitle = styled.h2`
  color: #2c1810;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  text-shadow:
    2px 2px 4px rgba(255, 215, 0, 0.5),
    -2px -2px 4px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CurrencyIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
`;

const CurrencyIcon = styled.div`
  font-size: 3.5rem;
  animation: coinFlip 2s ease-in-out infinite;
  color: #2c1810;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);

  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
  &:nth-child(4) { animation-delay: 0.6s; }
  &:nth-child(5) { animation-delay: 0.8s; }

  @keyframes coinFlip {
    0%, 100% {
      transform: rotateY(0deg) scale(1);
    }
    25% {
      transform: rotateY(90deg) scale(1.1);
    }
    50% {
      transform: rotateY(180deg) scale(1.2);
    }
    75% {
      transform: rotateY(270deg) scale(1.1);
    }
  }
`;

const CurrencyScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 769px) {
    overflow: hidden;
  }
`;

const CurrencyScrollWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: max-content;
  padding: 20px 0;

  @media (min-width: 769px) {
    animation: currencyScroll 35s linear infinite;

    @keyframes currencyScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @media (max-width: 768px) {
    animation: none;
    padding: 20px 10px;
  }
`;

const CurrencyScrollCard = styled.div`
  width: 260px;
  background: linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%);
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 20px;
  padding: 25px;
  color: #ffd700;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 8px 25px rgba(255, 215, 0, 0.3),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ffd700, #ffb347, #ff8c00, #ffd700);
    border-radius: 20px;
    z-index: -1;
    animation: borderGlow 3s linear infinite;
  }

  @keyframes borderGlow {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 15px 40px rgba(255, 215, 0, 0.5),
      inset 0 0 30px rgba(255, 215, 0, 0.2);
  }
`;

const CurrencySymbols = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 1.8rem;
  opacity: 0.4;
  z-index: 1;
  color: #ffd700;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
`;

const CurrencyNumber = styled.div`
  font-size: 1.9rem;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 35px;
  position: relative;
  z-index: 2;
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.4);
  text-align: center;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CurrencyBadge = styled.div`
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #2c1810;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 12px;
  display: inline-block;
  position: relative;
  z-index: 2;
  text-align: center;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  animation: shine 3s ease-in-out infinite;

  @keyframes shine {
    0%, 100% {
      box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
    }
    50% {
      box-shadow: 0 4px 20px rgba(255, 215, 0, 0.6);
    }
  }
`;

const CurrencyPrice = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const CurrencyFeature = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 15px;
  text-align: center;
  color: #ffb347;
  font-style: italic;
`;

const CurrencyActions = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const CurrencyButton = styled.button`
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #2c1810;
  border: none;
  padding: 12px 35px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6);
    background: linear-gradient(135deg, #ffb347, #ffd700);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;


const Gallery: React.FC = () => {

  // Vehicle VIP Numbers Data
  const vehicleNumbers = [
    {
      number: "PB-66-7777",
      category: "VEHICLE VIP",
      price: "₹85,000",
      type: "Car"
    },
    {
      number: "CH-99-9999",
      category: "VEHICLE PREMIUM",
      price: "₹65,000",
      type: "Bike"
    },
    {
      number: "HR-88-8888",
      category: "VEHICLE SPECIAL",
      price: "₹55,000",
      type: "Car"
    },
    {
      number: "DL-77-7777",
      category: "VEHICLE VIP",
      price: "₹75,000",
      type: "Bike"
    },
    {
      number: "MH-55-5555",
      category: "VEHICLE PREMIUM",
      price: "₹45,000",
      type: "Car"
    },
    {
      number: "UP-11-1111",
      category: "VEHICLE ULTRA",
      price: "₹95,000",
      type: "Bike"
    },
    {
      number: "KA-33-3333",
      category: "VEHICLE GOLD",
      price: "₹70,000",
      type: "Car"
    },
    {
      number: "TN-44-4444",
      category: "VEHICLE PLATINUM",
      price: "₹80,000",
      type: "Bike"
    },
    {
      number: "GJ-22-2222",
      category: "VEHICLE DIAMOND",
      price: "₹60,000",
      type: "Car"
    },
    {
      number: "RJ-00-0001",
      category: "VEHICLE ROYAL",
      price: "₹1,20,000",
      type: "Bike"
    }
  ];

  // Currency Numbers Data
  const currencyNumbers = [
    {
      number: "88888-88888",
      category: "MILLIONAIRE",
      price: "₹1,50,000",
      feature: "Ultimate Wealth Number"
    },
    {
      number: "77777-77777",
      category: "JACKPOT",
      price: "₹1,25,000",
      feature: "Lucky Fortune Number"
    },
    {
      number: "99999-00001",
      category: "GOLD RUSH",
      price: "₹85,000",
      feature: "Business Success"
    },
    {
      number: "78900-12345",
      category: "MONEY FLOW",
      price: "₹45,000",
      feature: "Ascending Prosperity"
    },
    {
      number: "56789-56789",
      category: "WEALTH LADDER",
      price: "₹55,000",
      feature: "Growing Fortune"
    },
    {
      number: "10000-00001",
      category: "BILLIONAIRE",
      price: "₹95,000",
      feature: "Power & Money"
    },
    {
      number: "36936-36936",
      category: "TRIPLE FORTUNE",
      price: "₹62,000",
      feature: "Multiplying Wealth"
    },
    {
      number: "50505-50505",
      category: "GOLDEN REPEAT",
      price: "₹58,000",
      feature: "Consistent Gains"
    },
    {
      number: "11111-22222",
      category: "DOUBLE POWER",
      price: "₹75,000",
      feature: "Dual Prosperity"
    },
    {
      number: "00700-00700",
      category: "BOND NUMBER",
      price: "₹1,00,000",
      feature: "Elite Status"
    },
    {
      number: "42042-42042",
      category: "MEANING OF WEALTH",
      price: "₹52,000",
      feature: "Life & Fortune"
    },
    {
      number: "31415-92653",
      category: "PI FORTUNE",
      price: "₹72,000",
      feature: "Mathematical Wealth"
    }
  ];

  // Numerology Special Numbers Data
  const numerologyNumbers = [
    {
      number: "73366-0055",
      category: "NUMEROLOGY SPECIAL",
      price: "₹25,000",
      meaning: "Without 2, 4, 8"
    },
    {
      number: "91357-1357",
      category: "LUCKY SEQUENCE",
      price: "₹18,000",
      meaning: "Fortune & Prosperity"
    },
    {
      number: "96396-9639",
      category: "MYSTIC NUMBER",
      price: "₹22,000",
      meaning: "Spiritual Growth"
    },
    {
      number: "81919-1919",
      category: "POWER NUMBER",
      price: "₹30,000",
      meaning: "Success & Leadership"
    },
    {
      number: "13579-13579",
      category: "ASCENDING POWER",
      price: "₹35,000",
      meaning: "Progressive Success"
    },
    {
      number: "97531-97531",
      category: "DESCENDING LUCK",
      price: "₹28,000",
      meaning: "Wealth & Abundance"
    },
    {
      number: "11133-11133",
      category: "MASTER NUMBER",
      price: "₹40,000",
      meaning: "Divine Protection"
    },
    {
      number: "66699-66699",
      category: "BALANCE NUMBER",
      price: "₹32,000",
      meaning: "Harmony & Peace"
    },
    {
      number: "77755-77755",
      category: "SPIRITUAL ENERGY",
      price: "₹38,000",
      meaning: "Inner Wisdom"
    },
    {
      number: "99911-99911",
      category: "COMPLETION CYCLE",
      price: "₹45,000",
      meaning: "Achievement & Victory"
    },
    {
      number: "15963-15963",
      category: "GOLDEN RATIO",
      price: "₹50,000",
      meaning: "Perfect Balance"
    },
    {
      number: "70905-70905",
      category: "MYSTIC SEQUENCE",
      price: "₹26,000",
      meaning: "Hidden Knowledge"
    }
  ];

  // Function to calculate sum total of digits in a phone number
  const calculateSumTotal = (phoneNumber: string): React.ReactNode => {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');

    // Calculate sum of all digits (first sum)
    const firstSum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    // Calculate sum of the first sum (second sum)
    const secondSum = firstSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    // Calculate sum of the second sum (third sum)
    const thirdSum = secondSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    // Return format: "firstSum-secondSum-thirdSum" with bold formatting
    return <><strong>{firstSum}-{secondSum}-{thirdSum}</strong></>;
  };

  return (
    <GalleryContainer>
      {/* Vehicle VIP Numbers Section */}
      <VehicleSection>
        <VehicleSectionTitle>🛻 Vehicle VIP Numbers 🏍</VehicleSectionTitle>
        <VehicleScrollContainer>
          <VehicleScrollWrapper>
            {[...vehicleNumbers, ...vehicleNumbers].map((vehicle, index) => (
              <VehicleScrollCard key={index}>
                <VehicleTopIcon style={{
                  filter: vehicle.type === 'Bike' ? 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.9)) hue-rotate(0deg) brightness(1.4) contrast(1.5) saturate(2)' : 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))',
                  color: vehicle.type === 'Bike' ? '#ff3333' : 'rgba(255, 255, 255, 0.8)'
                }}>
                  {vehicle.type === 'Car' ? '🛻' : '🏍️'}
                </VehicleTopIcon>
                <VehicleBottomIcon style={{
                  filter: vehicle.type === 'Bike' ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))' : 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.9)) hue-rotate(0deg) brightness(1.4) contrast(1.5) saturate(2)',
                  color: vehicle.type === 'Bike' ? 'rgba(255, 255, 255, 0.8)' : '#ff3333'
                }}>
                  {vehicle.type === 'Car' ? '🏍️' : '🛻'}
                </VehicleBottomIcon>
                <VehicleNumber>{vehicle.number}</VehicleNumber>
                <VehicleType>{vehicle.type} VIP Number</VehicleType>
                <VehiclePrice>{vehicle.price}</VehiclePrice>
                <div style={{ fontSize: '0.85rem', marginBottom: '15px', opacity: 0.9, textAlign: 'center' }}>
                  Sum Total = {calculateSumTotal(vehicle.number)}
                </div>
                <VehicleActions>
                  <VehicleButton
                    onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy vehicle number ${vehicle.number} for ${vehicle.price}`, '_blank')}
                  >
                    Buy Now
                  </VehicleButton>
                </VehicleActions>
              </VehicleScrollCard>
            ))}
          </VehicleScrollWrapper>
        </VehicleScrollContainer>
      </VehicleSection>
      {/* Currency Numbers Section */}
      <CurrencySection>
        <CurrencySectionTitle>💰 Currency Numbers 💵</CurrencySectionTitle>
        <CurrencyIconsContainer>
        </CurrencyIconsContainer>
        <CurrencyScrollContainer>
          <CurrencyScrollWrapper>
            {[...currencyNumbers, ...currencyNumbers].map((currency, index) => (
              <CurrencyScrollCard key={index}>
                <CurrencySymbols>
                  <span>₹</span>
                  <span>₹</span>
                </CurrencySymbols>
                <CurrencyNumber>{currency.number}</CurrencyNumber>
                <CurrencyBadge>{currency.category}</CurrencyBadge>
                <CurrencyPrice>{currency.price}</CurrencyPrice>
                <div style={{ fontSize: '0.85rem', marginBottom: '15px', opacity: 0.9, textAlign: 'center', color: '#ffb347' }}>
                  Sum Total = {calculateSumTotal(currency.number)}
                </div>
                <CurrencyActions>
                  <CurrencyButton
                    onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy currency number +91${currency.number} for ${currency.price}`, '_blank')}
                  >
                    Buy Now
                  </CurrencyButton>
                </CurrencyActions>
              </CurrencyScrollCard>
            ))}
          </CurrencyScrollWrapper>
        </CurrencyScrollContainer>
      </CurrencySection>

      {/* Numerology Special Section */}
      <NumerologySection>
        <NumerologySectionTitle>🔮 Numerology Special 🪄</NumerologySectionTitle>
        <NumerologyScrollContainer>
          <NumerologyScrollWrapper>
            {[...numerologyNumbers, ...numerologyNumbers].map((number, index) => (
              <NumerologyScrollCard key={index}>
                <NumerologyTopIcon>🔮</NumerologyTopIcon>
                <NumerologyBottomIcon>🪄</NumerologyBottomIcon>
                <NumerologyNumber>+91 {number.number}</NumerologyNumber>
                <NumerologyMeaning>{number.meaning}</NumerologyMeaning>
                <NumerologyPrice>{number.price}</NumerologyPrice>
                <div style={{ fontSize: '0.85rem', marginBottom: '15px', opacity: 0.9, textAlign: 'center' }}>
                  Sum Total = {calculateSumTotal(number.number)}
                </div>
                <NumerologyActions>
                  <NumerologyButton
                    onClick={() => window.open(`https://wa.me/919772297722?text=Hi! I want to buy numerology number +91 ${number.number} for ${number.price}`, '_blank')}
                  >
                    Buy Now
                  </NumerologyButton>
                </NumerologyActions>
              </NumerologyScrollCard>
            ))}
          </NumerologyScrollWrapper>
        </NumerologyScrollContainer>
      </NumerologySection>
    </GalleryContainer>
  );
};

export default Gallery;