import React, { useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../utils/userSlice";
import ConnectionsList from "./ConnectionsList";
import Feed from "./Feed";

const Connections = () => {
  const connectionList = useSelector((store) => store.user.connections || []);
  const dispatch = useDispatch();

  console.log("connections ram", connectionList);
  const ConnectionsRes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/getAllConnections",
        {
          withCredentials: true,
        },
      );

      console.log("len:", res.data.data.length);

      console.log("ress:", res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.response?.data?.message || "Error Occurs");
    }
  };

  useEffect(() => {
    ConnectionsRes();
  }, []);

  return (
    <div>
      <h2 className="mb-3 mt-3 text-center  text-4xl font-bold">Connections</h2>
      {connectionList.length > 0 ? (
        connectionList.map((i) => (
          <ConnectionsList key={i._id} data={i} req={false} />
        ))
      ) : (
        <p>No Connection Found</p>
      )}
    </div>
  );
};

export default Connections;
