import GptSearchBar from "./GptSearchBar";
import { BACKGROUND_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img className="h-screen object-cover" src={BACKGROUND_URL} alt="background_image" />
            </div>
            <div className="">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    );
};

export default GptSearch;