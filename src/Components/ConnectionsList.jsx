import React from "react";
import { useDispatch } from "react-redux";
import { updateConnectionRequest } from "../utils/userSlice";
import axios from "axios";

const ConnectionsList = ({ data, req }) => {
  const dispatch = useDispatch();

  console.log("data.id", data._id);

  const accept = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/connectionRequest/recieved/accepted/${data._id}`,

        { withCredentials: true },
      );
      console.log(res);
      dispatch(updateConnectionRequest(data._id));
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async () => {
    try {
      await axios.get(
        `http://localhost:3000/connectionRequest/recieved/rejected/${data._id}`,

        { withCredentials: true },
        dispatch(updateConnectionRequest(data._id)),
      );
    } catch (err) {
      console.error(err.response?.data?.message || "Error Occurs");
    }
  };
  return (
    <div className="flex border border-black border-r-2 mb-3 shadow-md rounded-md text-left w-1/2 mx-auto p-5">
      <div className="w-1/4">
        <img
          src={data.photoUrl}
          className="w-[150px] h-[150px]"
          alt="user_img"
        />
      </div>
      <div className="ml-5 w-1/2 items-center">
        <h2 className="text-2xl font-bold text-blue-400">
          {data.firstName + " " + data.lastName}
        </h2>
        <p>{data.bio}</p>
        <p>{data.age + " " + data.gender?.toUpperCase()}</p>
        {req && (
          <div className="mt-3">
            <button
              className="bg-red-600 p-1 mr-3 text-white rounded-sm"
              onClick={reject}
            >
              Reject
            </button>
            <button
              className="bg-blue-400 rounded-sm text-white p-1"
              onClick={accept}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsList;
