import Header from "./components/header.tsx";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home.tsx";
import Upload from "./routes/upload.tsx";
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route
                    path="*"
                    element={
                        <div>
                            404
                            <br /> route not found
                        </div>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
