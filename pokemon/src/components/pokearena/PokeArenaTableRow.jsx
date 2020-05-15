import React, { Component } from 'react'

export default class PokemonArenaTableRow extends Component {

    renderizarPokemon() {

        const imgUrl =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`

        if (this.props.jogador) {
            return (
                <button className='btn btn-outline-light'
                    style={{ padding: 0, margin: 0, borderRadius: 0, border: 'none' }}
                    onClick={() => this.props.mudarEscolhido(this.props.index)}>
                    <img src={imgUrl} alt={this.props.id} />
                </button>
            )

        } else {
            const opacity = this.props.life/100
            return(
                <img src={imgUrl} alt={this.props.id} style={{opacity:opacity}}/>
            )
        }
    }

    render() {


        return (
            <div>
                {this.renderizarPokemon()}
            </div>
        )
    }
}