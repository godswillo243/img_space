import React from "react";
import { imageUrls } from "../constants/data";
import Gallery from "../components/gallery";
const Home = () => {
    
    return (
        <div className="w-full h-fit space-y-4">
            <div className="flex items-center justify-center w-full gap-2 p-4">
                <input
                    className="w-full bg-neutral-700/70 rounded-full  px-4 py-2 "
                    type="search"
                />
                <button className="bg-neutral-700 rounded-full!">Search</button>
            </div>
            {/* <Gallery imageSrcs={[imageUrls]}/>*/}
        </div>
    );
};

export default Home;
