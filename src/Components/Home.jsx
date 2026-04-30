import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Feed from "./Feed";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const feedUser = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const feed = async () => {
    try {
      const feedData = await axios.get("http://localhost:3000/user/feedusers", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData.data.users));
      console.log("feedUser", feedUser);
    } catch (err) {
      console.error(err.response?.data?.message || "Error Occurs on Feed");
    }
  };

  useEffect(() => {
    if (!feedUser || feedUser.length === 0) {
      feed();
    }
  }, []);

  useEffect(() => {
    console.log("Updated feedUser:", feedUser);
  }, []);

  return (
    <div>
      <p>
        Welcome {user?.firstName}
        {user?.lastName} Home Page
      </p>
      {feedUser.length > 0 ? (
        <Feed data={feedUser[0]} />
      ) : (
        <p className="text-red-500">No Users Found</p>
      )}
    </div>
  );
};

export default Home;
