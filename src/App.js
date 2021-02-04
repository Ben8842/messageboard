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
      overName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { movieName, method, overName } = this.state;
    let name = event.target.name;
    let value = event.target.value;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    alert("submission incoming" + this.state.movieName);
    event.preventDefault();
    const { movieName, method, overName } = this.state;

    fetch("http://localhost:5000/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ movieName, method, overName }),
    }).then((res) => {
      console.log("something happening here" + res);
    });
  }

  render() {
    return (
      <form>
        <h1> The movie name is {this.state.movieName}</h1>
        <p>Enter a movie name below.</p>
        <input type="text" name="movieName" onChange={this.handleChange} />
        <button type="button" name="submit" onClick={this.handleSubmit}>
          submit
        </button>

        <p>Enter the watching method. </p>
        <input type="text" name="method" onChange={this.handleChange} />
        <h3>The watching method is {this.state.method}</h3>
        <input type="text" name="overName" onChange={this.handleChange} />
        <h4>your Over Name is going to be {this.state.overName}</h4>
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
