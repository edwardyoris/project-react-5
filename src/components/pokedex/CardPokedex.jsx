import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CardPokedex = ({ url }) => {

    const [Pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pokedex/${Pokemon.id}`)
    }

    return (
        <article onClick={handleClick}>
            <header>
                <img src={Pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section>
                <h3>{Pokemon?.name}</h3>
                <ul>
                    {
                        Pokemon?.types.map(type => (
                            <li key={type.slot}>{type.type.name}</li>
                        ))
                    }
                </ul>
                <p>Type</p>
            </section>
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
        </article>
    )
}

export default CardPokedex