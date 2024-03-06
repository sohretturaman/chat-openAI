/** @format */

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <section className="sidebar">
        <button> + New Chat</button>

        <ul className="history">
          <li>first Chat</li>
        </ul>
        <nav>
          <p>Made by Meryem Sohret</p>
        </nav>
      </section>

      <section className="main">
        <h1>MariaGpt</h1>
        <ul className="feed"></ul>
        <div className="bottomSection">
          <div className="inputContainer">
            <input />
            <div id="submit">Send</div>
          </div>
          <p className="info">
            chat GPT Mar 14 version. Free Reasearch Preview. Our goal is make AI
            systems more natural and safe to interact with. Your feedback will
            help us improve.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
