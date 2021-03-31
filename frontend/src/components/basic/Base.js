import React from 'react'
import Menu from './Menu';
function Base({description,title,children}) {
    return (
        <div >
          <Menu/>
          
          {children}
          
           
           
            

        </div>
    )
}

export default Base
