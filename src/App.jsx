import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state, setState] = useState({url:"", now:"", out:""})

  function userInput(e){
    setState({...state, [e.target.name]:e.target.value})
  }

  function setTimeStamp(){

    const time = state.now.match(/\w+/g) 

    for (let i in time) time[i]=parseInt(time[i])


    if (time.length === 2) time[0]=time[0]*60
    if (time.length === 3) {time[0]=time[0]*60*60; time[1]=time[1]*60}

    let sum = 0
    for (let x of time) sum += x


    // const regex = /https:\/\/(?:www\.youtube\.com|youtu\.be)\/(?:watch\?v=|live\/|)([a-zA-Z0-9_-]{11})/;

    const url_part = state.url.match(/https:\/\/(?:www\.youtube\.com|youtu\.be)\/(?:watch\?v=|live\/|)([a-zA-Z0-9_-]{11})/) 


    console.log(time)
    console.log(sum)
    // const result = `https://${matches[1]}/${matches[2]}?t=999`
    const result = `https://youtu.be/${url_part[1]}?t=${sum}`
    // console.log(matches)

    setState({...state, out:result})

  }

  

  return (
    <>
      <input type="url" name="url" onChange={userInput} value={state.url} className='form-control'/>
      <input type="text" name="now" onChange={userInput} value={state.now} className='form-control'/>
      <button onClick={setTimeStamp} className='btn btn-danger'>Ok!</button>
      {state.out && <>{state.out}</>}

    </>
  )
}

export default App
