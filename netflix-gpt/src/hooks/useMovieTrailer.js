import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

//fetch trailer video and update the store with trailer video data
const useMovieTrailer = (movieId) => {
        //to get trailer video from my redux store we have to use useSelector
        const dispatch = useDispatch();
        //using memoization to reduce the number of API calls
        const trailerVideo = useSelector((store) => store.movies.addTrailerVideo);

        //fetch trailer video
        const getMovieVideos = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
            const json = await data.json();
    
            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
    
            dispatch(addTrailerVideo(trailer));
        };
    
        useEffect(() => {
            !trailerVideo && getMovieVideos();
        }, []); //to render the component only once else it will run into an infinite loop
}

export default useMovieTrailer;