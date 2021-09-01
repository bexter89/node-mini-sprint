import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuote: '',
      quotes: [
          'dont cry for me argentinaaaaa!',
          'it was a run-by fruiting!',
          'youre not gonna believe this, but its a one-wheeled haystack!',
          'one does not simply walk into mordor',
          'here we go, one more time, everybodys feeling fine!'
        ],
      currentQuote: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitQuote = this.handleSubmitQuote.bind(this);
    this.handleUpdateQuote = this.handleUpdateQuote.bind(this);
    this.handleEditQuote = this.handleEditQuote.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
  }

  componentDidMount() {
    axios.get('/quote')
    .then((response)=> {
      var startingQuote = response.data[0]['text'];
      this.setState({
        currentQuote: startingQuote,
      })
    })
    .catch((error) => {
      console.log('error! ', error);
    })
  }

  handleSubmitQuote(event) {
    event.preventDefault();
    console.log('*** handle submit quote triggered!')
    axios.post('/quote', { text: this.state.newQuote })
    .then((response)=> {
      console.log('*** WE HAVE A RESPONSE! ***');
       this.setState({
        newQuote: '',
      })
    })
    .catch((error) => {
      console.log('error! in handleSubmit ', error);
    })
  }

  handleChange(event) {
    this.setState({
        newQuote: event.target.value,
      })
  }

  handleUpdateQuote(event) {
    event.preventDefault();
    axios.get('/quote')
    .then((response)=> {
      var quote = response.data[0]['text'];
      this.setState({
        currentQuote: quote,
      })
    })
    .catch((error) => {
      console.log('error!!! in handle update quote! ', error);
    })
  }

  handleEditQuote(event) {
    event.preventDefault();
    axios.post('/editQuote')
    .then((response)=> {
      var quote = response.data[0]['text'];
      this.setState({
        currentQuote: quote,
      })
    })
    .catch((error) => {
      console.log('error!!! in hanlde update quote! ', error);
    })
  }

  handleDeleteQuote(event) {
    event.preventDefault();
    axios.post('deleteQuote')
    .then((response)=> {
      var quote = response.data[0]['text'];
      this.setState({
        currentQuote: quote,
      })
    })
    .catch((error) => {
      console.log('error!!! in hanlde update quote! ', error);
    })
  }

  render() {
    return (
      <div id="quote">
      <h1>Bekah's Random Quote Generator</h1>
      <span>Your random quote is:</span>
      <h2>{this.state.currentQuote}</h2>

      <form onSubmit={this.handleUpdateQuote}>
        <label htmlFor="getNewQuote">
        <input type="submit" value="get a new quote" />
        </label>
      </form>
     <br/><br/>
     <span>don't like this quote?</span>
      <form onSubmit={this.handleEditQuote}>
        <label htmlFor="editQuote">
        <input type="text" name="editquote"  placeholder="fix this quote" />
        <input type="submit" value="make it better!" />
        </label>
      </form>
      <br/>
     <span> or, you can delete it.</span>
      <form onSubmit={this.handleDeleteQuote}>
        <label htmlFor="deleteQuote">
        <input type="submit" value="delete quote" />
        </label>
      </form>
      <br/><br/>
      <span>or, submit one of your own!</span>
      <form onSubmit={this.handleSubmitQuote} onChange={this.handleChange} value={this.state.newQuote}>
        <label htmlFor="addQuote">
        <input type="text" name="addquote"  placeholder="add a new quote" />
        </label>
        <input type="submit" value="Submit!" />
      </form>
      </div>
    )
  }
};
