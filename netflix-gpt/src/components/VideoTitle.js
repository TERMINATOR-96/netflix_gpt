const VideoTitle = ({title, overview}) => {
    return (
        <div className="w-screen aspect-video pt-[14%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
            <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
            <div className="my-4 md:m-0">
                <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-50">
                    ▶ Play
                </button>
                <button className="hidden md:inline-block bg-gray-500 mx-2 text-white p-4 px-12 text-xl bg-opacity-80 rounded-lg">
                    ℹ More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;