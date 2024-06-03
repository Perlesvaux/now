import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state, setState] = useState({url:"", now:"", out:"", cb:false})

  function userInput(e){
    setState({...state, [e.target.name]:e.target.value})
  }

  function seconds(){
    const time = []
    state.now.match(/\w+/g).forEach(t => time.push(parseInt(t)))

    if (time.length === 2) time[0]=time[0]*60
    if (time.length === 3) {time[0]=time[0]*60*60; time[1]=time[1]*60}

    let sum = 0
    for (let t of time) sum += t

    return sum;
  }

  function setTimeStamp(e){
      e.preventDefault()

      const sum = seconds()
      const url_part = state.url.match(/https:\/\/(?:www\.youtube\.com|youtu\.be)\/(?:watch\?v=|live\/|)([a-zA-Z0-9_-]{11})/) 

      const result = `https://youtu.be/${url_part[1]}?t=${sum}`

      let output = {...state, out:result}

      try {
        navigator.clipboard.writeText(result);
        output = {...output, cb:true}
        
      } catch (error) {
        console.error(error)
      }

      setState(output)

  }

  

  return (
    <div>


      <div className='card bg-light' style={{borderBottomLeftRadius:"0px", borderBottomRightRadius:"0px"}}  >
          <div className='card-header text-muted fs-6'>Timestamp YT videos from your mobile!</div> 

        <div className='card-body'>
          <form onSubmit={setTimeStamp}>

            <input type="url" name="url" onChange={userInput} value={state.url} className='form-control text-center' placeholder='URL' required/>
            <input type="text" name="now" onChange={userInput} value={state.now} className='form-control text-center' placeholder='SS | MM:SS | HH:MM:SS' required/>
            <button type="submit" style={{display:"none"}} > ok </button>

            <map name="pezote">
              <area onClick={(e)=>{e.target.parentElement.parentElement.requestSubmit()}} shape="rect" coords="138,164,298, 279" alt="Nosy pezote!" className="pointer"/>
            </map>

          </form>

        </div>

        { state.out ? <div className='card-body text-muted fs-6'>{state.out}</div> : <div className='text-muted card-body fs-6'>Pezote: "Hey! Check out this icon!"</div> }

        
        </div>
      
      <div className='card bg-danger' >
        <img useMap="#pezote" width="307px" height="307px" src="./pezotenow.jpeg" className="coati card-img-bottom text-center" alt="Pezote buddy will help you out!" />
      </div>


      <div className='card bg-light' style={{borderTopLeftRadius:"0px", borderTopRightRadius:"0px"}}>
        { state.cb && <div className='card-body text-muted fs-6'>Copied to clipboard!</div> }
      </div>

    </div>
  )
}



            // <div className="d-grid gap-2">
            //   <button className='btn btn-danger'>Ok!</button>
            // </div>

export default App
