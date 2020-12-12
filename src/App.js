import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  const [search,setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, [])

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };


  const next = async () => {
    if (!nextUrl) return;
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }


  return (
    <div className="App">
      <Navbar />
      <input type="text" placeholder="Search Pokémon..." onChange={e => setSearch(e.target.value)}/>
      { loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
          <div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className="grid-container">
              {pokemonData.filter((poke) => {
                if(search === ""){
                  return poke;
                } else if (poke.name.toLowerCase().includes(search.toLowerCase())){
                  return poke;
                }}).map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon} />
              })}
            </div>
          </div>
        )}
      <div className="btn">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default App;
