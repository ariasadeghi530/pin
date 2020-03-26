import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
  };

  render() {

    return (
      // <Button variant="contained" color="primary">
      //   Hello World
      // </Button>
      <div className="container-fluid min-vh-100 bg-light">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <form className="bg-white border rounded shadow col-lg-4 offset-lg-4 px-5 py-5 col-10 offset-1" onSubmit={this.onSubmit} method="post">
            <label><h3>Log in</h3></label>
            <br />
            <br />
            <div className="form-group">
              <input className="form-control" onChange={this.onChange} value={this.state.email} type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input className="form-control" onChange={this.onChange} value={this.state.password} type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group text-center pt-4">
              <button className="btn btn-md btn-primary px-4" type="submit" value="Submit">Log in</button>
            </div>
          </form>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default Login;