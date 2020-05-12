import React, { Component } from 'react'

export default class PokemonArenaTableRow extends Component {

    render() {
        const imgUrl =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`

        
        return (
            <button className='btn btn-outline-light'
                    style={{ padding: 0, margin: 0, borderRadius: 0, border: 'none' }}>

                        <img src={imgUrl} alt={this.props.id}/>
            </button>
        )
    }
}