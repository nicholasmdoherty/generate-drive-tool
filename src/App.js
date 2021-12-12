import React, {useEffect, useState} from 'react';
import { Image } from 'react-bootstrap';


export default function App() {

  const [files, setFiles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;

    fetch('/tag-search/operations').then(
      (response) => response.json()
      .then(
        (json) =>{
          if (isMounted) {
            setFiles(json.files)
            setLoading(false)
          }
        },
        (err) => {
          console.error(err)
        }
      )
    )

    return () => { isMounted = false };
  }, []);

  function handleSearchTerm(e) {
    console.log('handler')
    setSearchTerm(e.target.value)
  }

  function searchForInput() {
    setLoading(true);

    fetch(`/tag-search/${searchTerm}`).then(
      (response) => response.json()
      .then(
        (json) =>{
          setFiles(json.files)
          setLoading(false);
        },
        (err) => {
          console.error(err)
        }
      )
    )
  }

  function renderFile(file) {
    return (
        <div style={{margin: "20px 0px", display: "flex", alignItems: "center"}}>
          <Image src={file.iconLink} style={{paddingRight: "5px", height: '100%', width: "auto"}}/>
          <div>
            <a href={file.webViewLink} target="_blank"><p className="mb-0">{file.name}</p></a>
            <p className="mb-0">{file.description}</p>
          </div>
        </div>
    )
  } 


  return (
    <div className="App" style={{marginLeft: "10px"}}>
      <h2 style={{margin: "10px 0px"}}>GENERATE API TOOL</h2>

      <p className="mb-0">Search for Tag</p>
      
      <input
        id="tag-search-term"
        type="text"
        value={searchTerm}
        onChange={handleSearchTerm}
      /> 
      <button
        onClick={searchForInput}
      >Search!</button>

      { loading ? <p> Loading... </p> : files.map((file) => {
        return renderFile(file)
      })}

    </div>
  )
}