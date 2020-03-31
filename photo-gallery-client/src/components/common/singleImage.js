import React from 'react';

const SingleImage = (props) => {
    return(
        <div className = 'single-image-wrapper'>
            <img src = {`data:image/png;base64,${props.src}`} alt = 'user' />
        </div>
    );
}

export default SingleImage;