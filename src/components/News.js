import "../App.css";
import React from "react";

//import GoogleLogin from "react-google-login";

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsContainer: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://content.guardianapis.com/search?api-key=d7b5e693-7595-415b-b3e3-259584d1733f"
    )
      .then((res) => res.json())
      .then((json) => {
        //  console.log("YOYO" + json);
        //  console.log(json);
        this.setState({
          newsContainer: json.response.results,
        });
      });
  }

  render() {
    var { newsContainer } = this.state;
    console.log("news here");
    console.log(this.state.newsContainer);
    return (
      <div>
        {newsContainer.map((value, index) => {
          return (
            <div>
              <div key={index}> {value.webTitle} </div>
            </div>
          );
        })}
      </div>
    );
  }
}

//export default App;

export default News;
