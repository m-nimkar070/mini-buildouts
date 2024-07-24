const Login = ({ isLogged }) => {
    return (
      <div>
        <h1>Login Page</h1>
        {isLogged ? <p>Welcome, user!</p> : <p>Invalid username or password</p>}
      </div>
    );
  };
  
  export default Login;
  