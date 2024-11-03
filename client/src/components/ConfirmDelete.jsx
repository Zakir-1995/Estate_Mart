import toast from "react-hot-toast";
import { baseUrl } from "../helper/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteUserStart,deleteUserSuccess,deleteUserFailure } from "../redux/userSlice";
/* eslint-disable react/prop-types */
const ConfirmDelete = ({ handleConfirmModal, id, handleShowListings }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteListing = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/listing/delete-listing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setLoading(false);
      const fetchData = await res.json();
      if (fetchData?.success) {
        toast.success(fetchData?.message);
        handleShowListings();
      }
      if (fetchData?.error) {
        toast.error(fetchData?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${baseUrl}/user/delete-user/${currentUser?._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchData = await res.json();
      if (fetchData?.success) {
     dispatch(deleteUserSuccess());
        toast.success(fetchData?.message);
      }
      if (fetchData?.error) {
        toast.error(fetchData?.message);
       dispatch(deleteUserFailure(fetchData?.error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white max-w-[500px] w-full min-h-[300px] rounded-md shadow-md flex flex-col justify-center  items-center gap-10">
      <h2 className="md:text-3xl text-2xl font-medium text-gray-800">
        Are You Sure!
      </h2>

      <div className="flex items-center justify-end gap-5">
        <button
          onClick={() => handleConfirmModal()}
          className="md:text-xl text-lg font-medium text-white bg-green-500 px-4 py-1 rounded-md hover:bg-green-600 transition-all duration-100 ease-linear"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleDeleteListing(id);
            handleConfirmModal();
            !id && handleDeleteUser();
          }}
          className="md:text-xl text-lg font-medium text-white bg-megenta px-4 py-1 rounded-md hover:bg-megenta/85 transition-all duration-100 ease-linear"
        >
          {loading ? "loading..." : " Delete"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
