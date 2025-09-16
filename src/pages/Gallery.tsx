import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchInstagramFromUrl, getPremiumNumberPost } from '../utils/instagramUrlFetcher';
import { fetchRealInstagramData } from '../utils/realInstagramFetcher2';
import { InstagramService } from '../services/instagramService';

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

const InstagramGrid = styled.div`
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

const InstagramPost = styled.a`
  display: block;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    .overlay {
      opacity: 1;
    }
  }
`;

const InstagramImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InstagramOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;

  .stats {
    color: white;
    font-size: 14px;
    display: flex;
    gap: 20px;
    margin-bottom: 10px;

    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .caption {
    color: white;
    font-size: 13px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 20px auto 0;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(131, 58, 180, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #6b7280;
`;

const Gallery: React.FC = () => {
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInstagramPosts = async (profileUrl?: string) => {
    setLoading(true);
    try {
      const urlToUse = profileUrl || await InstagramService.getInstagramUrl();

      console.log('🔍 Current Instagram URL from database:', await InstagramService.getInstagramUrl());
      console.log('🔍 URL to use for fetching:', urlToUse);

      if (urlToUse && urlToUse.trim()) {
        console.log('🎯 FETCHING REAL INSTAGRAM POSTS FROM URL:', urlToUse);

        // Try the advanced real Instagram fetcher first
        const realPosts = await fetchRealInstagramData(urlToUse);

        if (realPosts && realPosts.length > 0) {
          setInstagramPosts(realPosts);
          console.log('🎉 SUCCESS! Loaded', realPosts.length, 'REAL Instagram posts from URL!');
          return;
        } else {
          console.log('⚠️ Real Instagram fetcher failed, trying original method...');

          // Fallback to original method
          const posts = await fetchInstagramFromUrl(urlToUse);

          if (posts && posts.length > 0) {
            setInstagramPosts(posts);
            console.log('🎉 SUCCESS! Loaded', posts.length, 'Instagram posts from fallback method!');
            return;
          } else {
            console.log('⚠️ All Instagram methods failed, using themed posts...');
          }
        }
      } else {
        console.log('📝 No Instagram URL configured in admin panel database');
      }

      // Always show fallback if no URL or no posts found
      console.log('📦 Using fallback posts');
      const fallbackPosts = getPremiumNumberPost();
      setInstagramPosts(fallbackPosts);

    } catch (error) {
      console.error('❌ Instagram loading error:', error);
      const fallbackPosts = getPremiumNumberPost();
      setInstagramPosts(fallbackPosts);
      console.log('✅ Error fallback: Using themed posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstagramPosts();
  }, []);

  const openInstagramProfile = async () => {
    const savedUrl = await InstagramService.getInstagramUrl();
    const urlToOpen = savedUrl || 'https://www.instagram.com/';
    window.open(urlToOpen, '_blank');
  };

  // Listen for real-time database changes and custom events
  useEffect(() => {
    // Subscribe to database changes
    const unsubscribe = InstagramService.subscribeToInstagramUrl((newUrl) => {
      console.log('🔄 Database URL changed, reloading posts with new URL:', newUrl);
      loadInstagramPosts(newUrl || '');
    });

    // Also listen for custom events for immediate same-tab updates
    const handleCustomUpdate = (e: CustomEvent) => {
      console.log('🔄 Custom event received, reloading posts');
      loadInstagramPosts();
    };

    window.addEventListener('instagram-url-updated', handleCustomUpdate as EventListener);

    return () => {
      unsubscribe();
      window.removeEventListener('instagram-url-updated', handleCustomUpdate as EventListener);
    };
  }, []);

  return (
    <GalleryContainer>
      <HeroBanner>
        <HeroTitle>GALLERY</HeroTitle>
      </HeroBanner>

      <GalleryContent>
        <SectionTitle>Our Gallery</SectionTitle>
        <SectionSubtitle>
          Stay updated with our latest premium number collections, customer stories,
          and exclusive offers from our Instagram page.
        </SectionSubtitle>


        {loading ? (
          <LoadingMessage>Loading Instagram posts...</LoadingMessage>
        ) : (
          <>
            <InstagramGrid>
              {instagramPosts.map((post) => (
                <InstagramPost
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramImage src={post.imageUrl} alt={post.caption} />
                  <InstagramOverlay className="overlay">
                    <div className="stats">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                    <div className="caption">{post.caption}</div>
                  </InstagramOverlay>
                </InstagramPost>
              ))}
            </InstagramGrid>

            <LoadMoreButton onClick={openInstagramProfile}>
              {loading ? 'Loading Posts...' : 'View More on Instagram'}
            </LoadMoreButton>
          </>
        )}
      </GalleryContent>
    </GalleryContainer>
  );
};

export default Gallery;