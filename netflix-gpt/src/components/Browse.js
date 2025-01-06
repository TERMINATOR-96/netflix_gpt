import Header from "./Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const Browse = () => {
    const dispatch = useDispatch();

    //api call to fetch data from TMDB api
    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        console.log(json.results);
        //dispatch an action
        dispatch(addNowPlayingMovies(json.results));
    }

    //we have to call this api only once when the component is rendered
    useEffect(() => {
        getNowPlayingMovies();
    }, []); //empty square brackets we want to call this api only once

    return (
        <div>
            <Header />
        </div>
    );
};

export default Browse;