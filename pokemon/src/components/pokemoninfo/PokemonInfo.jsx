import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class PokemonInfo extends Component{

    constructor(props){
        super(props)
        this.state = {
            nome: '',
            altura: '',
            ordem: '',
            peso: '',
            experiencia: ''
        }
    }

    componentDidMount(){
        const id = this.props.match.params.pokeid
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(url)
        .then(
            (res)=>{
                this.setState(
                    {
                      id:id,
                      nome:res.data.name,
                      altura:res.data.height,
                      ordem:res.data.order,
                      peso:res.data.weight,
                      experiencia:res.data.base_experience 
                    }
                )
            }
        )
        .catch(error=>console.log(error))

    }


    render(){

        const frente = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.id}.png`
        const costas = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.state.id}.png`

        return(
            <div style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h3>Pokemon Info</h3>
                <table className='table table-striped table-sm table-bordered'
                    style={{ marginTop: 20, width: '80%' }}>
                    <thead className='thead-dark'>
                        <tr>
                            <th style={{ textAlign: 'center', width: '20%' }}
                                colSpan='2'
                            >
                                <span style={{textTransform:'capitalize'}}>
                                {this.state.nome}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width='30%' style={{textAlign:'center',verticalAlign:'middle'}}>
                                <img src={frente} alt={this.state.id}/>
                                <img src={costas} alt={this.state.id}/>
                            </td>
                            <td>
                                <ul>
                                <li>ID : {this.state.id}</li>
                                <li>Altura: {this.state.altura}</li>
                                <li>Ordem: {this.state.ordem}</li>
                                <li>Peso: {this.state.peso}</li>
                                <li>Experiência: {this.state.experiencia}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='2' style={{textAlign:'center'}}>
                            <Link to={'/pokedex'} className='btn btn-secondary'>Voltar</Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}