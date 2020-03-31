import React from 'react';
import Image from './singleImage'; 

const ImageListing = (props) => {
    const imageList = [];
    
    props.images.forEach(image => {
        imageList.push(<Image src = {image} />);
    });

    return (
        <>
            <h1 className = 'page-title'> { props.pageTitle || '' } </h1>
            <div className = 'image-list'>
                {imageList}
            </div>
        </>
    );
}

export default ImageListing;