import { Component } from "react";
import './styles.css'
export class TextIput extends Component {
    render(){
        const { onChange, value, placeholder } = this.props
        return (
        
            <input 
                className="text-input"
                onChange={onChange}
                value={value}
                type="search"
                placeholder="type your search"
            />
        )
    }
}