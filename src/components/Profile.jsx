import EditProfile from "./EditProfile"
import { useSelector } from "react-redux";

function Profile() {

const user = useSelector((store) => store.user);
  console.log("user from redux in profile:", user?.data);
  return (
    <div>
      <EditProfile  user={user?.data}/>
    </div>
    
  )
}

export default Profile