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
      currentQuote: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentQuote: this.state.quotes[this.getRandomInt(0, this.state.quotes.length)]
    })
  }

  getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
      <span>Your random quote is:</span>
      <h2>{this.state.currentQuote}</h2>
      <span>don't like this quote? add one of your own!</span>
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
