import React, { useState } from 'react';
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

const GalleryContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  background: #f8f9fa;
`;

const SectionTitle = styled.h2`
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

const SectionSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ImageCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImagePlaceholder = styled.div<{ $height?: string; $gradient?: string }>`
  width: 100%;
  height: ${props => props.$height || '250px'};
  background: ${props => props.$gradient || 'linear-gradient(135deg, #6366f1, #4f46e5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(2px);
  }
  
  span {
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const ImageCaption = styled.div`
  padding: 20px;
  text-align: center;
`;

const ImageTitle = styled.h3`
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ImageDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #1f2937, #374151);
  padding: 60px 20px;
  text-align: center;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Gallery: React.FC = () => {
  const galleryImages = [
    {
      id: 1,
      title: "Business Upgrade Event",
      description: "Premium VIP numbers presentation",
      gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
      height: "280px"
    },
    {
      id: 2,
      title: "Customer Success Stories",
      description: "Happy clients with their premium numbers",
      gradient: "linear-gradient(135deg, #059669, #047857)",
      height: "320px"
    },
    {
      id: 3,
      title: "VIP Number Launch",
      description: "Exclusive collection announcement",
      gradient: "linear-gradient(135deg, #dc2626, #b91c1c)",
      height: "260px"
    },
    {
      id: 4,
      title: "Premium Service Center",
      description: "Our professional service locations",
      gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
      height: "300px"
    },
    {
      id: 5,
      title: "Team Excellence",
      description: "Our dedicated support team",
      gradient: "linear-gradient(135deg, #0891b2, #0e7490)",
      height: "290px"
    },
    {
      id: 6,
      title: "Award Recognition",
      description: "Industry awards and certifications",
      gradient: "linear-gradient(135deg, #ca8a04, #a16207)",
      height: "270px"
    },
    {
      id: 7,
      title: "Technology Innovation",
      description: "Advanced number selection process",
      gradient: "linear-gradient(135deg, #1f2937, #374151)",
      height: "310px"
    },
    {
      id: 8,
      title: "Community Events",
      description: "Engaging with our valued customers",
      gradient: "linear-gradient(135deg, #be185d, #9d174d)",
      height: "285px"
    }
  ];

  return (
    <GalleryContainer>
      <HeroBanner>
        <HeroTitle>GALLERY</HeroTitle>
      </HeroBanner>
      
      <GalleryContent>
        <SectionTitle>Our Journey</SectionTitle>
        <SectionSubtitle>
          Explore moments from our premium numbers business, customer success stories, 
          and professional milestones that define our excellence.
        </SectionSubtitle>
        
        <ImageGrid>
          {galleryImages.map((image) => (
            <ImageCard key={image.id}>
              <ImagePlaceholder 
                $height={image.height} 
                $gradient={image.gradient}
              >
                <span>{image.title}</span>
              </ImagePlaceholder>
              <ImageCaption>
                <ImageTitle>{image.title}</ImageTitle>
                <ImageDescription>{image.description}</ImageDescription>
              </ImageCaption>
            </ImageCard>
          ))}
        </ImageGrid>
      </GalleryContent>
      
      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>5000+</StatNumber>
            <StatLabel>Premium Numbers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>2500+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Support Available</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </GalleryContainer>
  );
};

export default Gallery;