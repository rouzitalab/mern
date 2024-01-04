import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/Home/home";


function App() {
  return (
    <>
     <Router>
      Header
      <Routes>
        <Route path="/" element={ <Home/> } />
      </Routes>
      Footer
     </Router>
    </>
  )
}

export default App
