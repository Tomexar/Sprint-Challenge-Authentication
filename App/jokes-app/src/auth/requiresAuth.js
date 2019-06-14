import React from 'react';
import axios from 'axios';

const token = localStorage.getItem('jwt');


axios.defaults.baseURL = 'http://localhost:3300/api';

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const notLoggedIn = <div>Please login</div>;

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
