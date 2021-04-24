import Photo from './Photo';
import React from 'react';
import NotFound from './NotFound';

  const PhotoContainer = (props) => {
  
      const results = props.data;

      // callback function displays photos if it has been searched previously
      if (props.match) {
        props.checkUrl(props.match)
      }
      
      // display photos or render the NotFound component if search returns no results
      let photos;
      
      if (results.length > 0) {
        photos = results.map(photo => <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
      } else if (results.length === 0 && props.match) {
        photos = <NotFound />
      }

      // display title 
      let title;

      if (props.navName) {
        title = props.navName;
      } else if (props.match && results.length > 0) {
        title = props.match;
      } else {
        title = null;
      }

      return(
          <div className="photo-container">
              <h2>
                  {title}
              </h2>
              <ul>
                  {
                    (props.isLoading)
                    ? <h2>Loading...</h2>
                    : photos
                  }
              </ul>
          </div>
      ) 
  }
  
export default PhotoContainer
  
  
  
  
