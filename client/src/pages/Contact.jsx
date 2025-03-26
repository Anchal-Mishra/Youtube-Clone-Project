const Contact = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg leading-7 text-center mb-6">
        Have questions or feedback? We'd love to hear from you! Reach out to us using the details below.
      </p>
      
      <div className="space-y-4 text-lg leading-7">
        <p><strong>Email:</strong> support@gmail.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-890</p>
      </div>
      
      <form className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;