import { BaseUrl } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { UserX } from "lucide-react";

function Feed() {
  const feed = useSelector((store) => store.feed);
  console.log("feed compnent");
  const dispatch = useDispatch();

  const getFeed = async () => {
    console.log("in feed function");
    console.log("feed1-->>>in feedjsx", feed);
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BaseUrl + "/user/feed", {
        withCredentials: true,
      });
      console.log("res---infeed==>>>", res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-10">
      {!feed || feed.length === 0 ? (
        <div className="flex flex-col items-center opacity-70">
          <UserX size={48} />
          <p className="text-xl font-semibold mt-3">No users available</p>
        </div>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
}

export default Feed;
