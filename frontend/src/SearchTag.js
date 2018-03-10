import React from 'react';
import './SearchTag.css'

export class SearchTag extends React.Component{
	render(){
		return(
			<div className = "center ">
			<input className="form-control" value={this.props.value} onChange={this.props.onChange}/>
			<button className = "btn marginLeft" onClick={this.props.onClick}>Aqui</button>
			</div>
			)
	}

}