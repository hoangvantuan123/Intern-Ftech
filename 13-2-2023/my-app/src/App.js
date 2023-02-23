import About from "./Components/about";
import NavMenu from "./Components/menu";
import OfferBanner from "./Components/OfferBanner";
import Shop from "./Components/shop";

function App() {
  return (
    <div className="App">
      <NavMenu></NavMenu>
      <OfferBanner></OfferBanner>
      <About></About>
      <Shop></Shop>
    </div>
  );
}

export default App;
