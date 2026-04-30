import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { addConnectionRequest } from "../utils/userSlice";
import ConnectionsList from "./ConnectionsList";
import Feed from "./Feed";

const ConnectionRequest = () => {
  const connectionList = useSelector(
    (store) => store.user.connectionRequestList || [],
  );
  const [reqList, setReqList] = useState(connectionList);
  console.log("req:", connectionList);
  const dispatch = useDispatch();

  const ConnectionsRes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/getAllReceivedInterestedRequest",
        {
          withCredentials: true,
        },
      );

      console.log("len:", res.data.data.length);

      console.log("ress:", res.data.data);
      dispatch(addConnectionRequest(res.data.data));
    } catch (err) {
      console.log(err.response?.data?.message || "Error Occurs");
    }
  };

  useEffect(() => {
    ConnectionsRes();
  }, []);

  return (
    <div>
      <h2 className="mb-3 mt-3 text-center  text-4xl font-bold">
        Connections Request
      </h2>
      {reqList.length > 0 ? (
        reqList.map((i) => (
          <ConnectionsList key={i._id} data={i.senderId} req={true} />
        ))
      ) : (
        <p className="text-center mt-4">No Connection Request Found</p>
      )}
    </div>
  );
};

export default ConnectionRequest;
