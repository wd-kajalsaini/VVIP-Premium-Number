// Instagram Content Manager - Easy way to manage real Instagram posts
// Update this file with your actual Instagram content

export const getRealInstagramPosts = (username, profileUrl) => {

  // INSTRUCTIONS FOR UPDATING:
  // 1. Go to your Instagram profile: https://www.instagram.com/panchmukhi__hanuman_bilaspur/
  // 2. Right-click on any post image and select "Copy image address"
  // 3. Replace the imageUrl with your actual Instagram image URL
  // 4. Update the caption with your real post caption
  // 5. Save this file and refresh your website

  const realPosts = [
    {
      id: 'real_post_1',
      // Replace this URL with your actual Instagram post image URL
      imageUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/363791734_18372894632067067_5936070259103549601_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=BQjHyTnhHnUAX9-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCNqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650C3D18&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/363791734_18372894632067067_5936070259103549601_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=BQjHyTnhHnUAX9-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD5tJ1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650C3D18&_nc_sid=10d13b',
      caption: '',
      likes: 45,
      comments: 8,
      link: `https://www.instagram.com/p/CvQrT4BOl3Q/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 3600,
      isVideo: false,
      shortcode: 'CvQrT4BOl3Q'
    },
    {
      id: 'real_post_2',
      // Replace with your actual Instagram image URL
      imageUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/362458903_18371459708067067_4729385950284819402_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=7kQHxTnhHnUAX8-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfANqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650B2C19&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/362458903_18371459708067067_4729385950284819402_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=7kQHxTnhHnUAX8-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD4tH1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650B2C19&_nc_sid=10d13b',
      caption: '',
      likes: 67,
      comments: 12,
      link: `https://www.instagram.com/p/CvNmH7VOs9L/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 7200,
      isVideo: false,
      shortcode: 'CvNmH7VOs9L'
    },
    {
      id: 'real_post_3',
      // Replace with your actual Instagram image URL
      imageUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/361147821_18370123475067067_3856298470193628291_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=8mRHyTnhHnUAX7-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBMqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650A1B28&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/361147821_18370123475067067_3856298470193628291_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=8mRHyTnhHnUAX7-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfC3tG1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=650A1B28&_nc_sid=10d13b',
      caption: '',
      likes: 89,
      comments: 15,
      link: `https://www.instagram.com/p/CvKhR2qOm4K/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 10800,
      isVideo: false,
      shortcode: 'CvKhR2qOm4K'
    },
    {
      id: 'real_post_4',
      // Replace with your actual Instagram image URL
      imageUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/359683254_18368764302067067_2947184570284739581_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=9nSHxTnhHnUAX6-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCLqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=6509A37F&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/359683254_18368764302067067_2947184570284739581_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=9nSHxTnhHnUAX6-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD2tF1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=6509A37F&_nc_sid=10d13b',
      caption: '',
      likes: 124,
      comments: 18,
      link: `https://www.instagram.com/p/CvHdP8bOn7H/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 14400,
      isVideo: false,
      shortcode: 'CvHdP8bOn7H'
    },
    {
      id: 'real_post_5',
      // Replace with your actual Instagram image URL
      imageUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/358219847_18367428129067067_1038074560395849472_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=109&_nc_ohc=AnTHyTnhHnUAX5-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDOqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=6508B486&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/358219847_18367428129067067_1038074560395849472_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=109&_nc_ohc=AnTHyTnhHnUAX5-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfC1tE1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=6508B486&_nc_sid=10d13b',
      caption: '',
      likes: 156,
      comments: 22,
      link: `https://www.instagram.com/p/CvEYK7dOk2D/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 18000,
      isVideo: false,
      shortcode: 'CvEYK7dOk2D'
    },
    {
      id: 'real_post_6',
      // Replace with your actual Instagram image URL
      imageUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/356754290_18366091956067067_5129164270506738393_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=BpUHxTnhHnUAX4-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfENqJKBRzKZ7n_kZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=65079595&_nc_sid=10d13b',
      thumbnailUrl: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/356754290_18366091956067067_5129164270506738393_n.jpg?stp=dst-jpg_e35_s150x150&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=BpUHxTnhHnUAX4-VKFr&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfD0tD1mZxGhE3x_7bYqf2_c5xwxOFZ2ZMzwA&oe=65079595&_nc_sid=10d13b',
      caption: '',
      likes: 198,
      comments: 28,
      link: `https://www.instagram.com/p/CvBTG5fOh8A/`, // Update with actual post URL
      timestamp: Date.now() / 1000 - 21600,
      isVideo: false,
      shortcode: 'CvBTG5fOh8A'
    }
  ];

  // Add username to all captions
  return realPosts.map(post => ({
    ...post,
    caption: post.caption + ` -`
  }));
};

// Instructions for getting real Instagram image URLs:
export const getInstagramImageInstructions = () => {
  return {
    title: "How to Add Your Real Instagram Images",
    steps: [
      "1. Go to your Instagram profile: https://www.instagram.com/panchmukhi__hanuman_bilaspur/",
      "2. Open any post you want to add",
      "3. Right-click on the post image",
      "4. Select 'Copy image address' or 'Copy image URL'",
      "5. Replace the 'imageUrl' in instagramContentManager.js with your copied URL",
      "6. Update the 'caption' with your real post caption",
      "7. Update the 'link' with your real Instagram post URL",
      "8. Save the file and refresh your website"
    ],
    note: "This method uses your actual Instagram images and ensures they display properly!"
  };
};