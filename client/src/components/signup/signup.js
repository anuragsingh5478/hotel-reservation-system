import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./style.css";

export default function SignUp({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      gender: gender,
    };

    axios
      .post(
        "https://hotel-reservation-system-1.herokuapp.com/auth/signup",
        user
      )
      .then((res) => {
        const msg = res.data.msg;
        if (msg === "success") {
          setErrorMsg(msg);
          setToken(res.data.token);
        } else setErrorMsg(msg);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="authentication">
      <div className="auth-container">
        <p className="header">Register</p>
        <form onSubmit={handleSubmission}>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email id"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <div>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="gender"
            />
          </div>
          <div className="error-msg">{errorMsg}</div>
          <div>
            <input type="submit" value="Register" className="submit-button" />
          </div>
        </form>
        <p className="login-register">
          Already have an account, then <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

// export default class SignUp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: "", password: "", message: "", id: "" };

//     this.handleChangedEmail = this.handleChangedEmail.bind(this);
//     this.handleChangedPassword = this.handleChangedPassword.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChangedEmail(event) {
//     this.setState({ email: event.target.value });
//   }
//   handleChangedPassword(event) {
//     this.setState({ password: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const user = {
//       email: this.state.email,
//       password: this.state.password,
//     };
//     axios
//       .post("http://localhost:5000/userauth/signup", user)
//       .then((res) => {
//         if (res.data.msg == "success") {
//           this.setState({ message: res.data.msg, id: res.data.user_id });
//         } else {
//           this.setState({ message: res.data.msg });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <div className="signup-container">
//         <div className="form-container">
//           <form onSubmit={this.handleSubmit}>
//             <div className="form-group">
//               <label>
//                 Email:
//                 <br />
//                 <input
//                   name="email"
//                   type="text"
//                   value={this.state.email}
//                   onChange={this.handleChangedEmail}
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label>
//                 Password:
//                 <br />
//                 <input
//                   name="password"
//                   type="text"
//                   value={this.state.password}
//                   onChange={this.handleChangedPassword}
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <input type="submit" value="SignUp" className="btn btn-primary" />
//             </div>
//             {this.state.message}
//             <div>
//               Already have an Account, <Link to="/login">Login</Link>
//             </div>
//             {this.state.message == "success" ? (
//               <Redirect to={"/setprofile/" + this.state.id}></Redirect>
//             ) : (
//               <Redirect to="/signup"></Redirect>
//             )}
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
