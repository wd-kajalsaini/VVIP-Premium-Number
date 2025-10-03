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
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
`;

const VehicleVipCard = styled.div`
  position: relative;
  width: 800px;
  height: 449px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  margin: 0 20px;

  @media (max-width: 768px) {
    width: 90vw;
    height: calc(90vw * 0.56125);
    max-width: 800px;
    max-height: 449px;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(255, 107, 53, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    z-index: 1;
  }
`;

const VehicleVipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${VehicleVipCard}:hover & {
    transform: scale(1.1);
  }
`;

const VehicleVipOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.8), rgba(255, 140, 66, 0.8));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;

  ${VehicleVipCard}:hover & {
    opacity: 1;
  }
`;

const VehicleVipIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
  animation: bounce 2s ease-in-out infinite;

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

const VehicleVipText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const VehicleVipSubtext = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-align: center;
  font-style: italic;
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
  background: #000000;
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
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
`;

const NumerologyInstagramCard = styled.div`
  position: relative;
  width: 800px;
  height: 449px;
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(131, 96, 195, 0.3);
  margin: 0 20px;

  @media (max-width: 768px) {
    width: 90vw;
    height: calc(90vw * 0.56125);
    max-width: 800px;
    max-height: 449px;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(131, 96, 195, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    z-index: 1;
  }
`;

const NumerologyInstagramImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${NumerologyInstagramCard}:hover & {
    transform: scale(1.1);
  }
`;

const NumerologyInstagramOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.8));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;

  ${NumerologyInstagramCard}:hover & {
    opacity: 1;
  }
`;

const NumerologyInstagramIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const NumerologyInstagramText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 5px;
`;

const NumerologyInstagramSubtext = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  text-align: center;
  font-style: italic;
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
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-radius: 15px;
  padding: 25px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.6);
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
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.5));
  }
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
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.5));
  }
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
  color: #1e3a8a;
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
  width: 320px;
  background: linear-gradient(135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(255, 193, 7, 0.2) 25%,
    rgba(255, 152, 0, 0.15) 50%,
    rgba(245, 127, 23, 0.1) 75%,
    rgba(255, 215, 0, 0.05) 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  overflow: hidden;
  box-shadow:
    0 15px 35px rgba(255, 215, 0, 0.2),
    0 5px 15px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(15px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(255, 215, 0, 0.05) 0%,
      rgba(255, 193, 7, 0.1) 50%,
      rgba(255, 152, 0, 0.05) 100%);
    border-radius: 25px;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow:
      0 25px 50px rgba(255, 215, 0, 0.3),
      0 10px 30px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 215, 0, 0.5);
  }
`;

const CurrencyImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CurrencyImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CurrencyScrollCard}:hover & {
    opacity: 1;
  }
`;

const CurrencyImageNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  text-align: center;
  padding: 10px;
`;

const CurrencyCardContent = styled.div`
  padding: 25px;
  text-align: center;
`;

const CurrencyCardNumber = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CurrencyPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2d3748;
`;

const CurrencyFeature = styled.div`
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 20px;
  font-style: italic;
`;

const CurrencyActions = styled.div`
  display: flex;
  justify-content: center;
`;

const CurrencyButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #764ba2, #667eea);
  }

  &:active {
    transform: translateY(0);
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
          <VehicleVipCard
            onClick={() => window.open('https://www.instagram.com/vip_mobile_numbers_official?igsh=MXZvbTd4NDV2bmNqaA==', '_blank')}
          >
            <VehicleVipImage
              src="/vvip1.jpg"
              alt="VIP Vehicle Numbers"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            <VehicleVipOverlay>
              <VehicleVipIcon>📱</VehicleVipIcon>
              <VehicleVipText>Follow VIP Numbers</VehicleVipText>
              <VehicleVipSubtext>@vip_mobile_numbers_official</VehicleVipSubtext>
            </VehicleVipOverlay>
          </VehicleVipCard>
        </div>
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
                <VehicleActions>
                  <VehicleButton
                    onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy vehicle number ${vehicle.number} for ${vehicle.price}`, '_blank')}
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
            {[...currencyNumbers, ...currencyNumbers].map((currency, index) => {
              const imageNumber = ((index % currencyNumbers.length) % 5) + 1;
              return (
                <CurrencyScrollCard key={index}>
                  <CurrencyImageContainer>
                    <img
                      src={`/currency${imageNumber}.jpg`}
                      alt={`Currency ${imageNumber}`}
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <CurrencyImageOverlay>
                      <CurrencyImageNumber>{currency.number}</CurrencyImageNumber>
                    </CurrencyImageOverlay>
                  </CurrencyImageContainer>
                  <CurrencyCardContent>
                    <CurrencyCardNumber>{currency.number}</CurrencyCardNumber>
                    <CurrencyBadge>{currency.category}</CurrencyBadge>
                    <CurrencyPrice>{currency.price}</CurrencyPrice>
                    <CurrencyActions>
                      <CurrencyButton
                        onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy currency number${currency.number} for ${currency.price}`, '_blank')}
                      >
                        Buy Now
                      </CurrencyButton>
                    </CurrencyActions>
                  </CurrencyCardContent>
                </CurrencyScrollCard>
              );
            })}
          </CurrencyScrollWrapper>
        </CurrencyScrollContainer>
      </CurrencySection>

      {/* Numerology Special Section */}
      <NumerologySection>
        <NumerologySectionTitle>🔮 Numerology Special 🪄</NumerologySectionTitle>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
          <NumerologyInstagramCard
            onClick={() => window.open('https://www.instagram.com/numerologypodcast?igsh=cG0xN3N5ZjVvMm8w', '_blank')}
          >
            <NumerologyInstagramImage
              src="/numerology.jpg"
              alt="Numerology Podcast"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            <NumerologyInstagramOverlay>
              <NumerologyInstagramIcon>📱</NumerologyInstagramIcon>
              <NumerologyInstagramText>Follow Our Numerology</NumerologyInstagramText>
              <NumerologyInstagramSubtext>@numerologypodcast</NumerologyInstagramSubtext>
            </NumerologyInstagramOverlay>
          </NumerologyInstagramCard>
        </div>
        <NumerologyScrollContainer>
          <NumerologyScrollWrapper>
            {[...numerologyNumbers, ...numerologyNumbers].map((number, index) => (
              <NumerologyScrollCard key={index}>
                <NumerologyTopIcon
                  onClick={() => window.open('https://www.instagram.com/numerologypodcast?igsh=cG0xN3N5ZjVvMm8w', '_blank')}
                >
                  🔮
                </NumerologyTopIcon>
                <NumerologyBottomIcon
                  onClick={() => window.open('https://www.instagram.com/numerologypodcast?igsh=cG0xN3N5ZjVvMm8w', '_blank')}
                >
                  🪄
                </NumerologyBottomIcon>
                <NumerologyNumber>+91 {number.number}</NumerologyNumber>
                <NumerologyMeaning>{number.meaning}</NumerologyMeaning>
                <NumerologyPrice>{number.price}</NumerologyPrice>
                <div style={{ fontSize: '0.85rem', marginBottom: '15px', opacity: 0.9, textAlign: 'center' }}>
                  Sum Total = {calculateSumTotal(number.number)}
                </div>
                <NumerologyActions>
                  <NumerologyButton
                    onClick={() => window.open(`https://wa.me/917700071600?text=Hi! I want to buy numerology number +91 ${number.number} for ${number.price}`, '_blank')}
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