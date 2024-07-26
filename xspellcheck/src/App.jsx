import { useState } from 'react'
import './App.css'

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};

function App() {
  const [inputText, setInputText] = useState("")
  const [suggestionText , setSuggestionText] = useState("")

  const handleChnage=(e)=>{
    const text = e.target.value;
    setInputText(text);

    const words = text.split(" ");
    const correctedWords = words.map((word)=>{
      const correctedWord = customDictionary[word.toLowerCase()];
      return correctedWord || word;
    })
    const firstCorrection = correctedWords.find((word ,index)=> word !== words[index]);

    setSuggestionText(firstCorrection || "")
  }

  return (
    <>
    <div className='spellcheck'>
      <h1>Spell Check and Auto-Correction</h1>
      <textarea name="textArea" id="textArea" placeholder='Enter Text...'  value={inputText} onChange={handleChnage}></textarea>
      {suggestionText && (
        <p>
          Did you mean: <strong>{suggestionText}</strong>
        </p>
      )}
    </div>

    </>
  )
}

export default App
