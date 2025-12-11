import { Heart, X, Mail, User, Briefcase } from "lucide-react";
import axios from "axios";
import { BaseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


function UserCard({ user }) {

  console.log("userrrrrrrrrrrrrrrrrrr",user)
  const dispatch = useDispatch();
  const sendReq = async(status, id) => {
    try {
      console.log(" BaseUrl +  + id,", BaseUrl + "/request/send/" + status + "/" + id,)
      const res = await axios.post(
        BaseUrl + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      console.log("🚀 ~ sendIntrestedReq ~ res:", res);
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.log("err,", err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden w-full max-w-sm border border-gray-700">
      {/* Image Section */}
      <figure className="w-full h-64 overflow-hidden rounded-t-xl">
        <img
          src={user?.photoUrl}
          alt="User profile"
          className="object-cover object-top w-full h-full"
          onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
        />
      </figure>

      {/* Content */}
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold flex items-center gap-2">
          <User size={20} />
          {user?.firstName} {user?.lastName}
        </h2>

        <p className="text-sm opacity-70">
          <Briefcase size={14} className="inline mr-1" />
          Skills:{" "}
          <span className="font-semibold">
            {user?.skills?.join(", ") || "Not specified"}
          </span>
        </p>

        {user?.info && (
          <p className="mt-2 text-sm leading-relaxed">{user?.info}</p>
        )}

        <p className="text-sm mt-1 flex items-center gap-1">
          <Mail size={15} />
          {user?.emailId || "No email"}
        </p>

        <p className="text-sm mt-1 flex items-center gap-1">
          <User size={15} />
          Gender: {user?.gender || "Not specified"}
        </p>

        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-success w-1/2 flex items-center gap-2 text-white"
            onClick={() => sendReq("intrested", user._id)}
          >
            <Heart size={18} /> Interested
          </button>
          <button
            className="btn btn-error w-1/2 flex items-center gap-2 text-white"
            onClick={() => sendReq("ignored", user._id)}
          >
            <X size={18} /> Ignore
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
