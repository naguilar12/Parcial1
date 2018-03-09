import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      currentTag: "",
      commonTags: [],
      countTags:{}
    };    

    this.updateCurrentTag = this.updateCurrentTag.bind(this);
    this.searchCommonTags = this.searchCommonTags.bind(this);
    this.makeCount = this.makeCount.bind(this);


  }

  componentDidMount() {




  }

  updateCurrentTag(evt){
    this.setState({
      currentTag: evt.target.value
    })

  }

  searchCommonTags(){

    let url = 'https://www.instagram.com/explore/tags/'+this.state.currentTag+'/?__a=1';

    fetch(url)
    .then((res) =>{
      return res.json()})
    .then((json) => {
      var edges = json.graphql.hashtag.edge_hashtag_to_top_posts.edges;
      console.log(edges);
      //console.log(json.graphql.hashtag.edge_hashtag_to_top_posts.edges[0].node.edge_media_to_caption.edges[0].node.text})
      console.log(this.state.commonTags);
      edges.forEach((e)=>{
        var t = this.state.commontags;
        t.push(e.node.edge_media_to_caption.edges[0].node.text);
        this.setState({commontags: e})
      })

      console.log(this.state.commontags);
    })

    this.makeCount();
  }

  makeCount(){


  }


  render() {
    return (
      <div className="App">
      <h1>Tags</h1>
      <input value={this.state.currentTag} onChange={this.updateCurrentTag}/>
      <div>Made by Jasdasdohn with <span role="img">❤</span>️</div>
      <button onClick={this.searchCommonTags}>Aqui</button>

      </div>
      );
  }
}

export default App;
