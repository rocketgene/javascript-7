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
        photos = results.map(photo => <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />)
      } else if (results.length = 0 && props.isNav === false) {
        photos = <NotFound />
      }

      // saves title of nav
      let title = props.navName;
      
      return(
          <div className="photo-container">
              <h2>
              {
                (props.match)
                ? props.match
                : title
              }
              </h2>
              <ul>
                  {photos}
              </ul>
          </div>
      ) 
  }
  
export default PhotoContainer
  
  