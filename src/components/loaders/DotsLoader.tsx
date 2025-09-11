import React from 'react'

const DotsLoader = ({className}:{className:string}) => {
  return (
    <div className='dots-loader'>
    <div className={`loader ${className}`}></div>
    </div>
  )
}


export default DotsLoader