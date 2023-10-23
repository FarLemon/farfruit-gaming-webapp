import { Component } from 'solid-js';

import './styles/_home.scss';


const Home: Component = () => {
  return (
    <div class="home">
        <header>
          <h1>Home Page</h1>
        </header>
        <section class="content">
          <p>This page is currently under construction.<br/>Please refer to the <a href="/grounded">Grounded</a> section of the website.</p>
        </section>
    </div>
  );
};
export default Home;
