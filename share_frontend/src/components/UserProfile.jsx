import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";
import { client } from "../lib/sanityClient";

import { googleLogout } from "@react-oauth/google";

import { MasonryLayout } from "./MasonryLayout";
import { Spinner } from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

import {
  userQuery,
  userSavedPinsQuery,
  userCreatedPinsQuery,
} from "../utils/data";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";

const activeBtnStyles =
  "rounded-full w-20 outline-none bg-red-500 text-white font-bold p-2";
const notActiveBtnStyles =
  "rounded-full w-20 outline-none bg-primary mr-4 text-black font-bold p-2";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const { removeUser } = useAuthStore();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = useCallback(() => {
    googleLogout();
    removeUser();
    navigate("/login");
  }, []);

  if (!user) return <Spinner message="Carregando..." />;
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="Banner-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              className="w-20 h-20 rounded-full -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
            <h1 className="text-3xl font-bold text-center mt-3 ">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className="outline-none shadow-md bg-white p-2 rounded-full cursor-pointer"
                  onClick={() => logout()}
                >
                  <AiOutlineLogout coor="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              {t("ProfileTextButton.textCreated")}
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              {t("ProfileTextButton.textSaved")}
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
