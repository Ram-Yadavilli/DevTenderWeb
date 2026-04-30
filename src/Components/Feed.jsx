import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";

const Feed = ({ data }) => {
  const user = useSelector((state) => state.user.user);
  console.log("feed", data);
  const dispatch = useDispatch();
  let { firstName, lastName, age, gender, photoUrl, bio, _id } = data;
  if (!_id) {
    _id = undefined;
  }

  const accept = async () => {
    try {
      await axios.post(
        `http://localhost:3000/connectionRequest/sendRequest/liked/${_id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeFeed(_id));
    } catch (err) {
      console.error(err.response?.data?.message || "Error Occurs");
    }
  };

  const reject = async () => {
    try {
      await axios.post(
        `http://localhost:3000/connectionRequest/sendRequest/disliked/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error(err.response?.data?.message || "Error Occurs");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-blue-200 w-96 shadow-sm ">
        <figure>
          <img
            src={photoUrl}
            style={{ width: "250px" }}
            className="mt-2"
            alt="user"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{bio}</p>
          {age && gender && (
            <p>
              {age} {gender.toUpperCase()}
            </p>
          )}
          <div className="card-actions justify-center">
            <button
              onClick={reject}
              disabled={_id === undefined}
              className="bg-red-500 hover:bg-red:700 text-white px-4 py-2 rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={accept}
              disabled={_id === undefined}
              className="bg-blue-500 hover:bg-blue:700 text-white  px-4 py-2 rounded-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
