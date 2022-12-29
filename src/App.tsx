import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { appendFile } from 'fs/promises';
import api from "./api"

function App() {
  const [songsTheme,setSongsTheme] = useState("")
  const [results,setResults] = useState([])
  async function handleSubmit(event: any){
    event.preventDefault();
    const response = await api.get("search", {params: {tag: songsTheme}})
    
    if (response.data?.result?.length) {
      console.log("whatever")
      setResults(response.data.result)
    }
    
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>){setSongsTheme(event.target.value)}
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>songsTheme<input type="text" value={songsTheme} onChange={handleChange} placeholder='put your theme name'/></label>
        <input type="submit" value="Envoyer"/>
        
      </form>
      {results.length === 0 ? (
        <div className="">no results yet</div>
      ): (
        results.map(result => <div key={`${result[0]}: ${result[1]}`}>{result[0]}: {result[1]}</div>)
      )}
    </div>
  );
}

export default App;
