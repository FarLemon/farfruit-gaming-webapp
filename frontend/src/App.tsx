import { Routes, Route } from "@solidjs/router";
import { Component } from 'solid-js';

import '@styles/_global.scss'
import '@/App.scss';

import FarFruitLogo from "@assets/icons/FarFruitLogo";
import GroundedLogo from '@assets/icons/groundedLogo';

import Home from "@pages/home/Home";
import Grounded from "@pages/grounded/Grounded";



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