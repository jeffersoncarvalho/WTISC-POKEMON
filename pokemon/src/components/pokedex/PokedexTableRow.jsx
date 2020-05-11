import React, {Component} from 'react'

export default class PokedexTableRow extends Component{

    getPokemonIdByURL(url){
        var tokens = url.split('/')
        return tokens[tokens.length-2]
    }

    render(){
        const id = this.getPokemonIdByURL(this.props.pokemon.url)
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return(
            <tr>
                <td>
                    {id}
                </td>
                <td>
                    <strong>
                    <span style={{textTransform:'capitalize'}}>{this.props.pokemon.name}</span>
                    </strong>
                </td>
                <td>
                    <img src={imgUrl} alt={id}/>
                </td>
                <td>
                    <button className='btn btn-primary'>Informações</button>
                    <button className='btn btn-danger'
                     style={{marginLeft:20}}>Capturar</button>
                </td>
            </tr>
        )
    }
}