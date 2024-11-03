import { useEffect, useState } from "react";
import { baseUrl } from "../helper/baseUrl";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { MdLocationOn } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { FaBath, FaParking, FaChair } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import { Helmet } from "react-helmet";
import { CirclesWithBar } from "react-loader-spinner";
import Slider from "react-slick";

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [listingData, setListingData] = useState(null);
  const [contact, setContact] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${baseUrl}/listing/get-listing/${id}`);
        const fetchRes = await res.json();
        if (fetchRes?.success) {
          setLoading(false);
          setError(false);
          setListingData(fetchRes?.data);
        }
        if (fetchRes?.error) {
          setLoading(false);
          setError("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getListing();
  }, [id]);

 const settings = {
   dots: true,
   infinite: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
   speed: 2000,
   autoplaySpeed: 5000,
   cssEase: "linear",
 };


  return (
    <div className="mt-20 relative">
      <div className="absolute z-10 -top-2 left-24">
        <Breadcrumb title="Listing" />
      </div>
      <Helmet>
        <title>Estate Mart - Listing</title>
      </Helmet>
      <div className=" flex flex-col  justify-center h-fit py-5 ">
        {loading && (
          <p className="flex justify-center w-full text-xl font-semibold ">
            Loading...
          </p>
        )}
        {error && (
          <p className="flex justify-center w-full text-xl font-semibold ">
            {error}
          </p>
        )}

        {listingData && !loading && !error && (
          <div>
            <div>
              {loading ? (
                <div className="flex justify-center items-center w-full opacity-50">
                  {" "}
                  <CirclesWithBar
                    height="40"
                    width="40"
                    color="#36454F"
                    outerCircleColor="#36454F"
                    innerCircleColor="#36454F"
                    barColor="#36454F"
                    ariaLabel="circles-with-bar-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <Slider {...settings}>
                  {!loading &&
                    listingData.images &&
                    listingData.images.length > 0 &&
                    listingData.images.map((image, index) => (
                      <div key={index}>
                        <div
                          className="h-full w-full sm:bg-cover bg-contain sm:min-h-[80vh] xs:min-h-[50vh] min-h-[33vh] bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${image?.url}) `,
                          }}
                        ></div>
                      </div>
                    ))}
                </Slider>
              )}
            </div>

            <div className="max-w-5xl mx-auto py-5 px-3 sm:px-5">
              <h3 className="md:text-3xl lg:text-4xl text-2xl font-semibold text-gray-900">
                {listingData?.name} - $
                {listingData?.offer
                  ? listingData?.regularPrice - listingData?.discountPrice
                  : listingData?.regularPrice}
              </h3>
              <div className="flex items-center gap-1 mt-5 ">
                <span className="text-green-700 text-lg ">
                  <MdLocationOn />
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {listingData?.address}
                </span>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <span className="sm:text-lg text-base font-medium bg-megenta w-[100px] flex justify-center text-white  rounded py-[2px]">
                  {listingData?.type === "rent" ? " For Rent" : "For Sell"}
                </span>
                {listingData?.offer && (
                  <span className="sm:text-lg text-base whitespace-nowrap font-medium bg-green-700 w-[100px] px-2 flex justify-center text-white  rounded py-[2px]">
                    $
                    {`${
                      listingData?.discountPrice
                        ? listingData?.discountPrice
                        : null
                    } `}{" "}
                    Discount
                  </span>
                )}
              </div>
              <p className="mt-5 text-sm font-medium text-gray-700">
                {listingData?.description}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <div className="flex items-center gap-1 text-sm font-medium text-green-700">
                  <span className="">
                    <IoBed />
                  </span>
                  <span>
                    {listingData?.bedroom}{" "}
                    {listingData?.bedroom > 1 ? "Beds" : "Bed"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="">
                    <FaBath />
                  </span>
                  <span>
                    {listingData?.bathroom}{" "}
                    {listingData?.bathroom > 1 ? "Baths" : "Bath"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="">
                    <FaParking />
                  </span>
                  <span>
                    {listingData?.parking ? "Parking Available" : "No Parking"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="">
                    <FaChair />
                  </span>
                  <span>
                    {listingData?.furnished ? "Furnished" : "Not Furnished"}
                  </span>
                </div>
              </div>
              {currentUser &&
                listingData?.userRef !== currentUser._id &&
                !contact && (
                  <div className="w-full mt-5">
                    <button
                      onClick={() => setContact(true)}
                      className="bg-gray-600/90 transition-all duration-150 ease-in-out text-white px-2 py-2 rounded-full w-full uppercase hover:bg-gray-600"
                    >
                      Contact Landlord
                    </button>
                  </div>
                )}
              {contact && <Contact listingData={listingData} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
