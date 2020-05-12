import React, {Component} from 'react'

export default class PokedexTableRow extends Component{

    getPokemonIdByURL(url){
        var tokens = url.split('/')
        return tokens[tokens.length-2]
    }

    capturar(id,nome){
        
        let pokeball = JSON.parse(sessionStorage.getItem('pokeball'))

        //se existe pokebola
        if(!pokeball){
            pokeball = []
        }

        //se a pokebola está cheia
        if(pokeball.length===4){
            alert('Capacidade máxima da Pokebola atingida!')
            return
        }
        //se pokemon já foi capturado
        for (let index = 0; index < pokeball.length; index++) {
            const element = pokeball[index]
            if(id === element.id){
                alert('Pokémon já capturado!')
                return
            }
        }

        pokeball.push({id:id,nome:nome,life:100})
        sessionStorage.setItem('pokeball', JSON.stringify(pokeball) )
        alert('Pokémon capturado com sucesso!')


    }

    render(){
        const id = this.getPokemonIdByURL(this.props.pokemon.url)
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return(
            <tr>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    {id}
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <strong>
                    <span style={{textTransform:'capitalize'}}>{this.props.pokemon.name}</span>
                    </strong>
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <img src={imgUrl} alt={id}/>
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <button className='btn btn-primary'>Informações</button>
                    <button 
                        className='btn btn-danger'
                        onClick={()=>this.capturar(id,this.props.pokemon.name)}
                        style={{marginLeft:20}}>
                        Capturar
                    </button>
                </td>
            </tr>
        )
    }
}