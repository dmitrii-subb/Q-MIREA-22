import React from "react";
import Bot from "./Bot";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.bot = new Bot("5825855...6aWdotFN5U_j0");

    this.state = {
      messages: [],
      message: "hello, world",
    };

    this.addMessage.bind(this);
  }

  addMessage = (user_message) => {
    console.log(this);
    let messages = this.state.messages.map((message, index) => {
      return <div key={index}>{message}</div>;
    });
    messages.push(<div>{user_message}</div>);
    this.setState({ ...this.state.messages, messages });
  };

  sendMessage = () => {
    this.bot.sendMessage(this.state.message);
    this.addMessage(this.state.message);
  };

  componentDidMount() {
    this.bot.run(this.addMessage);
  }

  componentDidUpdate() {
    console.log("messsages", this.state.messages);
  }

  render() {
    return (
      <>
        <div>
          <button onClick={() => this.sendMessage()}>Send Message</button>
        </div>
        <input
          onChange={(e) => {
            this.setState({ ...this.state, message: e.target.value });
          }}
          type="text"
        />
        <div>{this.state.messages}</div>
      </>
    );
  }
}

export default App;
