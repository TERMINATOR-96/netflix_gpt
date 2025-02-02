import { useRef } from "react";
import openai from "../utils/openai";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);

    //search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results;
    };

    const handleGptSearchClick = async () => {
        //call the openai api
        // console.log(searchText.current.value);

        const gptQueries = "Act as a movie recommendation system and suggest some movies for the query " + 
                            searchText.current.value + 
                            ". Only give me names of 5 movies, comma separate. Like the example result given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        //make an API call to GPT API and get movie results
        // const gptResults = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQueries}],
        //     model: 'gpt-4o',
        //   });

        // if(!gptResults.choices) {
        //     //TODO: write error handling
        // }
        // console.log(gptResults.choices?.[0]?.message?.content);

        //Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
        // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const gptMovies = ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"];
        //[Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan]

        //For each movie I will search the TMDB API
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise]
        const tmdbResults = await Promise.all(promiseArray);
        // console.log(tmdbResults);
        //storing TMDB results to redux store
        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center"> 
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e) => e.preventDefault()}>
                <input 
                    ref={searchText}
                    type="text" 
                    className="p-4 m-4 col-span-9" 
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button 
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" 
                    onClick={handleGptSearchClick}
                >{lang[langKey].search}</button> 
            </form>
        </div>
    );
};

export default GptSearchBar;