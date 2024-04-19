import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const searchText = "Harry";
    const URL = `http://www.omdbapi.com/?s=${searchText}&apikey=3d43fef1`;
    const response = await axios.get(URL);
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const URL = `http://www.omdbapi.com/?s=${seriesText}&apikey=3d43fef1`;
    const response = await axios.get(URL);
    return response.data;
  }
);

export const fetchAsyncMoviesOrShowsDetail = createAsyncThunk(
  "movies/fetchAsyncMoviesOrShowsDetails",
  async (id) => {
    const URL = `http://www.omdbapi.com/?apikey=3d43fef1&i=${id}&Plot=full`;
    const response = await axios.get(URL);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow:{},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addmovies: (state, action) => {
      state.movies = action.payload;
    },
    removeSelectedMovieOrShow:(state)=>{
      state.selectedMovieOrShow={}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log("Fetched Successfully");
        state.movies = action.payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        console.log("Fetched Successfully");
        state.shows = action.payload;
      })
      .addCase(fetchAsyncMoviesOrShowsDetail.fulfilled, (state, action) => {
        console.log("Fetched Successfully");
        state.selectedMovieOrShow = action.payload;
      });
  },
});

export const { addmovies , removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
