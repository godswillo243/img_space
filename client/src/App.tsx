import  Header from "./components/header.tsx"
import {Routes, Route} from "react-router-dom"
import Home from "./routes/home.tsx"
function App() {
  

  return (
    <>
      <Header/>
      <Routes>
      <Route path="/"  element={<Home/>}/>
        
      </Routes>
    </>
  )
}

export default App
