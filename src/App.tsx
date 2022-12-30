import React, { ChangeEvent, useState } from 'react';
import './App.css';
import api from "./api"
import { TextField } from '@mui/material';

function FindSongsByTheme({}) {
  const [songsTheme,setSongsTheme] = useState("")
  const [results,setResults] = useState([])
  async function handleSubmit(event: any){
    event.preventDefault();
        const response = await api.get("search", {params: {tag: songsTheme}})
        if (response.data?.result?.length) {
          //console.log("whatever")
          setResults(response.data.result)
        }

  }
  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setSongsTheme(event.target.value)
  }
  return (
    <div className="feature">
      <div className="form-title">
        <span className="span">Find a song by theme</span>
        <form className="form" onSubmit={handleSubmit}>
          <TextField label="Song theme" variant="outlined" value={songsTheme} onChange={handleChange} placeholder='Enter a song theme' />
          <input type="submit" value="Send" className="send-btn" />
        </form>
      </div>
      {results.length === 0 ? null : (
        <>
          <h2 className="results">Results</h2>
          {
            results.map(
              result => (
                <div className="result" key={`${result[0]}: ${result[1]}`}>
                  {result[0]}: {result[1]}
                </div>))
          }
        </>
      )}
    </div>
  )
}

function FindThemeByLyrics({}) {
  const [songsLyrics,setSongsLyrics] = useState("")
  const [results,setResults] = useState([])
  async function handleSubmit(event: any){
    event.preventDefault();
        const response = await api.get("predict", {params: {parole: songsLyrics}})
        if (response.data?.result?.length) {
          //console.log("whatever")
          setResults(response.data.result)
        }

  }
  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setSongsLyrics(event.target.value)
  }
  return (
    <div className="feature">
      <div className="form-title">
        <span className="span">Find theme by lyrics</span>
        <form className="form" onSubmit={handleSubmit}>
          <TextField label="Song lyrics" variant="outlined" value={songsLyrics} onChange={handleChange} multiline maxRows={4} placeholder='Enter song lyrics' />
          <input type="submit" value="Send" className="send-btn" />
        </form>
      </div>
      {results.length === 0 ? null : (
        <>
          <h2 className="results">Results</h2>
          {
            results.map(
              (result, index) => (
                <div className="result" key={result + index}>
                  {result}
                </div>))
          }
        </>
      )}
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1>SongsTheme</h1>
      <div className="container">
        <FindSongsByTheme />
        <FindThemeByLyrics />
        <FindSongsByTheme />
      </div>
    </div>
  );
}

export default App;
