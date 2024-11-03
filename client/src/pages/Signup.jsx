import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Oauth from "../components/Oauth";
import { useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import { baseUrl } from "../helper/baseUrl";
import { ThreeDots } from "react-loader-spinner";
const Signup = () => {
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState("")
  const [openEye, setOpenEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registerInfo = Object.fromEntries(formData);
    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      setLoading(false);
      setError(null);
      const fetchData = await res.json();

      if (fetchData.success) {
        toast.success(fetchData.message);
       
        e.target.reset();
        navigate("/signin");
      }

      if (fetchData.error) {
        setError(fetchData.message);
         console.log(fetchData?.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // password hints 

  let format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    function containsSpecialChracter(str) {
      return format.test(str);
    }
  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
    function containsLowercase(str) {
      return /[a-z]/.test(str);
  }
    function containsNumber(str) {
      return /[0-9]/.test(str);
    }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <Breadcrumb title="Signup" />
      <div className=" flex flex-col  px-5 justify-center h-fit py-5">
        <h3 className="text-3xl font-medium text-gray-800 py-3 text-center">
          Create Account
        </h3>
        <div className="w-full mx-auto flex justify-center mb-5">
          <img
            src="/EstateMart.png"
            alt="logo"
            className="w-[100px]  object-cover"
          />
        </div>
        <form
          className="w-full flex flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="focus:outline-none bg-white rounded-md py-2 px-3 sm:max-w-[40%] w-full"
          />
          <div className="relative sm:max-w-[40%] w-full">
            <input
              type={openEye ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="focus:outline-none bg-white rounded-md py-2 px-3 w-full"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            {!openEye ? (
              <span className="absolute right-3 top-3 cursor-pointer">
                <RiEyeLine onClick={() => setOpenEye(true)} />
              </span>
            ) : (
              <span className="absolute right-3 top-3 cursor-pointer">
                <RiEyeCloseFill onClick={() => setOpenEye(false)} />
              </span>
            )}

            <div className="flex justify-between mt-2">
              <div>
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={passwordValue.length}
                    className={`w-[10px] h-[10px] ${
                      (passwordValue.length >= 8) &&
                      "accent-green-700"
                    }`}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    checked={passwordValue.length >= 8}
                  />
                  <span
                    className={`text-xs  ${
                      passwordValue.length >= 8
                        ? "text-green-700 font-medium"
                        : "text-gray-600 font-light"
                    }`}
                  >
                    password minimum eight characters
                  </span>
                </span>
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={passwordValue}
                    className={`w-[10px] h-[10px] ${
                      containsUppercase(passwordValue) && "accent-green-700"
                    }`}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    checked={containsUppercase(passwordValue)}
                  />
                  <span
                    className={`text-xs  ${
                      containsUppercase(passwordValue)
                        ? "text-green-700 font-medium"
                        : "text-gray-600 font-light"
                    }`}
                  >
                    At least one uppercase
                  </span>
                </span>
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={passwordValue}
                    className={`w-[10px] h-[10px] ${
                      containsLowercase(passwordValue) && "accent-green-700"
                    }`}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    checked={containsLowercase(passwordValue)}
                  />
                  <span
                    className={`text-xs  ${
                      containsLowercase(passwordValue)
                        ? "text-green-700 font-medium"
                        : "text-gray-600 font-light"
                    }`}
                  >
                    At least one lowercase
                  </span>
                </span>
              </div>
              <div>
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={passwordValue}
                    className={`w-[10px] h-[10px] ${
                      containsNumber(passwordValue) && "accent-green-700"
                    }`}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    checked={containsNumber(passwordValue)}
                  />
                  <span
                    className={`text-xs  ${
                      containsNumber(passwordValue)
                        ? "text-green-700 font-medium"
                        : "text-gray-600 font-light"
                    }`}
                  >
                    At least one number
                  </span>
                </span>
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={passwordValue}
                    className={`w-[10px] h-[10px] ${
                      containsSpecialChracter(passwordValue) &&
                      "accent-green-700"
                    }`}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    checked={containsSpecialChracter(passwordValue)}
                  />
                  <span
                    className={`text-xs  ${
                      containsSpecialChracter(passwordValue)
                        ? "text-green-700 font-medium"
                        : "text-gray-600 font-light"
                    }`}
                  >
                    At least one special character
                  </span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className=" bg-blue rounded-md py-2 px-3 sm:max-w-[40%] w-full text-white hover:opacity-90 transition-all duration-150 ease-in-out disabled:opacity-90 flex justify-center items-center"
          >
            {loading ? (
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="w-full mx-auto flex justify-center my-5">
          <Oauth />
        </div>

        {error && (
          <div className="sm:max-w-[40%] w-full mx-auto mt-5 bg-megenta/80 rounded-md py-2 px-3">
            <span className="  text-white   w-full">{error}</span>
          </div>
        )}

        <div className="sm:max-w-[40%] w-full mx-auto my-5">
          <p className="text-sm font-medium text-gray-600 ">
            Already have an account?
            <Link to="/signin">
              <span className="text-blue hover:underline pl-1 font-semibold">
                Signin
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
