import React, { Component } from 'react';
import { Provider } from "react-redux";
import Main from '../components/Main';
import Game from '../components/Game';

class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Provider store={this.props.store}>
        <Main>
          <Game />
        </Main>
      </Provider>
    );
  }
}

export default App;