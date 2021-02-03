import logo from "./logo.svg";
import "./App.css";
import React from "react";

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: "",
      count: 0,
      method: "",
    };
  }

  handleForm = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form>
        <h1> The movie name is {this.state.movieName}</h1>
        <p>Enter a movie name below.</p>
        <input type="text" name="movieName" onChange={this.handleForm} />
        <button type="button" name="submit" onChange={this.handleForm}>
          submit
        </button>

        <p>Enter the watching method. </p>
        <input type="text" name="method" onChange={this.handleForm} />
        <h3>The watching method is {this.state.method}</h3>
      </form>
    );
  }
}

function App() {
  return (
    <div>
      <header>Hello World</header>

      <div>
        <MovieForm />
      </div>
    </div>
  );
}

export default App;
