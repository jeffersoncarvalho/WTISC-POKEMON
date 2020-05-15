import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'


import PokedexTableRow from './PokedexTableRow'

export default class Pokedex extends Component {

    constructor(props) {
        super(props)

        this.state = { count: 0, next: '', previous: '', pokemons: [], loading: true}
    }

    componentDidMount() {
        const url = sessionStorage.getItem('url')
        this.getPokemonData(url)
    }

    getPokemonData(url) {
        this.setState({loading:true})
        sessionStorage.setItem('url', url)
        axios.get(url)
            .then(
                (res) => {
                    //console.log(res.data)
                    this.setState(
                        {
                            count: res.data.count,
                            next: res.data.next,
                            previous: res.data.previous,
                            pokemons: res.data.results,
                            loading:false
                        }
                    )
                }

            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
            

    }

    anterior() {
        if (this.state.previous) {
            this.getPokemonData(this.state.previous)
        }
    }

    proximo() {
        if (this.state.next) {
            this.getPokemonData(this.state.next)
        }
    }

    montarTabela() {
        if (!this.state.pokemons) return
        return this.state.pokemons.map(
            (elemento, i) => {
                return (
                    <PokedexTableRow
                        pokemon={elemento}
                        key={i}
                    />
                )
            }
        )
    }

    renderizarConteudo() {

        if (this.state.loading) {
            return (
                <tbody>
                    <tr> 
                        <td colSpan='4'style={{textAlign:'center',verticalAlign:'middle',padding:'20px'}}>
                            <Spinner animation='border' /> loading ...
                        </td>
                    </tr>
                </tbody>
            )
        }
        return (
            <>
            <tbody>
                {this.montarTabela()}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan='4' style={{ textAlign: 'center' }}>
                        <button className='btn btn-secondary'
                            onClick={() => this.anterior()}
                            disabled={!this.state.previous}
                        >
                            Anterior
                                </button>
                        <button className='btn btn-secondary'
                            onClick={() => this.proximo()}
                            style={{ marginLeft: 20 }}
                            disabled={!this.state.next}
                        >
                            Próximo
                                </button>
                    </td>
                </tr>
            </tfoot>
            </>
        )

    }

    render() {
        return (
            <div style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h3>Pokédex</h3> ({this.state.count})
                <table className='table table-striped table-sm table-bordered'
                    style={{ marginTop: 20, width: '80%' }}>
                    <thead className='thead-dark'>
                        <tr>
                            <th style={{ textAlign: 'center', width: '20%' }}>ID</th>
                            <th style={{ textAlign: 'center', width: '20%' }}>Nome</th>
                            <th colSpan='2'></th>
                        </tr>
                    </thead>
                    {this.renderizarConteudo()}
                </table>
            </div>
        )
    }
}