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

        this.mudarEscolhido = this.mudarEscolhido.bind(this)
    }

    componentDidMount() {
        const pokeball = JSON.parse(sessionStorage.getItem('pokeball'))
        this.setState({ pokeball: pokeball })
        this.setState({ mensagem: 'A batalha vai começar!' })
    }

    mudarEscolhido(index){
        this.setState({escolhido:index})
    }

    renderizarPokeball(){
        return this.state.pokeball.map(
            (pokemon,i)=>{
                return <PokeArenaTableRow
                    id = {pokemon.id}
                    mudarEscolhido = {this.mudarEscolhido}
                    index = {i}
                />
            }
        )
    }

    renderizarDesafiantes(){
        return this.state.desafiantes.map(
            (pokemon,i)=>{
                return <PokeArenaTableRow
                    id = {pokemon.id}
                />
            }
        )
    }

    renderizarArena(){

        if(!this.state.pokeball || this.state.pokeball.length===0) return

        let escolhido = this.state.pokeball[this.state.escolhido]
        let desafiante = this.state.desafiantes[this.state.desafiante]

        const imgURLDesafiante = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${desafiante.id}.png`
        const imgURLEscolhido = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${escolhido.id}.png`
        
        
        return(
            <>
                <div className='row' style={{background:`url(${background}) no-repeat center center`}}>
                    
                    <div className='col-12'>

                        <div className='row'>
                            
                            <div className='col-12 text-right'>
                                <span style={{textTransform:'capitalize'}}>
                                    <b>{desafiante.nome} ({desafiante.life}/100)</b>
                                </span>
                                <img src={imgURLDesafiante} alt={desafiante.id}/>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-12 text-left'>
                                <img src={imgURLEscolhido} alt={escolhido.id}/>
                                <span style={{textTransform:'capitalize'}}>
                                    <b>{escolhido.nome} ({escolhido.life}/100)</b>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='row'>
                    <div className='col-12 text-center' style={{padding:'0.5em'}}>
                        <button className='btn btn-secondary'>
                            Atacar
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <div className='alert alert-warning' role='alert' style={{textTransform:'uppercase'}}>
                            {this.state.mensagem}
                        </div>
                    </div>
                </div>
            </>
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
                            {this.renderizarArena()}
                        </div>
                        <div className='col-2' style={{ padding: '0.5em' }}>
                            {this.renderizarDesafiantes()}
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}