const About = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">About Us</h1>
      <p className="text-lg leading-7 mb-6 text-gray-700 text-center">
        Welcome to <strong>My YouTube</strong>, your ultimate platform for
        uploading, exploring, and sharing videos across a variety of categories.
        Whether you're a creator, educator, or viewer, we provide a space to fuel
        creativity, innovation, and connection.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Features</h2>
      <ul className="list-disc list-inside text-lg leading-7 text-gray-700 space-y-2">
        <li><strong>Create & Share:</strong> Build your channel, upload videos, and share with the world.</li>
        <li><strong>Discover Content:</strong> Explore videos in Gaming, Tech, Anime, Travel, and more.</li>
        <li><strong>Engage:</strong> Like, comment, and connect with a thriving community.</li>
        <li><strong>Personalize:</strong> Customize your channel to showcase your unique brand.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Our Technology Stack</h2>
      <ul className="list-disc list-inside text-lg leading-7 text-gray-700 space-y-2">
        <li><strong>MERN Stack:</strong> MongoDB, Express.js, React.js, and Node.js.</li>
        <li><strong>TypeScript:</strong> Ensuring type safety and scalability.</li>
        <li><strong>Redux:</strong> Managing state for a seamless experience.</li>
        <li><strong>Tailwind CSS:</strong> Crafting a modern, responsive design.</li>
        <li><strong>Cloudinary:</strong> Optimizing media uploads and storage.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Our Vision</h2>
      <p className="text-lg leading-7 mb-6 text-gray-700">
        At <strong>My YouTube</strong>, we believe in empowering everyone to share their voice.
        Whether you're an aspiring filmmaker, a tech enthusiast, or just exploring, we provide
        an inclusive, dynamic, and inspiring platform to showcase creativity.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Contact Us</h2>
      <p className="text-lg leading-7 text-gray-700">We'd love to hear your feedback!</p>
      <ul className="list-none text-lg leading-7 text-gray-700 space-y-2">
        <li><strong>Email:</strong> support@gmail.com</li>
        
      </ul>
    </div>
  );
};

export default About;
