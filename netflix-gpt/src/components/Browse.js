import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    return (
        <div>
            <Header />
            {/**
             * MainContainer
             *  - VideoBackground
             *  - VideoTitle
             * SecondaryContainer
             * - MovieList * n
             *    - Cards * n
             */}
             <MainContainer />
             <SecondaryContainer />
        </div>
    );
};

export default Browse;