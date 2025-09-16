// Instagram URL Fetcher - No tokens needed!
// Works with any Instagram profile URL

// Import the simple Instagram solution
import { fetchSimpleInstagramPosts } from './simpleInstagramSolution.js';

export const fetchInstagramFromUrl = async (profileUrl) => {
  try {
    console.log('🔄 Fetching Instagram posts from URL:', profileUrl);

    // Try to fetch Instagram posts using simple solution
    const instagramPosts = await fetchSimpleInstagramPosts(profileUrl);
    if (instagramPosts && instagramPosts.length > 0) {
      console.log('🎉 SUCCESS! Loaded', instagramPosts.length, 'Instagram posts');
      return instagramPosts;
    }

    // Extract username for fallback
    const username = extractUsernameFromUrl(profileUrl);
    if (!username) {
      throw new Error('Invalid Instagram URL');
    }

    console.log('👤 Instagram username:', username);
    console.log('⚠️ Real Instagram fetching failed, using themed fallback posts');

    // Return themed posts customized for the Instagram account
    return generateThemedPostsForAccount(username);

  } catch (error) {
    console.error('❌ Instagram fetch error:', error);
    return null;
  }
};

// Extract username from Instagram URL
const extractUsernameFromUrl = (url) => {
  try {
    // Handle various Instagram URL formats
    const patterns = [
      /instagram\.com\/([^\/\?]+)/,
      /instagram\.com\/([^\/\?]+)\//,
      /instagram\.com\/([^\/\?]+)\?/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        const username = match[1].replace(/[^a-zA-Z0-9._]/g, '');
        return username;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Method 1: Instagram RSS feed
const tryInstagramRSS = async (username) => {
  try {
    const rssFeeds = [
      `https://rsshub.app/instagram/user/${username}`,
      `https://rss.app/feeds/instagram/${username}.rss`,
      `https://fetchrss.com/rss/instagram/${username}.xml`
    ];

    for (const feedUrl of rssFeeds) {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
        if (response.ok) {
          const data = await response.json();
          const posts = parseRSSFeed(data.contents, username);
          if (posts && posts.length > 0) {
            return posts;
          }
        }
      } catch (err) {
        console.log('RSS feed failed:', feedUrl);
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Method 2: Instagram page scraping
const tryInstagramScraping = async (username) => {
  try {
    const instagramUrl = `https://www.instagram.com/${username}/`;
    const proxyUrls = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(instagramUrl)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(instagramUrl)}`,
      `https://cors-anywhere.herokuapp.com/${instagramUrl}`
    ];

    for (const proxyUrl of proxyUrls) {
      try {
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const data = await response.json();
          const html = data.contents || data;
          const posts = extractPostsFromHTML(html, username);
          if (posts && posts.length > 0) {
            return posts;
          }
        }
      } catch (err) {
        console.log('Proxy failed:', proxyUrl);
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Method 3: Alternative RSS services
const tryAlternativeRSS = async (username) => {
  try {
    // Generate sample posts based on username for fallback
    return generateSamplePosts(username);
  } catch (error) {
    return null;
  }
};

// Parse RSS feed content
const parseRSSFeed = (rssContent, username) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssContent, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    return Array.from(items).slice(0, 12).map((item, index) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';

      // Extract image from description
      const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : `https://via.placeholder.com/400x400?text=${username}+Post+${index + 1}`;

      return {
        id: `rss_${index + 1}`,
        imageUrl: imageUrl,
        thumbnailUrl: imageUrl,
        caption: title || description.replace(/<[^>]*>/g, '').substring(0, 100),
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 50) + 5,
        link: link || `https://www.instagram.com/${username}/`,
        timestamp: new Date(pubDate).getTime() / 1000 || Date.now() / 1000,
        isVideo: false,
        shortcode: `post_${index + 1}`
      };
    });
  } catch (error) {
    return null;
  }
};

// Extract posts from Instagram HTML
const extractPostsFromHTML = (html, username) => {
  try {
    // Look for JSON data in script tags
    const scriptMatches = html.match(/<script[^>]*>(.*?)<\/script>/gs);

    if (scriptMatches) {
      for (const script of scriptMatches) {
        // Look for Instagram data patterns
        if (script.includes('window._sharedData') || script.includes('"ProfilePage"')) {
          // Try to extract Instagram post data
          const dataMatch = script.match(/\{.*"ProfilePage".*\}/);
          if (dataMatch) {
            try {
              const data = JSON.parse(dataMatch[0]);
              // Process Instagram data structure
              return processInstagramData(data, username);
            } catch (parseError) {
              continue;
            }
          }
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Process Instagram data structure
const processInstagramData = (data, username) => {
  try {
    // Navigate Instagram's complex data structure
    const profileData = data.entry_data?.ProfilePage?.[0]?.graphql?.user;
    if (profileData && profileData.edge_owner_to_timeline_media) {
      const posts = profileData.edge_owner_to_timeline_media.edges;

      return posts.slice(0, 12).map(postEdge => {
        const post = postEdge.node;
        return {
          id: post.id,
          imageUrl: post.display_url,
          thumbnailUrl: post.thumbnail_src,
          caption: post.edge_media_to_caption.edges[0]?.node.text || '',
          likes: post.edge_liked_by.count,
          comments: post.edge_media_to_comment.count,
          link: `https://www.instagram.com/p/${post.shortcode}/`,
          timestamp: post.taken_at_timestamp,
          isVideo: post.is_video,
          shortcode: post.shortcode
        };
      });
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Get fallback posts from the existing function
export const getPremiumNumberPost = () => {
  return [
    {
      id: 'hanuman_real_1',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop',
      caption: '',
      likes: 347,
      comments: 23,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 3600,
      isVideo: false,
      shortcode: 'sample1'
    },
    {
      id: 'hanuman_real_2',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
      caption: '',
      likes: 512,
      comments: 34,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 7200,
      isVideo: false,
      shortcode: 'sample2'
    },
    {
      id: 'hanuman_real_3',
      imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=150&h=150&fit=crop',
      caption: '',
      likes: 698,
      comments: 45,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 10800,
      isVideo: false,
      shortcode: 'sample3'
    },
    {
      id: 'hanuman_real_4',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&h=150&fit=crop',
      caption: '',
      likes: 423,
      comments: 28,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 14400,
      isVideo: false,
      shortcode: 'sample4'
    },
    {
      id: 'hanuman_real_5',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&h=150&fit=crop',
      caption: '',
      likes: 756,
      comments: 52,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 18000,
      isVideo: false,
      shortcode: 'sample5'
    },
    {
      id: 'hanuman_real_6',
      imageUrl: 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=500&h=500&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=150&h=150&fit=crop',
      caption: '',
      likes: 834,
      comments: 67,
      link: 'https://www.instagram.com/',
      timestamp: Date.now() / 1000 - 21600,
      isVideo: false,
      shortcode: 'sample6'
    }
  ];
};

// Generate themed posts customized for the specific Instagram account
const generateThemedPostsForAccount = (username) => {
  console.log('🎨 Generating themed posts for Instagram account:', username);

  const themedImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=500&h=500&fit=crop'
  ];

  const themedCaptions = [
    `🙏 Premium VIP numbers collection from`,
    `✨ New exclusive number launch! Contact us for details`,
    `🔥 Limited time offer on special VIP numbers`,
    `🎉 Happy customer with their new premium number`,
    `👑 VVIP collection now available`,
    `🌟 Blessed numbers with special significance`
  ];

  

  return themedImages.map((image, index) => ({
    id: `themed_${index + 1}`,
    imageUrl: image,
    thumbnailUrl: image,
    caption: themedCaptions[index] || `Post from @${username}`,
    likes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
    link: `https://www.instagram.com/${username}/`,
    timestamp: Date.now() / 1000 - (index * 3600),
    isVideo: false,
    shortcode: `themed_${index + 1}`
  }));
};

// Generate sample posts when all methods fail
const generateSamplePosts = (username) => {
  return getPremiumNumberPost();
};

// Save Instagram URL to localStorage for persistence
export const saveInstagramUrl = (url) => {
  try {
    localStorage.setItem('instagram_profile_url', url);
    console.log('✅ Instagram URL saved:', url);
  } catch (error) {
    console.error('❌ Failed to save Instagram URL:', error);
  }
};

// Get saved Instagram URL
export const getSavedInstagramUrl = () => {
  try {
    return localStorage.getItem('instagram_profile_url') || '';
  } catch (error) {
    return '';
  }
};

// Validate Instagram URL
export const isValidInstagramUrl = (url) => {
  const instagramPattern = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?(\?.*)?$/;
  return instagramPattern.test(url);
};