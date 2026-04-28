import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-[60vh]">
      <h1>Profile Page</h1>
      <p> Wellcome {user?.firstName} </p>
    </div>
  );
};

export default Profile;
