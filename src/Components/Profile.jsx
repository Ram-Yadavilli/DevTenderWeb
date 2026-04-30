import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, addUser } from "../utils/userSlice";
import axios from "axios";

import Feed from "./Feed";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("ram100", user);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl:
      user?.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });
  const [sucessMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setUserData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
      age: user?.age || "",
      gender: user?.gender || "",
      photoUrl:
        user?.photoUrl ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    });
  }, [user]);

  console.log("ram", user);

  const editBtn = async () => {
    await axios.patch("http://localhost:3000/profile/updateUser", userData, {
      withCredentials: true,
    });
    dispatch(editUser(userData));
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 10000);
  };

  const changeE = (e) => {
    const { name, value } = e.target;
    setUserData((i) => ({ ...i, [name]: value }));
  };

  return (
    <div className="h-[80vh] flex justify-center flex-col">
      {sucessMsg && (
        <div className="w-[300px] mx-auto text-white text-center mb-3">
          <div className="alert alert-success text-white pl-[40px]">
            <span className="font-bold">Successfully Updated Profile</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="card card-dash bg-base-100 w-96 h-[500px] my-auto shadow-2xl mr-5">
          <div className="card-body flex ">
            <h1 className="card-title font-bold mx-auto">Edit Profile</h1>
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">First Name</legend>
              <input
                type="text"
                className="input"
                name="firstName"
                placeholder="Type here"
                value={userData.firstName}
                onChange={changeE}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Last Name</legend>
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="Type here"
                value={userData.lastName}
                onChange={changeE}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Bio</legend>
              <textarea name="bio" value={userData.bio} onChange={changeE} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Age</legend>
              <input
                type="number"
                name="age"
                className="input"
                placeholder="Type here"
                value={userData.age}
                onChange={changeE}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                name="gender"
                value={userData?.gender || ""}
                className="select mt-4"
                onChange={changeE}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <input
                type="button"
                value="Edit Profile"
                onClick={editBtn}
                className="btn w-20  bg-blue-300 mx-auto font-bold"
              />
            </fieldset>
          </div>
        </div>
        <Feed data={userData} />
      </div>
    </div>
  );
};

export default Profile;
