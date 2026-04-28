import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <p>
        Welcome {user?.firstName}
        {user?.lastName} Home Page
      </p>
    </div>
  );
};

export default Home;
