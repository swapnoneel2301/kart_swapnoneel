import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

/** 
 * @class Register component handles the Register page UI and functionality
 *
 * Contains the following fields
 *
 * @property {boolean} state.loading 
 * Indicates background action pending completion. When true, further UI actions might be blocked
 * @property {string} state.username
 *    User given field for username
 * @property {string} state.password
 *    User given field for password
 * @property {string} state.confirmPassword
 *    User given field for retyping and confirming password
 */
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the API call over the network and return the response
   *
   * @returns {{ success: boolean }|undefined}
   *     The response JSON object
   *
   * -    Set the loading state variable to true
   * -    Perform the API call via a fetch call: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * -    The call must be made asynchronously using Promises or async/await
   * -    The call must handle any errors thrown from the fetch call
   * -    Parse the result as JSON
   * -    Set the loading state variable to false once the call has completed
   * -    *** If in Milestone 1 ***,
   * -      return the response JSON object
   * -    *** If in Milestone 2 ***,
   * -      Call the validateResponse(errored, response) function defined previously
   * -        If response passes validation, return the response object
   *
   * Example for successful response from backend for the API call:
   * HTTP 200
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  performAPICall = async () => {
    this.setState({loading:true});
    // const inputValidation = this.validateInput();
    // if(!inputValidation){
    //   this.setState({loading:false});
    //  return;
    // }

    let errored = false;
    const response = await fetch(`${config.endpoint}/auth/register`,{
      method:'POST',
      body : JSON.stringify({username:this.state.username,password:this.state.password}),
      headers:{"Content-Type":"application/json;charset=UTF-8"}
    })
                        .then(resp=>resp.json())
                        .catch(err=>{
                          errored = true;
                          console.log(err);
                        });
    
    this.setState({loading:false});
     
    const responseValidation = this.validateResponse(errored,response);
    if(responseValidation)
       return response;
    
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * -    Check that username field is not an empty value
   * -    Check that username field is not less than 6 characters in length
   * -    Check that username field is not more than 32 characters in length
   * -    Check that password field is not an empty value
   * -    Check that password field is not less than 6 characters in length
   * -    Check that password field is not more than 32 characters in length
   * -    Check that confirmPassword field has the same value as password field
   */
  validateInput = () => {
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if(username==''){
      message.error('Username is required field');
      return false;
    }else if(password==''){
      message.error('Password field is required');
      return false;
    }else if(username.length<6||username.length>32){
      message.error('Username should have more than 6 characters and less than 32 characters');
      return false;
    }else if(password.length<6||password.length>32){
      message.error('Password should have more than 6 characters and less than 32 characters');
      return false;
    }else if(password!==confirmPassword){
      message.error('Confirm password should be same as password');
      return false;
    }

    return true;
    
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Check API response
  /**
   * Check the response of the API call to be valid and handle any failures along the way
   *
   * @param {boolean}  errored
   *    Represents whether an error was thrown when the API call was made
   * @param {{ success: boolean, message?: string }}  response
   *    The response JSON object which may contain further success or error messages
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   *
   * If the API call itself threw an error,
   *  - errored flag will be true.
   * If the API call returns an error eg: 400 or 500 status code instead of 200,
   *  - then "success" field will be "false" and "message" field will have a string with error details to be displayed.
   * eg: HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   * If the API call is successful
   *  - "success" field in API response will be true
   *
   *
   * TODO
   * 1. When API call itself threw an error,
   *  - display a generic error message on the website and return false.
   * 2. When there is an error message returned by backend,
   *  - display an error message with contents of the "message" field of API response and return false.
   * 3. When there is no error and API call is successful,
   *  - return true.
   *
   */
  validateResponse = (errored, response) => {
  
    if(errored)
    {
      message.error('Something went wrong');
      return false;
    }
    if(!response.success){
      message.error(response.message);
      return false;
    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Implement the register function
  /**
   * Definition for register handler
   * This is the function that is called when the user clicks on the register button or submits the register form
   * -    Call the previously defined validateInput() function and check that is returns true, i.e. the input values pass validation
   * -    Call the previously defined performAPICall() function asynchronously and capture the returned value in a variable
   * -    If the returned value exists,
   *      -   Clear the input fields
   *      -   Display a success message
   *      -   Redirect the user to the "/login" page
   */

  clearFields = ()=>{
    this.setState({username:'',password:'',confirmPassword:''});
  }


  register = async () => {

    const inputValidation = this.validateInput();
    if(!inputValidation){
     return;
    }
     const response = await this.performAPICall();
     if(response){
       this.clearFields();
       message.success('Registered successfully');
      this.props.history.push(`/login`);

     }
  };

  

  /**
   * JSX and HTML goes here
   * We require a text field, a password field, and a confirm password field (each with data binding to state), and a submit button that calls register()
   */
  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} />

        {/* Display Register fields */}
        <div className="flex-container">
          <div className="register-container container">
            <h1>Make an account</h1>

            {/* Antd component which renders a formatted <input type="text"> field */}
            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />

            {/* Antd component which renders a formatted <input type="password"> field */}
            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              // TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Add a placeholder text, "Password" to the input bar
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />

            {/* Antd component which renders a formatted <input type="password"> field */}
            <Input.Password
              className="input-field"
              // TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Add a lock icon to the input bar (check how the "Password" input bar is rendered)
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={(e) => {
                this.setState({
                  confirmPassword: e.target.value,
                });
              }}
            />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.register}
            >
              Register
            </Button>
          </div>
        </div>

        {/* Display the footer */}
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Register);