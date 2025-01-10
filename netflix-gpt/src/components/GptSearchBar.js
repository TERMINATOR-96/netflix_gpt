import { useRef } from "react";
import openai from "../utils/openai";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang);

    const handleGptSearchClick = async () => {
        //call the openai api
        console.log(searchText.current.value);

        const gptQueries = "Act as a movie recommendation system and suggest some movies for the query " + 
                            searchText.current.value + 
                            ". Only give me names of 5 movies, comma separate. Like the example result given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        //make an API call to GPT API and get movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQueries}],
            model: 'gpt-4o',
          });

        if(!gptResults.choices) {
            //TODO: write error handling
        }
        console.log(gptResults.choices?.[0]?.message?.content);

        //Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        //[Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan]

        //For each movie I will search the TMDB API
    };

    return (
        <div className="pt-[10%] flex justify-center"> 
            <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e) => e.preventDefault()}>
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