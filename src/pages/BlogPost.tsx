import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Best Camera Settings for Portrait Photography',
    excerpt: 'Learn the essential camera settings that will help you capture stunning portrait photographs with professional results.',
    content: `
      <h2>Introduction to Portrait Photography</h2>
      <p>Portrait photography is one of the most rewarding genres of photography. It allows you to capture the essence of a person, their personality, and their emotions in a single frame. However, achieving professional-looking portraits requires understanding the right camera settings and techniques.</p>
      
      <h2>Essential Camera Settings</h2>
      <h3>1. Aperture Settings</h3>
      <p>For portraits, you'll typically want to use a wide aperture (low f-number) like f/1.4, f/1.8, or f/2.8. This creates a shallow depth of field, which helps separate your subject from the background and creates that beautiful bokeh effect.</p>
      
      <h3>2. Shutter Speed</h3>
      <p>Your shutter speed should be fast enough to avoid camera shake and motion blur. A good rule of thumb is to use a shutter speed that's at least 1/focal length of your lens. For example, if you're using a 85mm lens, use at least 1/85s.</p>
      
      <h3>3. ISO Settings</h3>
      <p>Keep your ISO as low as possible while maintaining proper exposure. Modern cameras can handle ISO 800-1600 quite well, but try to stay below ISO 3200 for the best image quality.</p>
      
      <h2>Lighting Considerations</h2>
      <p>Good lighting is crucial for portrait photography. Natural light from a window can provide soft, flattering illumination. If shooting outdoors, try to find open shade or use a reflector to fill in harsh shadows.</p>
      
      <h2>Focus and Composition</h2>
      <p>Always focus on the eyes - they're the window to the soul. Use single-point autofocus for precision, and consider the rule of thirds for composition. Don't be afraid to get close and fill the frame with your subject.</p>
      
      <h2>Conclusion</h2>
      <p>Mastering portrait photography takes practice, but understanding these fundamental settings will give you a solid foundation. Remember, the technical aspects are just tools - the most important element is connecting with your subject and capturing their personality.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482b224b8?auto=format&fit=crop&q=80',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Canon EOS R5 vs Sony A7R V: Complete Comparison',
    excerpt: 'A detailed comparison between two flagship mirrorless cameras to help you make the right choice for your photography needs.',
    content: `
      <h2>Introduction</h2>
      <p>When it comes to high-resolution mirrorless cameras, the Canon EOS R5 and Sony A7R V stand out as two of the most capable options available. Both cameras offer exceptional image quality, advanced features, and professional-grade performance.</p>
      
      <h2>Image Quality Comparison</h2>
      <h3>Canon EOS R5</h3>
      <ul>
        <li>45MP Full-Frame CMOS Sensor</li>
        <li>Excellent dynamic range</li>
        <li>Superior color science</li>
        <li>ISO range: 100-51,200 (expandable to 102,400)</li>
      </ul>
      
      <h3>Sony A7R V</h3>
      <ul>
        <li>61MP Full-Frame CMOS Sensor</li>
        <li>Outstanding detail resolution</li>
        <li>Impressive low-light performance</li>
        <li>ISO range: 100-32,000 (expandable to 102,400)</li>
      </ul>
      
      <h2>Autofocus Performance</h2>
      <p>Both cameras feature advanced autofocus systems with subject detection capabilities. The Canon R5 uses Dual Pixel CMOS AF II with 1,053 AF points, while the Sony A7R V employs a 693-point phase-detection system with real-time tracking.</p>
      
      <h2>Video Capabilities</h2>
      <p>The Canon R5 offers 8K RAW video recording, making it a favorite among videographers. The Sony A7R V focuses more on photography but still provides excellent 4K video quality with advanced codecs.</p>
      
      <h2>Build Quality and Ergonomics</h2>
      <p>Both cameras feature weather-sealed magnesium alloy bodies. The Canon R5 has a more traditional DSLR-like grip, while the Sony A7R V offers a more compact form factor with excellent customization options.</p>
      
      <h2>Verdict</h2>
      <p>Choose the Canon R5 if you need superior video capabilities and prefer Canon's color science. Opt for the Sony A7R V if maximum resolution and compact size are your priorities. Both are excellent choices for professional photography.</p>
    `,
    author: 'Michael Chen',
    date: '2024-01-12',
    category: 'Camera Reviews',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Essential Accessories Every Photographer Needs',
    excerpt: 'Discover the must-have accessories that can significantly improve your photography workflow and image quality.',
    content: `
      <h2>Building Your Photography Kit</h2>
      <p>Beyond having a great camera and lens, there are several accessories that can significantly enhance your photography experience and help you capture better images. Here's a comprehensive guide to the essential accessories every photographer should consider.</p>
      
      <h2>1. Tripods and Support Systems</h2>
      <h3>Carbon Fiber Tripods</h3>
      <p>A sturdy tripod is essential for sharp images in low light, long exposures, and precise compositions. Carbon fiber tripods offer the best balance of strength and weight, making them ideal for travel and outdoor photography.</p>
      
      <h3>Monopods</h3>
      <p>For situations where a tripod is too bulky, a monopod provides stability while maintaining mobility. Perfect for sports and wildlife photography.</p>
      
      <h2>2. Filters</h2>
      <h3>Polarizing Filters</h3>
      <p>Reduce reflections, enhance sky contrast, and improve color saturation. Essential for landscape photography.</p>
      
      <h3>Neutral Density Filters</h3>
      <p>Allow longer exposures for creative effects like smooth water and cloud movement. Available in various strengths from 3-stop to 10-stop.</p>
      
      <h2>3. Lighting Equipment</h2>
      <h3>External Flash Units</h3>
      <p>Provide more power and flexibility than built-in flash. Look for TTL compatibility and wireless triggering capabilities.</p>
      
      <h3>Reflectors and Diffusers</h3>
      <p>Control natural light by bouncing or softening it. Collapsible 5-in-1 reflectors are versatile and portable.</p>
      
      <h2>4. Storage and Protection</h2>
      <h3>Camera Bags</h3>
      <p>Protect your investment with a quality camera bag. Consider your shooting style - backpacks for hiking, shoulder bags for street photography.</p>
      
      <h3>Memory Cards and Storage</h3>
      <p>Fast, reliable memory cards are crucial. Always carry spares and consider a portable backup solution.</p>
      
      <h2>5. Cleaning and Maintenance</h2>
      <p>Keep your gear in top condition with proper cleaning supplies: lens cloths, sensor cleaning kits, and blowers for dust removal.</p>
      
      <h2>Conclusion</h2>
      <p>While you don't need every accessory immediately, building your kit gradually based on your photography style will enhance your creative possibilities and help you capture better images consistently.</p>
    `,
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    category: 'Gear Guide',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Understanding Lens Focal Lengths: A Beginner\'s Guide',
    excerpt: 'Learn how different focal lengths affect your images and which lenses are best for different types of photography.',
    content: `
      <h2>What is Focal Length?</h2>
      <p>Focal length is one of the most important concepts in photography. It determines the angle of view, magnification, and perspective of your images. Measured in millimeters, focal length affects how much of the scene you can capture and how close or distant subjects appear.</p>
      
      <h2>Wide-Angle Lenses (14-35mm)</h2>
      <h3>Characteristics:</h3>
      <ul>
        <li>Wide field of view</li>
        <li>Great depth of field</li>
        <li>Exaggerated perspective</li>
        <li>Can create distortion at edges</li>
      </ul>
      
      <h3>Best for:</h3>
      <ul>
        <li>Landscape photography</li>
        <li>Architecture</li>
        <li>Interior photography</li>
        <li>Group photos in tight spaces</li>
      </ul>
      
      <h2>Standard Lenses (35-85mm)</h2>
      <h3>50mm - The "Normal" Lens</h3>
      <p>A 50mm lens on full-frame cameras provides a field of view similar to human vision, making it perfect for natural-looking images.</p>
      
      <h3>Best for:</h3>
      <ul>
        <li>Street photography</li>
        <li>Portraits</li>
        <li>General photography</li>
        <li>Documentary work</li>
      </ul>
      
      <h2>Telephoto Lenses (85-300mm+)</h2>
      <h3>Characteristics:</h3>
      <ul>
        <li>Narrow field of view</li>
        <li>Shallow depth of field</li>
        <li>Compression effect</li>
        <li>Subject isolation</li>
      </ul>
      
      <h3>Best for:</h3>
      <ul>
        <li>Portrait photography</li>
        <li>Wildlife photography</li>
        <li>Sports photography</li>
        <li>Isolating subjects</li>
      </ul>
      
      <h2>Macro Lenses</h2>
      <p>Designed for close-up photography, macro lenses can reproduce subjects at life-size (1:1 magnification) or greater. They're essential for photographing small subjects like insects, flowers, and product details.</p>
      
      <h2>Zoom vs Prime Lenses</h2>
      <h3>Zoom Lenses</h3>
      <ul>
        <li>Versatile focal length range</li>
        <li>Convenient for travel</li>
        <li>May sacrifice some image quality</li>
      </ul>
      
      <h3>Prime Lenses</h3>
      <ul>
        <li>Fixed focal length</li>
        <li>Often sharper and faster</li>
        <li>Forces creative composition</li>
      </ul>
      
      <h2>Choosing the Right Focal Length</h2>
      <p>Consider your photography style and subjects. Landscape photographers often prefer wide-angle lenses, while portrait photographers gravitate toward 85-135mm focal lengths. Sports and wildlife photographers need long telephoto lenses.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding focal length is crucial for developing your photographic vision. Start with a versatile lens like a 24-70mm zoom or 50mm prime, then expand your kit based on your interests and shooting style.</p>
    `,
    author: 'David Park',
    date: '2024-01-08',
    category: 'Photography Basics',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Low Light Photography: Tips and Techniques',
    excerpt: 'Master the art of shooting in challenging lighting conditions with these professional tips and techniques.',
    content: `
      <h2>Mastering Low Light Photography</h2>
      <p>Low light photography can be challenging but incredibly rewarding. Whether you're shooting cityscapes at night, indoor events, or moody portraits, understanding how to work with limited light will expand your creative possibilities.</p>
      
      <h2>Camera Settings for Low Light</h2>
      <h3>1. ISO Performance</h3>
      <p>Modern cameras can handle high ISO values much better than older models. Don't be afraid to push your ISO to 1600, 3200, or even higher if needed. It's better to have a sharp, slightly noisy image than a blurry one.</p>
      
      <h3>2. Aperture Considerations</h3>
      <p>Use the widest aperture available (lowest f-number) to let in maximum light. However, be aware that very wide apertures reduce depth of field, so focus accuracy becomes critical.</p>
      
      <h3>3. Shutter Speed Balance</h3>
      <p>Find the balance between avoiding camera shake and capturing enough light. Use the reciprocal rule (1/focal length) as a starting point, but image stabilization can help you go slower.</p>
      
      <h2>Essential Equipment</h2>
      <h3>Fast Lenses</h3>
      <p>Lenses with wide maximum apertures (f/1.4, f/1.8, f/2.8) are invaluable for low light work. They allow more light to reach the sensor and provide better autofocus performance in dim conditions.</p>
      
      <h3>Sturdy Tripod</h3>
      <p>For static subjects, a tripod allows you to use longer exposures with low ISO for maximum image quality. Carbon fiber tripods offer the best stability-to-weight ratio.</p>
      
      <h3>External Flash</h3>
      <p>When ambient light isn't sufficient, a powerful external flash with bounce capabilities can provide natural-looking illumination.</p>
      
      <h2>Focusing in Low Light</h2>
      <h3>Autofocus Techniques</h3>
      <ul>
        <li>Use single-point AF for precision</li>
        <li>Enable AF assist beam if available</li>
        <li>Focus on high-contrast areas</li>
        <li>Use live view and magnification for critical focus</li>
      </ul>
      
      <h3>Manual Focus</h3>
      <p>When autofocus struggles, switch to manual focus. Use your camera's focus peaking or magnification features to ensure accuracy.</p>
      
      <h2>Creative Techniques</h2>
      <h3>Light Trails</h3>
      <p>Use long exposures to capture moving lights as trails. Car headlights, star trails, and light painting all create dynamic images.</p>
      
      <h3>Silhouettes</h3>
      <p>Position subjects against brighter backgrounds to create dramatic silhouettes. Expose for the background to keep subjects dark.</p>
      
      <h2>Post-Processing Tips</h2>
      <h3>Noise Reduction</h3>
      <p>Use software like Adobe Lightroom or specialized tools like DxO PureRAW to reduce noise while preserving detail.</p>
      
      <h3>Shadow/Highlight Recovery</h3>
      <p>RAW files contain more information than JPEGs, allowing you to recover details from shadows and highlights in post-processing.</p>
      
      <h2>Common Challenges and Solutions</h2>
      <h3>Camera Shake</h3>
      <p>Use proper hand-holding technique, enable image stabilization, and consider increasing ISO rather than using slower shutter speeds.</p>
      
      <h3>Mixed Lighting</h3>
      <p>Different light sources have different color temperatures. Use custom white balance or correct in post-processing for accurate colors.</p>
      
      <h2>Conclusion</h2>
      <p>Low light photography requires patience and practice, but the results can be incredibly rewarding. Don't be afraid to experiment with settings and push your equipment's limits. Remember, a technically imperfect but emotionally compelling image is often better than a technically perfect but boring one.</p>
    `,
    author: 'Lisa Wang',
    date: '2024-01-05',
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80',
    readTime: '9 min read'
  },
  {
    id: '6',
    title: 'The Future of Mirrorless Cameras in 2024',
    excerpt: 'Explore the latest trends and innovations in mirrorless camera technology and what to expect in the coming year.',
    content: `
      <h2>The Mirrorless Revolution Continues</h2>
      <p>The mirrorless camera market continues to evolve rapidly, with manufacturers pushing the boundaries of what's possible in compact, lightweight bodies. As we move through 2024, several key trends are shaping the future of photography.</p>
      
      <h2>Technological Advancements</h2>
      <h3>Sensor Technology</h3>
      <p>New sensor designs are delivering better low-light performance, higher resolution, and improved dynamic range. Stacked sensors with faster readout speeds are becoming more common, enabling better video capabilities and reduced rolling shutter.</p>
      
      <h3>AI-Powered Features</h3>
      <p>Artificial intelligence is revolutionizing autofocus systems, with cameras now capable of recognizing and tracking various subjects including people, animals, vehicles, and even specific objects like aircraft.</p>
      
      <h2>Video Capabilities</h2>
      <h3>8K Recording</h3>
      <p>More cameras are offering 8K video recording, providing incredible detail for professional video production and allowing for 4K crops without quality loss.</p>
      
      <h3>Internal Recording</h3>
      <p>Advanced codecs and faster processors enable high-quality internal recording, reducing the need for external recorders for many applications.</p>
      
      <h2>Computational Photography</h2>
      <h3>In-Camera Processing</h3>
      <p>Cameras are incorporating more computational photography features, including:</p>
      <ul>
        <li>High-resolution mode (pixel shift)</li>
        <li>Focus stacking</li>
        <li>HDR bracketing</li>
        <li>Noise reduction algorithms</li>
      </ul>
      
      <h2>Connectivity and Workflow</h2>
      <h3>Wireless Capabilities</h3>
      <p>Improved Wi-Fi and Bluetooth connectivity enable seamless file transfer, remote control, and cloud integration. Some cameras now support direct upload to social media platforms.</p>
      
      <h3>Mobile Integration</h3>
      <p>Smartphone apps are becoming more sophisticated, offering advanced remote control features and streamlined editing workflows.</p>
      
      <h2>Sustainability Focus</h2>
      <h3>Environmental Considerations</h3>
      <p>Manufacturers are increasingly focusing on sustainability, using recycled materials and designing cameras for longer lifespans with firmware updates extending functionality.</p>
      
      <h2>Market Predictions</h2>
      <h3>Price Accessibility</h3>
      <p>As technology matures, advanced features are trickling down to more affordable models, making professional-grade capabilities accessible to a broader audience.</p>
      
      <h3>Specialized Cameras</h3>
      <p>We're seeing more specialized cameras designed for specific use cases, such as astro-photography, sports, or content creation.</p>
      
      <h2>Challenges Ahead</h2>
      <h3>Battery Life</h3>
      <p>Despite improvements, battery life remains a concern for mirrorless cameras, especially with power-hungry features like 8K video and constant electronic viewfinder use.</p>
      
      <h3>Lens Ecosystem</h3>
      <p>While native lens selections are expanding rapidly, some photographers still miss certain specialized lenses available for DSLR systems.</p>
      
      <h2>What to Expect</h2>
      <p>The future of mirrorless cameras looks bright, with continued improvements in image quality, performance, and user experience. We can expect to see more AI integration, better video capabilities, and increasingly sophisticated computational photography features.</p>
      
      <h2>Conclusion</h2>
      <p>Mirrorless cameras have firmly established themselves as the future of photography. With rapid technological advancement and growing lens ecosystems, they offer compelling advantages over traditional DSLRs. Whether you're a professional photographer or enthusiast, the mirrorless revolution offers exciting possibilities for creative expression.</p>
    `,
    author: 'Alex Thompson',
    date: '2024-01-03',
    category: 'Industry News',
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    readTime: '10 min read'
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
          <button
            onClick={() => navigate('/blog')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center text-white hover:text-gray-300 mb-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </button>
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600 text-white">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-300 space-x-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(relatedPost.date)}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;