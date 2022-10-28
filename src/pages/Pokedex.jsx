import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CardPokedex from '../components/pokedex/CardPokedex'
import InputSearch from '../components/pokedex/InputSearch'
import  SelectByType from '../components/pokedex/SelectByType'

const Pokedex = () => {

  const [Pokemons, setPokemons] = useState()
  const [typeselected, settypeselected] = useState('All Pokemons')

  useEffect(() => {
    if(typeselected !== 'All Pokemons') {
      axios.get(typeselected)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    } else {
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
      axios.get(URL)
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
    }
  }, [typeselected])

  const userName = useSelector(state => state.userName)
  
  return (
    <div>
      <header>
      <h1>Pokedex</h1>
      <p>Welcome <span>{userName}</span>, here you can find your favorite pokemon.</p>
      </header>
      <aside>
        <InputSearch/>
        <SelectByType settypeselected={settypeselected}/>
      </aside>
      <main>
        <div>
          {
            Pokemons?.map(pokemon => (
              <CardPokedex
              key={pokemon.url}
              url={pokemon.url}
              />
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Pokedex