import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../helper/baseUrl";
import ListingItem from "../components/ListingItem";
import { Helmet } from "react-helmet";
import { CirclesWithBar } from "react-loader-spinner";
import Slider from "react-slick";
const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/listing/search?offer=true&limit=5`);
        const data = await res.json();
        if (data) {
          setLoading(false);
          setOfferListings(data);
          fetchRentListings();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/listing/search?type=rent&limit=5`);
        const data = await res.json();
        if (data) {
          setLoading(false);
          setRentListings(data);
          fetchSellListings();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    const fetchSellListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/listing/search?type=sell&limit=5`);
        const data = await res.json();
        if (data) {
          setLoading(false);
          setSellListings(data);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

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
    <>
      <Helmet>
        <title>Estate Mart</title>
      </Helmet>
      <div className="mt-20  max-w-6xl mx-auto xl:px-0 px-3 ">
        <div className="w-full flex flex-col gap-4 py-6">
          <h1 className=" lg:text-6xl text-3xl font-semibold text-gray-800">
            Find your next <span className="text-megenta">perfect</span> <br />{" "}
            place with ease
          </h1>
          <p className="py-3 lg:text-sm text-xs  font-medium text-gray-600 leading-6">
            Estate mart will help you find your home fast, easy and comfortable.{" "}
            <br /> We have a wide range of properties for you to choose them.{" "}
          </p>
          <Link
            to="/search"
            className="text-blue font-bold lg:text-lg text-base hover:underline w-fit"
          >
            Let{"'"}s Get Started...{" "}
          </Link>
        </div>
      </div>
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
              offerListings &&
              offerListings.length > 0 &&
              offerListings.map((image, index) => (
                <div key={index}>
                  <div
                    className="h-full w-full sm:bg-cover bg-contain sm:min-h-[80vh] xs:min-h-[50vh] min-h-[33vh] bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${image?.images[0].url}) `,
                    }}
                  ></div>
                </div>
              ))}
          </Slider>
        )}
      </div>
      <div className="max-w-6xl mx-auto xl:px-0 px-3 py-6">
        <h5 className="text-xl font-semibold text-gray-800 pb-1 ">
          Recent Offer
        </h5>
        <Link
          to="/search?offer=true"
          className="hover:underline text-sm font-semibold text-blue   w-fit"
        >
          View More Offers...
        </Link>
        <div className="  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 place-items-center py-5">
          {loading ? (
            <div className="flex justify-center items-center  opacity-50 lg:col-span-5 md:col-span-4 sm:col-span-3 xs:col-span-2 col-span-1">
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
            !loading &&
            offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          )}
        </div>
        <hr className=" border-gray-300 pb-1" />
        <h5 className="text-xl font-semibold text-gray-800 pb-1 ">
          Apartment For Rent
        </h5>
        <Link
          to="/search?type=rent"
          className="hover:underline text-sm font-semibold text-blue  w-fit"
        >
          View More Appartment...
        </Link>
        <div className="  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 place-items-center py-5">
          {loading ? (
            <div className="flex justify-center items-center  opacity-50 lg:col-span-5 md:col-span-4 sm:col-span-3 xs:col-span-2 col-span-1">
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
            !loading &&
            rentListings &&
            rentListings.length > 0 &&
            rentListings.map((rent) => (
              <ListingItem key={rent._id} listing={rent} />
            ))
          )}
        </div>
        <hr className=" border-gray-300 pb-1" />
        <h5 className="text-xl font-semibold text-gray-800 pb-1 ">
          Apartment For Sell
        </h5>
        <Link
          to="/search?type=sell"
          className="hover:underline text-sm font-semibold text-blue  w-fit"
        >
          View More Appartment...
        </Link>
        <div className="  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 place-items-center py-5">
          {loading ? (
            <div className="flex justify-center items-center  opacity-50 lg:col-span-5 md:col-span-4 sm:col-span-3 xs:col-span-2 col-span-1">
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
            !loading &&
            sellListings &&
            sellListings.length > 0 &&
            sellListings.map((sell) => (
              <ListingItem key={sell._id} listing={sell} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
