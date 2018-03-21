import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { subscribeToTimer, listenForUpdates } from './socket';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      update: 'no update yet'
    };

    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));

    listenForUpdates((err, update) => this.setState({ 
      update 
    }));

  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    // axios.get('/api/book')
    //   .then(res => {
    //     this.setState({ books: res.data });
    //     console.log(this.state.books);
    //   })
    //   .catch((error) => {
    //     if(error.response.status === 401) {
    //       this.props.history.push("/login");
    //     }
    //   });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <div className="App">
              <p className="App-intro">
                This is the timer value: {this.state.timestamp}
              </p>
              <p className="App-intro">
              This is the update value: {this.state.update}
            </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;