import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
// import movieApi from "../../common/api/movieApi";
// import { APIKey } from "../../common/api/MovieApiKey";

import { useDispatch } from "react-redux";

import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movie/movieSlice";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
