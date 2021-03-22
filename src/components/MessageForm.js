//import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/userActions.js";
import { logout } from "../actions/userActions.js";
//import News from "./News";

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
      login: false,
      topics: [
        {
          name: "select",
          value: null,
        },
        { name: "general", value: "general" },
        { name: "finance", value: "finance" },
        { name: "technology", value: "technology" },
        { name: "politics", value: "politics" },
        { name: "sports", value: "sports" },
        { name: "movies", value: "movies" },
        { name: "music", value: "music" },
        { name: "art", value: "art" },
        { name: "games", value: "games" },
        { name: "math", value: "math" },
      ],
      value: "?",

      topicSelection: "",
    };

    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.voteFilter = this.voteFilter.bind(this);
    // this.clickHandler();
  }

  voteFilter() {
    var data = this.state.messageholder;
    data.sort((a, b) => (a.vote > b.vote ? -1 : 1));
    this.setState({ messageholder: data });
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    //let loggedin = typeof user === "object";

    if (user !== null) {
      this.props.login(user.data);
      this.setState({ authStep: 4 });
    }
    this.getList();
  }

  handleChangeX(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  upVote = (e) => {
    const { email } = this.state;
    console.log(this.state.emailtext);
    /*this.setState({
      showButtonIndex: e.target.id,
    });*/

    // console.log(JSON.stringify({ showButtonIndex }));
    console.log("upvote now");
    fetch("http://localhost:5000/messages/" + e.target.id, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email }),
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      console.log(res);
      this.getList();
      //    console.log("something happening here" + res);
    });
    console.log("hello upvote");
    //this.clickHandler();
  };

  downVote = (e) => {
    const { email } = this.state;
    console.log(this.state.emailtext);
    /*this.setState({
      showButtonIndex: e.target.id,
    });*/

    // console.log(JSON.stringify({ showButtonIndex }));
    console.log("downvote now");
    fetch("http://localhost:5000/messages/" + e.target.id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email }),
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      console.log(res);
      this.getList();
      //    console.log("something happening here" + res);
    });

    console.log("hello downvote");
    //this.clickHandler();
  };

  clickHandler = () => {
    //  console.log("component did mount");
    this.getList();
    //   console.log("helo clickHandler");
  };

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
          this.props.login(data);
          console.log("login REDUX");
          console.log(data);
        }
      });
  }

  logOut() {
    this.setState((state) => ({ authStep: 1, email: "" }));
    this.props.logout();
    console.log("redux logout");
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
        //  console.log("wild");
        data.map((item) => {
          item.vote = item.positiveVote.length - item.negativeVote.length;
          return item;
        });
        console.log(data);
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

  dropDownChange(e) {
    console.log("drop down time");
    console.log(e.target.value);
    this.setState({
      topicSelection: e.target.value,
    });
    console.log(this.state.topicSelection);
  }

  handleSubmit(event) {
    event.preventDefault();
    //  console.log("handleSubmit TIMEZ");
    const { messageContent, topicSelection } = this.state;
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
      body: JSON.stringify({
        text: messageContent,
        emailtext: this.props.user.emailR,
        topic: topicSelection,
      }),
    }).then((res) => {
      //   console.log("something happening here" + res);
    });
    this.clickHandler();
  }

  render() {
    var { chars_left, authStep, messageholder, topics, value } = this.state;
    //  console.log(this.state.email);
    //  console.log(this.state.passowrd);
    // console.log("OK???");
    //  console.log("reallyOK???");
    const anonymoususer = <span>anonymous &nbsp;&nbsp;&nbsp;</span>;

    const filterDisplay = (
      <div>
        FILTER
        <div>
          <button onClick={this.voteFilter} type="button">
            VOTES
          </button>
          <button>TOPIC</button>
          <button>NEWEST</button>
          <button>AUTHOR</button>
        </div>
      </div>
    );

    const superDBdisplay = (
      <div>
        <p>Messages are shown here below. </p>
        {filterDisplay}
        {messageholder.map((item, index) => (
          <div key={index}>
            <div id="messagetime">
              <span>
                {item.text}
                <div>
                  <div id="timestamp">
                    <span id="timestamp">
                      Author: &nbsp;
                      {item.emailtext === "" ? anonymoususer : item.emailtext}
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
                      className="buttontools"
                      onClick={(e) => this.clickRemover(e)}
                    >
                      delete
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="buttontools"
                      id={item._id}
                      onClick={(e) => this.upVote(e)}
                    >
                      upvote
                    </button>{" "}
                    <span id="buttontools">
                      {item.positiveVote.length - item.negativeVote.length > 0
                        ? "+" +
                          (item.positiveVote.length - item.negativeVote.length)
                        : item.positiveVote.length - item.negativeVote.length}
                    </span>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="buttontools"
                      id={item._id}
                      onClick={(e) => this.downVote(e)}
                    >
                      downvote
                    </button>
                    &nbsp;&nbsp;
                  </div>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
    /*
  <label id="droppyL" for="topics">
                      topic:
                    </label>
                    <select
                      onChange={this.dropDownChange}
                      name="topics"
                      id="topics"
                    >
                      {topics.map((item, index) => (
                        <option value={item}>{item.value}</option>
                      ))}
                    </select>*/
    const authStepOne = (
      <div className="authy">
        <button
          className="buttontools"
          type="button"
          onClick={this.loginClick.bind(this)}
        >
          log in
        </button>
        &nbsp;&nbsp;
        <button
          className="buttontools"
          type="button"
          onClick={this.signupClick.bind(this)}
        >
          sign up
        </button>
      </div>
    );

    const authStepTwo = (
      <div className="authy">
        <form>
          Log in here &nbsp;&nbsp;&nbsp;
          <input
            className="buttontools"
            name="email"
            placeholder="EMAIL"
            type="text"
            value={this.state.email}
            onChange={this.handleChangeX}
          />
          <input
            className="buttontools"
            name="password"
            placeholder="PASSWORD"
            type="text"
            value={this.state.password}
            onChange={this.handleChangeX}
          />
          <button
            type="button"
            className="buttontools"
            name="submit"
            onClick={() => this.submitLogIn()}
          >
            submit
          </button>
        </form>
      </div>
    );

    const authStepThree = (
      <div className="authy">
        <form>
          Sign up here &nbsp;&nbsp;&nbsp;
          <input
            className="buttontools"
            name="email"
            placeholder="EMAIL"
            type="text"
            value={this.state.email}
            onChange={this.handleChangeX}
          />
          <input
            className="buttontools"
            name="password"
            placeholder="PASSWORD"
            type="text"
            value={this.state.password}
            onChange={this.handleChangeX}
          />
          <button
            type="button"
            className="buttontools"
            name="submit"
            onClick={() => this.submitSignUp()}
          >
            submit
          </button>
        </form>
      </div>
    );

    const authStepFour = (
      <div className="authy">
        Welcome {this.props.user.emailR}. &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="buttontools"
          name="submit"
          onClick={this.logOut.bind(this)}
        >
          Log out.
        </button>
      </div>
    );

    const authStepFive = (
      <div className="authy">
        <button
          type="button"
          className="buttontools"
          name="submit"
          onClick={this.loginClick.bind(this)}
        >
          Thanks for signing up. Click here to Log in
        </button>
      </div>
    );

    return (
      <form id="marginy">
        {this.props.user.isLoggedIn ? authStepFour : null}
        {authStep === 1 ? authStepOne : null}
        {authStep === 2 ? authStepTwo : null}
        {authStep === 3 ? authStepThree : null}
        {authStep === 5 ? authStepFive : null}
        <h1 id="titleM">Message Board</h1>
        {chars_left}&nbsp;&nbsp;
        <span id="textfancy">
          <textarea
            id="fancy"
            autoFocus={true}
            maxLength="400"
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
          className="buttontoolsS"
          name="submit"
          onClick={this.handleSubmit}
        >
          submit
        </button>
        <label id="droppyL" htmlFor="topics">
          topic:
        </label>
        <select
          onChange={this.dropDownChange}
          name="topics"
          id="topics"
          value={value}
        >
          {topics.map((element, index) => (
            <option key={index} value={element.value}>
              {element.value}
            </option>
          ))}
        </select>
        {superDBdisplay}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login, logout })(MessageForm);
