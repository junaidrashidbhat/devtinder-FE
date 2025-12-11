import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { Check, MessageSquare, X } from "lucide-react";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("connections"); // default tab
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const acceptRequest = async (id) => {
    try {
      console.log("BaseUrlid", BaseUrl + "/request/review/accepted/" + id);
      const res = await axios.post(
        BaseUrl + "/request/review/accepted/" + id,
        {},
        { withCredentials: true }
      );
      setData(prev => prev.filter(item => item.requestId !== id));


      console.log("🚀 ~ acceptRequest ~ res:", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        activeTab === "connections"
          ? "/user/connections"
          : "/user/requests/received";

      try {
        const res = await axios.get(BaseUrl + endpoint, {
          withCredentials: true,
        });

        let incoming = res.data.data || [];
        console.log("🚀 ~ fetchData ~ incoming:", incoming);

        // FIX DATA SHAPE FOR REQUESTS
        const normalized =
          activeTab === "requests"
            ? incoming.map((req) => ({
                ...req.senderId,
                requestId: req._id,
              }))
            : incoming;

        setData(normalized);
      } catch (error) {
        console.log("err", error);
        if (error.response?.status === 401) navigate("/login");
      }
    };

    fetchData();
  }, [activeTab, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Connections</h1>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === "connections" && "tab-active"}`}
          onClick={() => setActiveTab("connections")}
        >
          Connections
        </button>

        <button
          className={`tab ${activeTab === "requests" && "tab-active"}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
      </div>
      {console.log("dta", data)}
      {/* Cards */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((user) => (
            <div
              key={user._id}
              className="bg-base-200 p-4 rounded-xl shadow-md flex items-center gap-5 hover:bg-base-300 transition"
            >
              <img
                src={user.photoUrl}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <h2 className="font-bold text-lg">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm opacity-80">{user.info || "No info"}</p>
                <p className="text-sm opacity-80">{user.age || ""}</p>
                <p className="text-sm opacity-80">
                  {user.skills.join(",") || ""}
                </p>
                <p className="text-sm opacity-60">{user.gender}</p>
              </div>

              {activeTab === "requests" && (
                <div className="ml-auto flex gap-2">
                  <button
                    className="btn btn-success btn-sm flex items-center gap-2"
                    onClick={() => acceptRequest(user.requestId)}
                  >
                    <Check size={16} />
                    Accept
                  </button>

                  <button className="btn btn-error btn-sm flex items-center gap-2">
                    <X size={16} />
                    Reject
                  </button>
                </div>
              )}

              {activeTab === "connections" && (
                <div className="ml-auto flex gap-2">
                  <button className="btn btn-success btn-sm flex items-center gap-2">
                    <MessageSquare size={16} />
                    Message
                  </button>

                  <button className="btn btn-error btn-sm flex items-center gap-2">
                    <X size={16} />
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))
        ) : activeTab === "connections" ? (
          <p className="text-center mt-6 opacity-70 text-lg">
            🫂 No connections yet. Start connecting with new people!
          </p>
        ) : (
          <p className="text-center mt-6 opacity-70 text-lg">
            📩 No new requests right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
