import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Main";
import Gallery from "../gallery/Gallery";
import KeyPad from "../keyPad/KeyPad";
import Carousel from "../carousel/Carousel";
import GlobalStyle from "../styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/gallery" Component={Gallery} />
          <Route path="/keypad" Component={KeyPad} />
          <Route path="/carousel" Component={Carousel} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
