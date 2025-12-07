import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    console.log("fetchuser called")
    try {
      const userData = await axios.get(BaseUrl + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(userData.data));
    } catch (err) {
      if(err.status === 401){
        return navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Body;
