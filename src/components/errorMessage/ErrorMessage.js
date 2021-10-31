import React from "react";
import image from './error.gif'

const ErrorMessage = () => {
    return (
        <img style={{
            display: 'block',
            width: '250px',
            height: '250px',
            objectFit: 'contain',
            margin: '0 auto'
        }} src={image} alt='Error'/>
        //<img src={process.env.PUBLIC_URL + '.error.gif'}/>
    )
}

export default ErrorMessage