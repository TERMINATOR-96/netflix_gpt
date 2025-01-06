import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    //if movies data is not fetched then return - early return
    if(movies === null) return;
    
    const mainMovie = movies[0];
    console.log(mainMovie);

    const {original_title, overview} = mainMovie;

    return (
        <div>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground />
        </div>
    );
};

export default MainContainer;