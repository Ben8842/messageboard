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
      overName: "theName",
      dbcontainer: [],
      newA: [],
      showButtonIndex: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler();
  }

  getMovieList() {
    var { dbcontainer, newA } = this.state;
    fetch("http://localhost:5000/users", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        console.log(JSON.stringify(res) + ".thenres");
        return res.json();
      })
      .then((data) => {
        this.setState({ dbcontainer: data, newA: data[0].movieNames });
        console.log(data);
        console.log("getData data data");
      });
  }

  clickRemover = (e) => {
    var { dbcontainer, newA, showButtonIndex } = this.state;
    this.setState({
      showButtonIndex: e.target.id,
    });
    var holder = newA[e.target.id];
    console.log(JSON.stringify({ holder, showButtonIndex }));
    console.log("remove now!");
    fetch("http://localhost:5000/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ holder, showButtonIndex }),
    }).then((res) => {
      console.log("something happening here" + res);
    });

    this.clickHandler();
  };

  clickHandler = () => {
    console.log("component did mount woo hoo");
    this.getMovieList();
    var { dbcontainer } = this.state;
    console.log(JSON.stringify({ dbcontainer }));
    console.log("helo clickHandler");
  };

  handleChange = (event) => {
    const { movieName, method, overName } = this.state;
    let name = event.target.name;
    let value = event.target.value;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    //alert("submission incoming" + this.state.movieName);
    event.preventDefault();
    const { movieName, method, overName } = this.state;
    console.log("body is" + { movieName } + { method } + { overName });

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
    this.clickHandler();
  }

  render() {
    var { dbcontainer, newA } = this.state;
    console.log(dbcontainer[0]);

    console.log("OK???");
    console.log(newA);
    console.log("reallyOK???");
    const superDBdisplay = (
      <div>
        <p>The Wall of Messages begins here!</p>
        {newA.map((item, index) => (
          <ul>
            <li key={index}>
              <span key={index}>
                {newA[newA.length - index - 1]} <span> </span>
                <button
                  type="button"
                  id={newA.length - index - 1}
                  key={index}
                  onClick={(e) => this.clickRemover(e)}
                >
                  X
                </button>
              </span>
            </li>
          </ul>
        ))}
      </div>
    );
    /*
    const unusedIdeas = (
      <div>
      <p>Enter the watching method. </p>
        <input type="text" name="method" onChange={this.handleChange} />
        <h3>The watching method is {this.state.method}</h3>
        <input type="text" name="overName" onChange={this.handleChange} />
        <h4>your Over Name is going to be {this.state.overName}</h4>
        <button type="button" onClick={this.clickHandler}>
          get this going
        </button>
         <h1> {this.state.movieName}</h1>
      </div>
    );
*/
    return (
      <form id="marginy">
        <p>Wall of messages</p>
        <textarea
          rows="5"
          cols="40"
          type="text"
          placeholder="enter a message for the wall"
          name="movieName"
          onChange={this.handleChange}
        />
        <button type="button" name="submit" onClick={this.handleSubmit}>
          submit
        </button>

        {superDBdisplay}
      </form>
    );
  }
}

function App() {
  return (
    <div>
      <div id="marginy">
        <MovieForm />
      </div>
    </div>
  );
}

export default App;
