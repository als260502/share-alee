import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { client } from "../lib/sanityClient";
import { feedQuery, searchQuery } from "../utils/data";

import { MasonryLayout } from "./MasonryLayout";
import { Spinner } from "./Spinner";

export const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
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
    return <Spinner message={t("AddingPins.text")} />;
  }

  // if (!pins?.length) return <h2>No pins available</h2>;
  if (!pins?.length) return <h2>{t("NoPins.text")}</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};
