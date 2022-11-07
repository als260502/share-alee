import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { client } from "../lib/sanityClient";
import { feedQuery, searchQuery } from "../utils/data";

import { MasonryLayout } from "./MasonryLayout";
import { Spinner } from "./Spinner";

export const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch().then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};
