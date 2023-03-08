import axios from "axios";

export const Header = (props) => {

  const logMeOut = () => {
    axios({
      method: "POST",
      url:"http://localhost:8000/user/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}
