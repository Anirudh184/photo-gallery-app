import React from 'react';
import Image from './singleImage';

const ImageListing = (props) => {
    const imageList = [];
    
    props.images.forEach(image => {
        imageList.push(<Image src = {image} />);
    });

    return imageList;
}

export default ImageListing;