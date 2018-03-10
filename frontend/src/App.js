import React from 'react';
import './App.css';
import {Title} from './Title';
import {SearchTag} from './SearchTag';
import {TopHash} from './TopHash';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      currentTag: "",
      topTags: [],
      tagsHistory:[]
    };    

    this.updateCurrentTag = this.updateCurrentTag.bind(this);
    this.updateCurrentTag2 = this.updateCurrentTag2.bind(this);
    this.searchCommonTags = this.searchCommonTags.bind(this);
    this.makeCount = this.makeCount.bind(this);
    this.orderDictionary = this.orderDictionary.bind(this);
  }

  updateCurrentTag(evt){
    this.setState({
      currentTag: evt.target.value
    })

  }

  searchCommonTags(){
    fetch("/api/"+this.state.currentTag  , {
    method: "POST"})

    fetch("/api/history")
    .then((res) => {
      return res.json();
    })
    .then((json) =>{
      this.setState({tagsHistory: json})
    })

    console.log(this.state.tagsHistory + "SOMOS LOS TAGS")

    console.log(this.state.tagsHistory)
    let url = 'https://www.instagram.com/explore/tags/'+this.state.currentTag+'/?__a=1';
    var texts =[];

    fetch(url)
    .then((res) =>{
      return res.json()})
    .then((json) => {
      var edges = json.graphql.hashtag.edge_hashtag_to_top_posts.edges;

      //console.log(edges);
      //console.log(json.graphql.hashtag.edge_hashtag_to_top_posts.edges[0].node.edge_media_to_caption.edges[0].node.text})
      edges.forEach((e)=>{
        //console.log(e.node.edge_media_to_caption.edges[0].node.text);
        texts.push(e.node.edge_media_to_caption.edges[0].node.text);
        console.log(e.node.edge_media_to_caption.edges[0].node.text+"11111111111111111111111111111");
      })

    })
    .then(()=>{
      this.makeCount(texts);
    })
  }


  makeCount(texts){
    console.log(texts);
    var countTags = {};

    texts.forEach((e) =>{
      console.log(e + "2222222222222222222222222222222222222");
      for(let w of e.split(" ")){
        if(w.startsWith("#") && !w.startsWith("#" + this.state.currentTag)){
          if(!(w in countTags)){
            countTags[w] = 0;
          }
          countTags[w]+=1;
        }
      }
    })

    console.log(countTags);
    this.orderDictionary(countTags);
  }

  orderDictionary(countTags){

    // Create items array
    var supp = countTags;
    var items = Object.keys(supp).map(function(key) {
      return [key, supp[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    // Create a new array with only the first 5 items
    console.log(items.slice(0, 10));
    items = items.slice(0, 10)
    this.setState({topTags: items})

  }

  updateCurrentTag2(ele){
    this.setState({
      currentTag: ele
    })
  }

  render() {
    let i = 1;
    const topHash = this.state.topTags.map((tag)=>
      <div className="col-md-4" align="center">
      <TopHash value = {tag[0]} number={i++} onClick1={this.updateCurrentTag2} onClick2={this.searchCommonTags}/>
      </div>
      );

    const history = this.state.tagsHistory.map((tag)=>
      <li>{tag.tag}</li>
      )

    return (
      <div className="App" >
      <div className="background">
      <div className="opaco">
      <Title/>
      <SearchTag value={this.state.currentTag} onChange={this.updateCurrentTag} onClick={this.searchCommonTags}/>
      </div>
      </div>
      <div className="row">
      {topHash}
      </div>
      <h1>
        Busqudas pasadas
      </h1>
      <ul>
      {history}
      </ul>
      </div>
      );
  }
}

export default App;
