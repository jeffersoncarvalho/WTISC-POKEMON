import React, {Component} from 'react'

export default class PokeballTableRow extends Component{
    
    render(){
        const imgUrl = 
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`
        return(
            <tr>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    {this.props.id}
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <strong>
                    <span style={{textTransform:'capitalize'}}>{this.props.nome}</span>
                    </strong>
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <img src={imgUrl} alt={this.props.id}/>
                </td>
            </tr>
        )
    }
}