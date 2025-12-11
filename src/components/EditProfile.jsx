import axios from "axios";
import { BaseUrl } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [emailId, setEmail] = useState(user?.emailId);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [gender, setGender] = useState(user?.gender);
  const [info, setInfo] = useState(user?.info);
  const [skills, setSkills] = useState(user?.skills);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "/profile/edit",
        { firstName, lastName, photoUrl, gender, info, skills },
        { withCredentials: true }
      );
      console.log("res--->>>>>>>>", res);
      dispatch(addUser(res.data));
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.request?.response || "Something went wrong!");
      if (err.status === 401) {
        return navigate("/login");
      }
    }
  };

  return (
    <div className="flex w-full gap-6 px-6 py-10 items-start">

      {/* LEFT SECTION (FORM) - 2/3 width */}
      <div className="flex-[2] bg-base-200 p-8 rounded-xl min-h-screen">

        <div className="card w-full max-w-3xl mx-auto bg-base-100 shadow-xl p-5 rounded-xl">


          <h2 className="text-1xl font-bold text-center">Edit Profile</h2>

          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoUrl} alt="profile" />
              </div>
            </div>

            <button className="btn btn-outline btn-sm">Change Photo</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" value={firstName} className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
              <label className="label">Last Name</label>
              <input type="text" value={lastName} className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div>
              <label className="label">Email Id</label>
              <input type="text" value={emailId} className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input type="text" value={photoUrl} className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>

            <div>
              <label className="label">Gender</label>
              <input type="text" value={gender} className="input input-bordered w-full"
                onChange={(e) => setGender(e.target.value)} />
            </div>

            <div>
              <label className="label">Skills</label>
              <input type="text" value={skills} className="input input-bordered w-full"
                onChange={(e) => setSkills(e.target.value)} />
            </div>
          </div>

          <label className="label mt-4">Info</label>
          <textarea className="textarea textarea-bordered w-full h-20"
            value={info} onChange={(e) => setInfo(e.target.value)}></textarea>

          <div className="divider mt-4"></div>
          <p className="text-red-500">{error}</p>

          <button className="btn btn-primary w-full mt-2" onClick={updateProfile}>
            Save Changes
          </button>

        </div>

        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully!</span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE USER PREVIEW - 1/3 width */}
      <div className="flex-[1] sticky top-10 max-w-[400px]">
        <UserCard user={{ firstName, lastName, photoUrl, gender, info, skills }} />
      </div>

    </div>
  );
}

export default EditProfile;
