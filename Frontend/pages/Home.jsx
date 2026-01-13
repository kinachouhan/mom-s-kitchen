import { BsCloud } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOrderNow = () => {
    if (isAuthenticated) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] overflow-hidden flex flex-col justify-center items-center">

        {/* VIDEO */}
        <video
          src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095810.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

          {/* LOGO */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex items-center justify-center">
              <BsCloud className="text-orange-400 text-[90px] sm:text-[110px] md:text-[140px] lg:text-[160px]" />
              <span className="absolute text-white text-sm sm:text-base md:text-lg font-semibold">
                Mom’s
              </span>
            </div>

            <h1 className="text-white font-bold 
              text-3xl 
              sm:text-4xl 
              md:text-6xl 
              lg:text-7xl 
              xl:text-8xl">
              Kitchen
            </h1>
          </div>

          {/* TAGLINE */}
          <p className="text-white 
            text-xs 
            sm:text-sm 
            md:text-base 
            lg:text-lg 
            mb-6 
            max-w-xs 
            sm:max-w-md">
            Fresh, homemade meals made with love ❤️
          </p>

          {/* BUTTON */}
          <button
            onClick={handleOrderNow}
            className="bg-orange-500 hover:bg-orange-600 text-white 
              text-sm 
              sm:text-base 
              md:text-lg 
              lg:text-xl 
              px-6 
              sm:px-8 
              py-2 
              sm:py-3 
              rounded-full 
              font-semibold 
              transition"
          >
            Order Now
          </button>

        </div>
      </div>
    </div>
  );
};
