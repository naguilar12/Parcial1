import React from 'react';
import './TopHash.css';

export class TopHash extends React.Component{
	constructor(props){
		super(props);
		this.change = this.change.bind(this);
	}

	change(){
		this.props.onClick1(this.props.value.replace('#',''));
		this.props.onClick2();
	}

	render(){
		return(
			<a onClick= {this.change}>
			<div className= "rcorners separateRow">
			<h1>{this.props.number +". " + this.props.value}</h1>
			</div>
			</a>
			)
	}
}