import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import axios from 'axios';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddMovie from "./Movies/AddMovie";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const {pathname} = useLocation();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    if(pathname === "/") getMovieList();
  }, [pathname]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm/>
      </Route>

      <Route path="/add-movie">
        <AddMovie/>
      </Route>
    </>
  );
};

export default App;
