import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

//this is our Login component
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="formContainer">
          <div className="secondFormContainer">
            <label className="labelName" htmlFor="email">
              <p>Email</p>
            </label>
            <input className="input" name="email" type="text" />
          </div>
          <div className="secondFormContainer">
            <label className="labelName" htmlFor="password">
              <p>Password</p>
            </label>
            <input className="input" name="password" type="password" />
          </div>
          <div>
            <button className="button" type="submit">
              {displayName}
            </button>
          </div>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

// const mapSignup = (state) => {
//     return {
//         name: "signup",
//         displayName: "Sign Up",
//         error: state.auth.error,
//     };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatchToProps)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatchToProps)(AuthForm);
