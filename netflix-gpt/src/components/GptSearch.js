import GptSearchBar from "./GptSearchBar";
import { BACKGROUND_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img
                    src={BACKGROUND_URL}
                    alt="background_image"
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    );
};

export default GptSearch;