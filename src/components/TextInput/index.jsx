import { Component } from "react";
import './styles.css'
export class TextIput extends Component {
    render(){
        const { onChange, value } = this.props
        return (
        
            <input 
                className="text-input"
                onChange={onChange}
                value={value}
                type="search"
            />
        )
    }
}