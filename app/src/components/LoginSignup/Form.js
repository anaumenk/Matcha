import React, { Component } from 'react';
import {FormErrors} from './FormErrors';
import {fetchPost} from "../../fetch";
import {inject, observer} from 'mobx-react';

class ForgotPass extends Component {
    state = {
        login: '',
        email: '',
    };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    render() {
        const {
            login,
            email,
        } = this.state;
        return (
            <div id="forgot">

                <form>

                    <div className="field-wrap">
                        <input
                            className="input"
                            type="text" required
                            name="login"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <div className="field-wrap">
                        <input
                            className="input"
                            type="email" required
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <button className="button button-block">Recover</button>

                </form>
            </div>
        );
    }
}

@inject('Login')
@observer
class SignUpForm extends Component {
    state = {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: 1,
        formErrors: {password: '', email: '', login: ''},
        passwordValid: false,
        emailValid: false,
        loginValid: false,
        formValid: false,
    };


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors,
            emailValid = this.state.emailValid,
            passwordValid = this.state.passwordValid,
            loginValid = this.state.loginValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.match(/[a-z]*[0-9]+[a-z]*[0-9]+[a-z]*/i);
                fieldValidationErrors.password = !passwordValid ?
                    (value.length >= 6 ? ' must contains chars and minimum 2 numbers' : ' is too short')
                    :(value.length >= 6 ? '' : ' is too short');
                break;
            case 'qlogin':
                loginValid = false;
                fieldValidationErrors.login = 'already exist';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            loginValid: loginValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.loginValid});
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {this.validateField(name, value)});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.noErrors();
        let params = `firstName=${this.state.firstName}&lastName=${this.state.lastName}&
        email=${this.state.email}&login=${this.state.login}&password=${this.state.password}&
        gender=${this.state.gender}`;
        fetchPost('register', params).then(response => {
            // console.log(response);
            let array = JSON.parse(response);
            if (array['error'] === 'true') {
                this.validateField(array['fieldName']);
            }
            else if (array['error'] === 'false') {
                this.props.Login.LogIn(this.state.login);
            }
            // else {
            //     this.props.Login.LogIn(array['login']);
            //     // this.props.myStore.LogIn();
            // }
        });
    };

    render() {
        const {
            firstName,
            lastName,
            login,
            email,
            password,
            formErrors
        } = this.state;

        return(
            <div id="signup">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="top-row">
                        <div className="field-wrap">
                            <input
                                className="input"
                                type="text" required
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => this.handleUserInput(e)}
                            />
                        </div>

                        <div className="field-wrap">
                            <input
                                className="input"
                                type="text" required
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => this.handleUserInput(e)}
                            />
                        </div>
                    </div>

                    <div className="top-row">
                        <div className="field-wrap">
                            <input
                                className="input"
                                type="text" required
                                placeholder="Login"
                                value={login}
                                name="login"
                                onChange={(e) => this.handleUserInput(e)}
                            />
                        </div>

                        <div className="field-wrap">
                            <select id="gender" name="gender" onClick={(e) => this.handleUserInput(e)}>
                                <option value="1">Man</option>
                                <option value="2">Woman</option>
                            </select>
                        </div>
                    </div>

                    <div className="field-wrap">
                        <input
                            className="input"
                            type="email" required
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <div className="field-wrap">
                        <input
                            className="input"
                            type="password" required
                            name="password"
                            placeholder="Set A Password"
                            value={password}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="button button-block"
                    >Sign up</button>
                </form>
                <FormErrors formErrors={formErrors} />
            </div>
        );
    }
}

@inject('Login')
@inject('User')
@observer
class LogInForm extends Component {
    state = {
        login: '',
        password: '',
        formErrors: {password: '', login: ''},
        passwordValid: false,
        loginValid: false,
        formValid: false,
    };


    validateField(fieldName) {
        let fieldValidationErrors = this.state.formErrors;
        let loginValid = this.state.loginValid;
        let passwordValid = this.state.passwordValid;
        let error = 'is incorrect';

        switch(fieldName) {
            case 'login':
                fieldValidationErrors.login = error;
                break;
            case 'password':
                fieldValidationErrors.password = error;
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            loginValid: loginValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.loginValid && this.state.passwordValid});
    }

    handleUserInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    noErrors() {
        this.setState({formErrors: {password: '', login: ''}});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.noErrors();
        let params = `login=${this.state.login}&password=${this.state.password}`;
        fetchPost('login', params).then(response => {
            let array = JSON.parse(response);
            if (array['error']) {
                this.validateField(array['fieldName']);
            }
            else {
                this.props.Login.LogIn(array[0]['userId']);
                // this.props.User.pushInfo(array[0]);
                // console.log(this.props.User.userId);
            }
        });
    }

    render() {
        const {ForgotPass} = this.props;
        const {
            login,
            password,
            formErrors,
        } = this.state;

        return(
            <div id="login">
                <form onSubmit={(e) =>this.handleSubmit(e)}>
                    <div className="field-wrap">
                        <input
                            className="input"
                            type="text" required
                            name="login"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <div className="field-wrap">
                        <input
                            className="input"
                            type="password" required
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => this.handleUserInput(e)}
                        />
                    </div>

                    <p className="forgot"><a className="link" onClick={ForgotPass}>Forgot Password?</a></p>

                    <button
                        className="button button-block"
                    >Log In</button>

                </form>
                <FormErrors formErrors={formErrors} />
            </div>
        );
    }
}

export default class Form extends Component {
    state = {
        active: {background: '#1ab188', color: '#ffffff'},
        notactive: {},
        form: null,
    };

    ForgotPass = () => {
        this.setState({
            form: <ForgotPass />,
            active: {},
        });
    };

    ChooseForm(e) {
        if (e.target.innerHTML === 'Sign Up') {
            this.setState({
                form: <SignUpForm
                    login={this.state.login}
                    email={this.state.email}
                    password={this.state.password}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                />,
                active: {},
                notactive: {background: '#1ab188', color: '#ffffff'},
            })
        }
        else if (e.target.innerHTML === 'Log In') {
            this.setState({
                form: <LogInForm
                    ForgotPass={this.ForgotPass}
                />,
                active: {background: '#1ab188', color: '#ffffff'},
                notactive: {},
            })
        }
    }

    render() {
        const {
            active,
            form,
            notactive,
        } = this.state;

        return (
            <div id="main_form">
                <ul className="tab-group">
                    <li>
                        <a
                            className="link"
                            style={notactive}
                            onClick={(e) => this.ChooseForm(e)}
                        >Sign Up</a>
                    </li>

                    <li>
                        <a
                            className="link"
                            style={active}
                            onClick={(e) => this.ChooseForm(e)}
                        >Log In</a>
                    </li>
                </ul>
                {form ? form : <LogInForm
                    ForgotPass={this.ForgotPass}
                />}
            </div>

        );
    }
}