const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About PhotoPro</h1>
          
          <div className="prose lg:prose-xl">
            <p className="text-lg mb-6">
              Welcome to PhotoPixel, your premier destination for professional photography equipment. Since 2010, we've been serving photographers of all levels with the highest quality cameras, lenses, and accessories.
            </p>
            
            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1452696193712-6cabf5103b63?auto=format&fit=crop&q=80"
                alt="Camera store"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe that every photographer deserves access to the best equipment to capture their vision. Our mission is to provide photographers with not just equipment, but the knowledge and support they need to create amazing images.
            </p>

            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Expert staff with years of photography experience</li>
              <li>Carefully curated selection of premium equipment</li>
              <li>Competitive prices and price match guarantee</li>
              <li>Extended warranty options</li>
              <li>Free shipping on orders over $100</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Our Guarantee</h2>
            <p className="mb-6">
              We stand behind every product we sell. If you're not completely satisfied with your purchase, we offer a 30-day return policy with no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;