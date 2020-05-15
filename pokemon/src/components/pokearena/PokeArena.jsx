import React, { Component } from 'react'
import background from '../../img/battlegrass.png'
import PokeArenaTableRow from './PokeArenaTableRow'

const delay = (ms) => new Promise( res => setTimeout(res,ms))

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
            mensagem: '',
            atacarBtnDisabled: false
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

    async atacar(){

        this.setState({atacarBtnDisabled:true})

        let escolhido = this.state.pokeball[this.state.escolhido]
        let desafiante = this.state.desafiantes[this.state.desafiante]

        this.setState({mensagem:`${escolhido.nome} atacou! 20 de dano!`})
        await delay(2000)
        desafiante.life = (desafiante.life - 20 < 0)? 0 : desafiante.life - 20 
        
        if(desafiante.life === 0){
            this.setState({mensagem:`${desafiante.nome} desmaiou!`})
            await delay(1000)
            const index = this.proximoDesafiante()
            if(index >= 0){
                this.setState({desafiante:index})
                desafiante = this.state.desafiantes[this.state.desafiante]
                this.setState({mensagem:`${desafiante.nome} tomou seu lugar!`})
                await delay(1000)
            }else{
                this.setState({mensagem:`Parabéns, você venceu!`})
                await delay(1000)
                this.reiniciarDesafiantes();
                this.setState({mensagem:`A batalha recomeça!`})
                await delay(1000)
            }
            
        }
        this.setState({atacarBtnDisabled:false})
    }

    proximoDesafiante(){
        let desafiantes = this.state.desafiantes

        for (let index = 0; index < desafiantes.length; index++) {
            const desafiante = desafiantes[index];
            if(desafiante.life > 0) return index
        }
        return -1
    }

    reiniciarDesafiantes(){
        let desafiantes = this.state.desafiantes

        for (let index = 0; index < desafiantes.length; index++) {
            const desafiante = desafiantes[index];
            desafiante.life = 100
        }
        this.setState({desafiante:0})
    }

    renderizarPokeball(){
        return this.state.pokeball.map(
            (pokemon,i)=>{
                return <PokeArenaTableRow
                    id = {pokemon.id}
                    mudarEscolhido = {this.mudarEscolhido}
                    index = {i}
                    jogador = {true}
                />
            }
        )
    }

    renderizarDesafiantes(){
        return this.state.desafiantes.map(
            (pokemon,i)=>{
                return <PokeArenaTableRow
                    id = {pokemon.id}
                    life = {pokemon.life}
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
                        <button className='btn btn-secondary'
                                onClick={()=>this.atacar()}
                                disabled = {this.state.atacarBtnDisabled}
                        >
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
                        <div className='col-2' style={{ padding: '0.5em', textAlign:'center' }}>
                            {this.renderizarPokeball()}
                        </div>
                        <div className='col-8' style={{
                            borderLeft: '1px solid #cecece',
                            borderRight: '1px solid #cecece',
                            paddingTop: '2em'
                        }}>
                            {this.renderizarArena()}
                        </div>
                        <div className='col-2' style={{ padding: '0.5em', textAlign:'center' }}>
                            {this.renderizarDesafiantes()}
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}