import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon404 from '../components/pokedexId/Pokemon404'

const PokedexById = () => {

  const { id } = useParams()

  const [Pokemon, setPokemon] = useState()
  const [hasError, sethasError] = useState(false)

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => {
        console.log(err)
        sethasError(true)
      })
  }, [])

  if (hasError) {
    return <Pokemon404 />
  }

  return (
    <article>
      <header>
        <img src={Pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section>
        <h2>{Pokemon?.name}</h2>
      </section>
    </article>
  )
}

export default PokedexById