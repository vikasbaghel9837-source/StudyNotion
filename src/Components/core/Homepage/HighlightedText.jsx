import React from 'react'

const HighlightedText = ({children})=>{
    return(
        <span className='text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-caribbeangreen-200'>
            {children}
        </span>
    )
}


export default HighlightedText;