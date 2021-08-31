import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuote: '',
      quotes: [
          'dont cry for me argentinaaaaa!',
          'it was a run-by fruiting! ',
          'youre not gonna believe this, but its a one-wheeled haystack!',
          'one does not simply walk into mordor',
          'here we go, one more time, everybodys feeling fine!'
        ],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      quotes: [...this.state.quotes, this.state.newQuote ]
     }
    ), this.setState({
      newQuote: '',
    })
  }

  handleChange(event) {
    this.setState(
      {
        newQuote: event.target.value,
      }
    )
  }

  render() {
    return (
      <div>
      <h1>Bekah's Random Quote Generator</h1>
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label htmlFor="addquote">
        <input type="text" name="addquote" value={this.state.newQuote} placeholder="add a new quote" />
        </label>
        <input type="submit" value="Submit!" />
      </form>
      </div>
    )
  }
};
