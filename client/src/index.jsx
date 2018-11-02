import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntryItem from './components/RepoListEntryItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount(){
    $.get('/repos', repos => {
      if (repos.length) {
        this.setState({
          repos: repos
        })
      }
    });
  }

  search (term) {
    console.log(`${term} was searched, man!`);  
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({term}),
      contentType: 'application/json',
      success: (data) => { console.log( 'data send' , data)},
      error: (err) => { console.log(err)}
    });
  }

  // search (term) {
  //   console.log(`${term} was searched, man!`)  
  //   $.post ('/repos',  {term}), () => {
  //     $.get('/repos', repos => {
  //       if(repos.length){
  //         this.setState({
  //           repos:repos
  //         });
  //       }
  //     });
  //   }
  // }

  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));