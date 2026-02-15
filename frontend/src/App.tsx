import { Routes, Route } from "@solidjs/router";
import { lazy, Component } from 'solid-js';

import '@styles/_global.scss'
import '@/App.scss';

import FarFruitLogo from "@assets/icons/FarFruitLogo";
import GroundedLogo from '@assets/icons/groundedLogo';

const Home = lazy(()=> import("@pages/home/Home"));
const Grounded = lazy(()=> import("@pages/grounded/grounded"));





const App: Component = () => {
  return (
    <div class="app">

      <div class="pageSelect">
        <a href="/"><FarFruitLogo/></a>
        <ul>
          <li><a href="/grounded"><GroundedLogo/><p>Grounded</p></a></li>
        </ul>
      </div>

      <div class="page">
        <Routes>
          <Route path="/" component={Home}/>
          <Route path="/grounded" component={Grounded}/>
        </Routes>
      </div>

      <footer class="footer">
        <p>Copyright &copy; 2023 FarLemon</p>
      </footer>
    </div>
  );
};
export default App;