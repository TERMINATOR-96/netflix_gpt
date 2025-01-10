import Header from "./Header";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    useNowPlayingMovies();
    usePopularMovies();
    return (
        <div>
            {/**
             * ----------------------------------------------------------
             * MainContainer
             *  - VideoBackground
             *  - VideoTitle
             * SecondaryContainer
             * - MovieList * n
             *    - Cards * n
             * ----------------------------------------------------------
             */}

             <Header />
             {
                showGptSearch ? (
                    <GptSearch />
                ) : (
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
                )
             }
        </div>
    );
};

export default Browse;