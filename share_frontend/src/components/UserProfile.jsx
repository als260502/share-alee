import React, { useState, useEffect } from "react";

import { AiOutlineLogout } from "react-icons/ai";

import { useParams, useNavigate } from "react-router-dom";

import { GoogleLogout } from "react-google-login";

import { client } from "../lib/sanityClient";

import { MasonryLayout } from "./MasonryLayout";

import { Spinner } from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

import {
  userQuery,
  userSavedPinsQuery,
  userCreatedPinsQuery,
} from "../utils/data";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activePin, setActivePin] = useState("created");

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
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
          </div>
        </div>
      </div>
    </div>
  );
};