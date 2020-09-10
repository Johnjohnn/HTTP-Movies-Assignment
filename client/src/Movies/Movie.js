import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`).then(({data})=>{
      history.push("/");
    }).catch(err=>{
      console.log(err);
    })
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <Link to={`/update-movie/${movie.id}`} className="edit-button">
        Edit
      </Link>
      <div className="delete-button" onClick={()=> deleteMovie(movie.id)}>
        Delete
      </div>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;