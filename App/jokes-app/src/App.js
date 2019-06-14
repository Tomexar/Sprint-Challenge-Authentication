import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import JokeList from './jokes/JokeList';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;


`;


const LogoutBtn = styled.button`
  background: white;
  border:1px solid black;
  border-radius: 4px;
  cursor: pointer;
  padding:10px;
  margin:10px;
  font-size:12px;
  &: hover{
    background: black;
    color: white;
  }

`;

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Nav>
            <NavLink className = 'navlink' to="/jokes">Users</NavLink>
            <NavLink className = 'navlink' to="/login">Login</NavLink>
            <NavLink className = 'navlink' to="/register">Register</NavLink>
            <LogoutBtn onClick={this.logout}>Logout</LogoutBtn>
          </Nav>
        </header>
        <main>
          <Route path="/jokes" component={JokeList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
      </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  };
}

export default withRouter(App);
