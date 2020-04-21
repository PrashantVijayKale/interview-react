import React, { Component } from "react";
import Autocomplete from "./Autocomplete/Autocomplete";
import "./App.css";
import "./Autocomplete/autocomplete.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Alphakinetic Country Dropdown</header>
        <section>
          <div>
            <Autocomplete />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
