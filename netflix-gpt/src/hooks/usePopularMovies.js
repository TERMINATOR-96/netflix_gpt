import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

//hooks is a normal javascript function
const usePopularMovies = () => {
    //fetch data from TMDB API and update store
    const dispatch = useDispatch();

    //api call to fetch data from TMDB api
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
        const json = await data.json();
        console.log(json.results);
        //dispatch an action
        dispatch(addPopularMovies(json.results));
    }

    //we have to call this api only once when the component is rendered
    useEffect(() => {
        getPopularMovies();
    }, []); //empty square brackets we want to call this api only once
};

export default usePopularMovies;