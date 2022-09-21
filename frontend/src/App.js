import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home1 from "./pages/Home1";
import NewForm from "./pages/NewForm";
import UpdateForm from "./pages/UpdateForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container lg:max-w-7xl md:max-w-3xl mx-auto">
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home1 />} />
              <Route path="/newcontact" element={<NewForm />} />
              <Route path="/update/:id" element={<UpdateForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
