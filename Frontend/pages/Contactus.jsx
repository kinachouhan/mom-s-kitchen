import { BsCloud } from "react-icons/bs";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const Contactus = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      
      {/* HEADER */}
      <div className="text-center mb-20">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="relative">
            <BsCloud className="text-orange-400 text-6xl md:text-7xl" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              Mom’s
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Kitchen</h1>
        </div>
        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Have questions or suggestions? We would love to hear from you. Reach out to Mom's Kitchen today!
        </p>
      </div>

      {/* CONTENT GRID */}
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* CONTACT INFO */}
        <div className="md:w-1/3 bg-orange-50 p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Info</h2>
          
          <div className="flex items-center gap-4 text-gray-700">
            <FaPhoneAlt className="text-orange-500 text-xl" />
            <span>+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaEnvelope className="text-orange-500 text-xl" />
            <span>support@momskitchen.com</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaMapMarkerAlt className="text-orange-500 text-xl" />
            <span>Sector 126, Noida, Uttar-Pradesh, India</span>
          </div>

          {/* Optional: Add social links */}
        </div>

        {/* CONTACT FORM */}
        <div className="md:w-2/3 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>

          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
            </div>
            
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
