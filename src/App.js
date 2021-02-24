import logo from "./logo.svg";
import "./App.css";
import React from "react";
import GoogleLogin from "react-google-login";

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
      chars_left: 400,
      datePush: "",
      newADater: [],
      text: "",
      authStep: 0,
      verifyAuth: false,
      messageholder: [],
      email: "",
      password: "",
    };

    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler();
    this.getMovieList();
  }

  handleChangeX(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitSignUp() {
    console.log("submit Sign Up now");
    const { email, password } = this.state;
    console.log(JSON.stringify({ email, password }));
    fetch("http://localhost:5000/userprofiles", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, password }),
      // body data type must match "Content-Type" header
    })
      .then((res) => {
        console.log("trigger");
        if (res.status === 400) {
          return res.text();
        }
        //if (res.status === 201) {
        else {
          return;
        }
      })
      .then((data) => {
        if (typeof data === "string") {
          console.log("duplicate user detected");
          // this.props.createModalError(data);
        }
        //if (typeof data === "object") {
        else {
          console.log("new user saved!");
          this.setState({ successfulSave: true });
          //  this.closeModal();
        }
      });
  }

  loginClick() {
    this.setState((state) => ({ authStep: 2 }));
  }

  signupClick() {
    this.setState((state) => ({ authStep: 3 }));
    console.log(this.state.authStep);
  }

  getMovieList() {
    var { dbcontainer, newA, datePush, newADater } = this.state;
    fetch("http://localhost:5000/messages", {
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
        this.setState({
          messageholder: data,
        });

        console.log(data);
        console.log("getData data data");
      });
  }

  clickRemover = (e) => {
    var { dbcontainer, newA, showButtonIndex, newADater } = this.state;
    this.setState({
      showButtonIndex: e.target.id,
    });
    var holder = newA[e.target.id];
    var timeholder = newADater[e.target.id];
    console.log(JSON.stringify({ holder, showButtonIndex }));
    console.log("remove now!");
    fetch("http://localhost:5000/messages/" + e.target.id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ holder, showButtonIndex, timeholder }),
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
    this.setState({ [name]: value, chars_left: 400 - value.length });
  };

  handleSubmit(event) {
    //alert("submission incoming" + this.state.movieName);
    event.preventDefault();
    const { movieName, method, overName } = this.state;
    console.log("body is" + { movieName } + { method } + { overName });

    fetch("http://localhost:5000/messages", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ text: movieName }),
    }).then((res) => {
      console.log("something happening here" + res);
    });
    this.clickHandler();
  }

  render() {
    var {
      dbcontainer,
      newA,
      chars_left,
      newADater,
      authStep,
      verifyAuth,
      messageholder,
    } = this.state;
    // console.log(dbcontainer[0]);
    console.log(this.state.email);
    console.log(this.state.passowrd);

    // console.log("OK???");
    // console.log(newA);
    //  console.log("reallyOK???");
    const superDBdisplay = (
      <div>
        <p>The Wall of Messages begins here!</p>
        {messageholder.map((item, index) => (
          <div>
            <div id="messagetime" key={index}>
              <span key={index}>
                {item.text}
                <div>
                  <span id="timestamp">Timestamp: {item.createdAt}</span>

                  <button
                    type="button"
                    id={item._id}
                    key={index}
                    class="buttontools"
                    onClick={(e) => this.clickRemover(e)}
                  >
                    delete
                  </button>
                  <button class="buttontools">upvote</button>
                  <button class="buttontools">downvote</button>
                </div>
              </span>
            </div>
          </div>
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
    const authStepOne = (
      <div class="authy">
        <button
          class="buttontools"
          type="button"
          onClick={this.loginClick.bind(this)}
        >
          log in
        </button>
        <button
          class="buttontools"
          type="button"
          onClick={this.signupClick.bind(this)}
        >
          sign up
        </button>
      </div>
    );

    const authStepTwo = (
      <div class="authy">
        <form>
          Log in here ...
          <input class="buttontools" value="email" />
          <input class="buttontools" value="password" />
          <button
            type="button"
            class="buttontools"
            name="submit"
            onClick={null}
          >
            submit
          </button>
        </form>
      </div>
    );

    const authStepThree = (
      <div class="authy">
        <form>
          Sign up here ...
          <input
            class="buttontools"
            name="email"
            placeholder="EMAIL"
            type="text"
            value={this.state.email}
            onChange={this.handleChangeX}
          />
          <input
            class="buttontools"
            name="password"
            placeholder="PASSWORD"
            type="text"
            value={this.state.password}
            onChange={this.handleChangeX}
          />
          <button
            type="button"
            class="buttontools"
            name="submit"
            onClick={() => this.submitSignUp()}
          >
            submit
          </button>
        </form>
      </div>
    );

    const authStepFour = (
      <div class="authy">
        <button type="button" class="buttontools" name="submit" onClick={null}>
          Currently logged in as XXX; Click here to Log out.
        </button>
      </div>
    );

    return (
      <form id="marginy">
        {authStep == 0 ? authStepOne : null}
        {authStep == 2 ? authStepTwo : null}
        {authStep == 3 ? authStepThree : null}
        {verifyAuth ? authStepFour : null}
        <h1>Message Board</h1>
        {chars_left}
        <textarea
          id="fancy"
          autofocus="true"
          maxlength="400"
          rows="5"
          cols="40"
          type="text"
          placeholder="enter a message for the Message Board"
          name="movieName"
          onChange={this.handleChange}
        />
        <button
          type="button"
          class="buttontools"
          name="submit"
          onClick={this.handleSubmit}
        >
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
