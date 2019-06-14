import React from 'react';
import axios from 'axios';

import '../auth/addInterceptors';
import requiresAuth from '../auth/requiresAuth';

class JokeList extends React.Component {
  state = {
    jokes: [],
  };

  render() {
    return (
      <>
        <h2>Jokes</h2>

        <ul>
          {this.state.jokes.map(u => (
            <li key={u.id}>{u.joke}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = '/jokes';

    axios
      .get(endpoint)
      .then(res => {
        console.log('jokes', res.data);
        this.setState(() => ({ jokes: res.data }));
      })
      .catch(({ response }) => {
        console.error('jokes error', response);
      });
  }
}

export default requiresAuth(JokeList);
