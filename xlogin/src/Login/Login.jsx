
const Login = ({isLogged}) => {
  return (
    <div>
        <h1>Login Page</h1>
        {isLogged ? <p>Welcom, user!</p> : <p>Invalid usrname or password</p>}
    </div>
  )
}

export default Login
