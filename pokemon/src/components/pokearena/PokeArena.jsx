import React, { Component } from 'react'
import background from '../../img/battlegrass.png'
import PokeArenaTableRow from './PokeArenaTableRow'

export default class PokeArena extends Component {

    constructor(props) {
        super(props)
        let equipeRocket = [
            { id: 24, nome: 'arbok', life: 100 },
            { id: 52, nome: 'meowth', life: 100 },
            { id: 110, nome: 'weezing', life: 100 },
            { id: 112, nome: 'rhydon', life: 100 }
        ]

        this.state = {
            pokeball: [],
            desafiantes: equipeRocket,
            escolhido: 0,
            desafiante: 0,
            mensagem: ''
        }
    }

    componentDidMount() {
        const pokeball = JSON.parse(sessionStorage.getItem('pokeball'))
        this.setState({ pokeball: pokeball })
        this.setState({ mensagem: 'A batalha vai começar!' })
    }

    renderizarPokeball(){
        return this.state.pokeball.map(
            (pokemon,i)=>{
                return <PokeArenaTableRow
                    id = {pokemon.id}
                />
            }
        )
    }

    render() {
        return (
            <div
                style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <h3>Batalha Pokémon</h3>
                <div className='container' style={{
                    width: '70%',
                    marginTop: '1em',
                    border: '1px solid #cecece'
                }}>

                    <div className='row'>
                        <div className='col-2' style={{ padding: '0.5em' }}>
                            {this.renderizarPokeball()}
                        </div>
                        <div className='col-8' style={{
                            borderLeft: '1px solid #cecece',
                            borderRight: '1px solid #cecece',
                            paddingTop: '2em'
                        }}>
                            Arena
                        </div>
                        <div className='col-2' style={{ padding: '0.5em' }}>
                            Desafiantes
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}