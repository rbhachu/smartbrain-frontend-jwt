import React, { Component } from 'react';

class Rank extends Component {
  constructor() {
    super()
    this.state = {
      emoji: ''
    }
  }


  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries) {
      return null
    }
    this.generateEmoji(this.props.entries)
  }

  //aws lambda
  generateEmoji = (count) => {
    fetch(`${process.env.REACT_APP_AWS_LAMBDA}/rank?rank=${count}`)
      .then(response => response.json())
      .then(data => this.setState({emoji: data.input}))
      .catch(console.log)
  }


  render() {
    //const { name, entries } = this.props;
    return (
      <>
          {this.state.emoji}
      </>
    );
  }
}

export default Rank;