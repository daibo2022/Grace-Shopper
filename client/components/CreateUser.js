import React from "react";
import { connect } from "react-redux";
import { createUser } from "../store/createUser";

// this is our Signup component
export class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "", // ???
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      this.props.createUser(this.state);
    } catch (error) {
      this.setState({
        email: "",
        name: "",
        password: "",
      });
    }
  }
  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div className="formContainer">
            <div className="secondFormContainer">
              <label className="labelName" htmlFor="email">
                <p>Email</p>
              </label>
              <input
                className="input"
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="secondFormContainer">
              <label className="labelName" htmlFor="name">
                <p>First Name</p>
              </label>
              <input
                className="input"
                type="name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
            <div className="secondFormContainer">
              <label htmlFor="password" className="labelName">
                <p>Password</p>
              </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div>
              <button className="button" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, otherProps) => {
  return {
    createUser: (props) => dispatch(createUser(props, otherProps.history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
