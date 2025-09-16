// Simple Instagram Fetcher - Works fo

// Method 1: Using Instagram's public feed endpoint (most reliable)
export const fetchInstagramPublicFeed = async (username) => {
  try {
    console.log(`🔄 Fetching Instagram data for: ${username}`);

    // Instagram's public endpoint that works without authentication
    const instagramUrl = `https://www.instagram.com/${username}/`;

    // Use CORS proxy to access Instagram
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(instagramUrl)}`;

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    console.log('📄 Instagram page loaded successfully');

    // Extract Instagram data from HTML
    return extractInstagramDataFromHTML(html, username);

  } catch (error) {
    console.log('❌ Public feed method failed:', error.message);
    return null;
  }
};

// Method 2: Alternative CORS proxy
export const fetchInstagramAlternative = async (username) => {
  try {
    console.log(`🔄 Trying alternative method for: ${username}`);

    const instagramUrl = `https://www.instagram.com/${username}/`;
    const proxyUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(instagramUrl)}`;

    const response = await fetch(proxyUrl);

    if (response.ok) {
      const data = await response.json();
      console.log('📄 Alternative method: page loaded');

      return extractInstagramDataFromHTML(data.contents, username);
    }

    throw new Error('Alternative method failed');
  } catch (error) {
    console.log('❌ Alternative method failed:', error.message);
    return null;
  }
};

// Extract Instagram post data from HTML
const extractInstagramDataFromHTML = (html, username) => {
  try {
    console.log('📊 Extracting Instagram data from HTML...');

    // Look for Instagram's shared data
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({.+?});/) ||
                           html.match(/window\._sharedData = ({.+?});/);

    if (sharedDataMatch) {
      console.log('✅ Found Instagram shared data');

      const sharedData = JSON.parse(sharedDataMatch[1]);

      // Navigate through Instagram's data structure
      const profilePage = sharedData.entry_data?.ProfilePage?.[0];
      const userData = profilePage?.graphql?.user;

      if (userData && userData.edge_owner_to_timeline_media) {
        const posts = userData.edge_owner_to_timeline_media.edges;

        console.log(`📸 Found ${posts.length} Instagram posts`);

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
    }

    // Alternative: Look for JSON-LD data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/);
    if (jsonLdMatch) {
      console.log('✅ Found JSON-LD data');
      const jsonLd = JSON.parse(jsonLdMatch[1]);
      // Process JSON-LD data if needed
    }

    console.log('⚠️ No usable Instagram data found in HTML');
    return null;

  } catch (error) {
    console.log('❌ Data extraction failed:', error.message);
    return null;
  }
};

// Main function that tries multiple methods
export const getInstagramPostsSimple = async (username) => {
  console.log(`🎯 Starting Instagram fetch for: ${username}`);

  // Method 1: Public feed
  let posts = await fetchInstagramPublicFeed(username);
  if (posts && posts.length > 0) {
    console.log(`✅ Success! Loaded ${posts.length} real Instagram posts`);
    return posts;
  }

  // Method 2: Alternative proxy
  posts = await fetchInstagramAlternative(username);
  if (posts && posts.length > 0) {
    console.log(`✅ Alternative success! Loaded ${posts.length} posts`);
    return posts;
  }

  console.log('❌ All simple methods failed');
  return null;
};

// Fallback function with real-looking data for your account
export const getPremiumNumberPost = () => {
  console.log('📦 Using Hanuman-themed fallback posts');

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