import "./App.css";
import React from "react";
//import GoogleLogin from "react-google-login";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageContent: "",
      showButtonIndex: 0,
      chars_left: 400,
      text: "",
      authStep: 1,
      messageholder: [],
      email: "",
      password: "",
    };

    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler();
    this.getList();
  }

  handleChangeX(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitSignUp() {
    //. console.log("submit Sign Up now");
    const { email, password } = this.state;
    //  console.log(JSON.stringify({ email, password }));
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
        //   console.log("trigger");
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
          this.setState({
            successfulSave: true,
            authStep: 5,
            email: "",
            password: "",
          });
          //  this.closeModal();
        }
      });
  }

  submitLogIn() {
    const { email, password } = this.state;
    fetch("http://localhost:5000/authenticate", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
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
        if (res.status === 400) {
          return res.text();
        }
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (typeof data === "string") {
          console.log(data);
          //   console.log("message hello");
          // this.props.createModalError(data);
        }
        if (typeof data === "object") {
          localStorage.setItem("user", JSON.stringify(data));
          console.log(data);
          console.log("log in user");
          // this.setState(data);
          /*this.setState({
            loggedin: true,
            username: data.username,
            data: data,
          });*/

          //redux step below (this.props.login(data))
          //this.props.login(data);

          this.setState({
            loggedin: true,
            email: data.email,
            data: data,
            authStep: 4,
          });
        }
      });
  }

  logOut() {
    this.setState((state) => ({ authStep: 1, email: "" }));
  }

  loginClick() {
    this.setState((state) => ({ authStep: 2 }));
  }

  signupClick() {
    this.setState((state) => ({ authStep: 3 }));
    // console.log(this.state.authStep);
  }

  getList() {
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
        //    console.log(JSON.stringify(res) + ".thenres");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //  console.log("wild");
        this.setState({
          messageholder: data,
        });

        console.log(data);
        //  console.log("getData data data");
      });
  }

  clickRemover = (e) => {
    this.setState({
      showButtonIndex: e.target.id,
    });

    // console.log(JSON.stringify({ showButtonIndex }));
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
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      //    console.log("something happening here" + res);
    });

    this.clickHandler();
  };

  clickHandler = () => {
    //  console.log("component did mount");
    this.getList();
    //   console.log("helo clickHandler");
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    //  console.log(name);
    //  console.log(value);
    this.setState({ [name]: value, chars_left: 400 - value.length });
  };

  handleSubmit(event) {
    event.preventDefault();
    //  console.log("handleSubmit TIMEZ");
    const { messageContent, email } = this.state;
    //  console.log("body is" + { messageContent } + { email });

    fetch("http://localhost:5000/messages", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ text: messageContent, emailtext: email }),
    }).then((res) => {
      //   console.log("something happening here" + res);
    });
    this.clickHandler();
  }

  render() {
    var { chars_left, authStep, messageholder } = this.state;
    //  console.log(this.state.email);
    //  console.log(this.state.passowrd);
    // console.log("OK???");
    //  console.log("reallyOK???");
    const anonymoususer = <span>anonymous &nbsp;&nbsp;&nbsp;</span>;

    const superDBdisplay = (
      <div>
        <p>Messages are shown here below. </p>
        {messageholder.map((item, index) => (
          <div>
            <div id="messagetime" key={index}>
              <span key={index}>
                {item.text}
                <div>
                  <div id="timestamp">
                    <span id="timestamp">
                      Author: &nbsp;
                      {item.emailtext == "" ? anonymoususer : item.emailtext}
                    </span>
                  </div>

                  <div id="timestamp">
                    <span id="timestamp">Timestamp: {item.createdAt}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div id="uptime">
                    <button
                      type="button"
                      id={item._id}
                      key={index}
                      class="buttontools"
                      onClick={(e) => this.clickRemover(e)}
                    >
                      delete
                    </button>
                    &nbsp;&nbsp;
                    <button class="buttontools">upvote</button>&nbsp;&nbsp;
                    <button class="buttontools">downvote</button>&nbsp;&nbsp;
                  </div>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    );

    const authStepOne = (
      <div class="authy">
        <button
          class="buttontools"
          type="button"
          onClick={this.loginClick.bind(this)}
        >
          log in
        </button>
        &nbsp;&nbsp;
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
          Log in here &nbsp;&nbsp;&nbsp;
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
            onClick={() => this.submitLogIn()}
          >
            submit
          </button>
        </form>
      </div>
    );

    const authStepThree = (
      <div class="authy">
        <form>
          Sign up here &nbsp;&nbsp;&nbsp;
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
        Welcome {this.state.email}. &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="buttontools"
          name="submit"
          onClick={this.logOut.bind(this)}
        >
          Log out.
        </button>
      </div>
    );

    const authStepFive = (
      <div class="authy">
        <button
          type="button"
          class="buttontools"
          name="submit"
          onClick={this.loginClick.bind(this)}
        >
          Thanks for signing up. Click here to Log in
        </button>
      </div>
    );

    return (
      <form id="marginy">
        {authStep == 1 ? authStepOne : null}
        {authStep == 2 ? authStepTwo : null}
        {authStep == 3 ? authStepThree : null}
        {authStep == 4 ? authStepFour : null}
        {authStep == 5 ? authStepFive : null}
        <h1 id="titleM">Message Board</h1>
        {chars_left}&nbsp;&nbsp;
        <span id="textfancy">
          <textarea
            id="fancy"
            autofocus="true"
            maxlength="400"
            rows="5"
            cols="40"
            type="text"
            placeholder="enter a message for the Message Board"
            name="messageContent"
            onChange={this.handleChange}
          />
        </span>
        &nbsp;&nbsp;
        <button
          type="button"
          class="buttontoolsS"
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
        <MessageForm />
      </div>
    </div>
  );
}

export default App;
