import { BsCloud } from "react-icons/bs";
import { FaHeart, FaLeaf, FaTruck } from "react-icons/fa";

export const About = () => {
  return (
    <section className="w-full pb-16">

      {/* ===== TOP HERO SECTION ===== */}
      <div className="bg-orange-500 text-white text-center px-4 py-20">

        {/* LOGO */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="relative">
            <BsCloud className="text-white text-6xl md:text-7xl" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              Mom’s
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Kitchen
          </h1>
        </div>

        {/* HERO TEXT */}
        <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-orange-50">
          Mom’s Kitchen is built with one simple idea —
          <span className="font-semibold text-white">
            {" "}serve fresh, homemade food just like mom makes at home.
          </span>
          <br />
          No preservatives. No compromise. Only love ❤️
        </p>
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Why Mom’s Kitchen?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We understand how difficult it is to find hygienic, tasty,
            home-style food outside. That’s why Mom’s Kitchen focuses on
            carefully cooked meals using fresh ingredients and traditional
            recipes.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every dish is prepared with attention to quality, nutrition,
            and comfort — just like home food should be.
          </p>
        </div>

        {/* RIGHT FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
            <FaHeart className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Made with Love
            </h3>
            <p className="text-sm text-gray-600">
              Every meal is cooked with care, warmth and homely love.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
            <FaLeaf className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Fresh Ingredients
            </h3>
            <p className="text-sm text-gray-600">
              We use fresh vegetables, spices and quality raw materials.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center sm:col-span-2 hover:shadow-md transition">
            <FaTruck className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Fast & Reliable Delivery
            </h3>
            <p className="text-sm text-gray-600">
              Your food is delivered hot, fresh and on time.
            </p>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM CTA ===== */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-orange-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Taste the comfort of home 🍽️
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Order from Mom’s Kitchen today and enjoy meals made with care.
          </p>
        </div>
      </div>

    </section>

  );
};
