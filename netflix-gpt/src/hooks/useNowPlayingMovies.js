import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

//hooks is a normal javascript function
const useNowPlayingMovies = () => {
    //fetch data from TMDB API and update store
    const dispatch = useDispatch();
    //using memoization to reduce the number of API calls
    const nowPlayingMovies = useSelector(
        (store) => store.movies.nowPlayingMovies
    );

    //api call to fetch data from TMDB api
    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        //dispatch an action
        dispatch(addNowPlayingMovies(json.results));
    }

    //we have to call this api only once when the component is rendered
    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();
    }, []); //empty square brackets we want to call this api only once
};

export default useNowPlayingMovies;