import apiKey from './config.js'
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';


// Components
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import PageNotFound from './components/PageNotFound';
export default class App extends Component {

  constructor () {
    super();
    this.state = {
      seaPhotos: [],
      mountainPhotos: [],
      waterfallPhotos: [],
      searchedPhotos: [],
      searchedTerms: [],
      currentPhotos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // fetches images for sea, mountain and waterfall when page loads
    if (this.state.seaPhotos.length > 0 && this.state.mountainPhotos.length > 0 && this.state.waterfallPhotos.length > 0) {
      return null
    } else {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sea&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({ 
        seaPhotos: response.data.photos.photo
      }) )
      .catch(error => console.log('Error fetching and parsing data', error) );
      
  
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountain&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({ 
        mountainPhotos: response.data.photos.photo
      }) )
      .catch(error => console.log('Error fetching and parsing data', error) );
  
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({ 
        waterfallPhotos: response.data.photos.photo
      }) )
      .catch(error => console.log('Error fetching and parsing data', error) );
    }
  }

  // fetches request for a term not searched before
  performSearch = (query) => {
    this.setState({ isLoading: true });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ currentPhotos: response.data.photos.photo });
        this.setState(prevState => ({ searchedPhotos: [...prevState.searchedPhotos, response.data.photos.photo] }));
        this.setState(prevState => ({ searchedTerms: [...prevState.searchedTerms, query] }));
        this.setState({ isLoading: false })
      })
      .catch(error => console.log('Error fetching and parsing data', error) );
  }

  // sets currentPhotos state to an array of photos of a previously searched term, stored in the searchedPhotos state
  showCurrentPhotos = (searchTerm) => {
    this.setState({ currentPhotos: this.state.searchedPhotos[this.state.searchedTerms.indexOf(searchTerm)] });
  }

  // displays previously searched photos upon browser navigation
  checkUrl = (query) => {
    if (this.state.searchedTerms.find(term => query === term) && this.state.currentPhotos !== this.state.searchedPhotos[this.state.searchedTerms.indexOf(query)]) {
      this.setState({ currentPhotos: this.state.searchedPhotos[this.state.searchedTerms.indexOf(query)] });
    }
  }

  

  render () {
        
    return (
        <BrowserRouter>
          <div className="container">
            
            <SearchForm onSearch={this.performSearch} onSearchOldPhoto={this.showCurrentPhotos} allPhotos={this.state.searchedPhotos} searchedTerms={this.state.searchedTerms}/>
            <Nav />

            <Switch>
              <Route exact path="/" render={ () => <Redirect to="/sea" />} /> 
              <Route path="/sea" render={ () => <PhotoContainer data={this.state.seaPhotos} navName={'sea'}/> } />              
              <Route path="/mountain" render={ () => <PhotoContainer data={this.state.mountainPhotos} navName={'mountain'}/>} />              
              <Route path="/waterfall" render={ () => <PhotoContainer data={this.state.waterfallPhotos} navName={'waterfall'}/>} />

              {/* conditionally render a loading indicator for the search bar */}
              <Route path="/search/:query" render={ ({match}) => <PhotoContainer data={this.state.currentPhotos} match={match.params.query} checkUrl={this.checkUrl} isLoading={this.state.isLoading}/>} />  

              <Route component={PageNotFound} />      
            </Switch>
          </div>
        </BrowserRouter>


    );
  }
  
}


