import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string()
      .regex(/^[a-zA-z0-9]{3,6}$/)
      .required()
      .label("Name"),
  };

  doSubmit = () => {
    console.log("Registration completed successfully");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("注册")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
