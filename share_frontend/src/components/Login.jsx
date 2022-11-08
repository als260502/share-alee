import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { client } from "../lib/sanityClient";
import decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { useAuthStore } from "../store/authStore";

export const Login = () => {
  const navigate = useNavigate();

  const { userProfile, addUser } = useAuthStore();

  const responseGoogle = (response) => {
    const token = decode(response.credential);
    const { picture, sub, given_name: name } = token;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    addUser(user);

    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });

    console.log(token);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          muted
          loop
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img className="w-[130px]" alt="logo" src={logo} />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={(responseGoogle) =>
                console.log("loginFail", responseGoogle)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
