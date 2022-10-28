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

  console.log(Pokemon)

  if (hasError) {
    return <Pokemon404 />
  }

  return (
    <article>
      <header>
        <img src={Pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section>
        <h1>#{Pokemon?.id}</h1>
        <h2>{Pokemon?.name}</h2>
        <h5>Height</h5>
        <p>{Pokemon?.height}</p>
        <h5>Weight</h5>
        <p>{Pokemon?.weight}</p>
      </section>
      <section>
        <h3>Type</h3>
        <ul>
          {
              Pokemon?.types.map(type => (
                <li key={type.slot}>{type.type.name}</li>
            ))
          }
        </ul>
        <h3>Abilities</h3>
        <ul>
          {
              Pokemon?.abilities.map(ability => (
                <li key={ability.slot}>{ability.ability.name}</li>
            ))
          }
        </ul> 
      </section>
      <section>
        <h3>Stats</h3>
        <ul>
                {
                    Pokemon?.stats.map(stat => (
                        <li key={stat.stat.name}>
                            <span>{stat.stat.name}</span>
                            <span>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
      </section>
      <section>
        <h3>Movements</h3>
        <ul>
          {
              Pokemon?.moves.map(move => (
                <li key={move.move.name}><span>{move.move.name}</span></li>
            ))
          }
        </ul> 
      </section>
    </article>
  )
}

export default PokedexById