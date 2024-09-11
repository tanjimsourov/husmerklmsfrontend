import React from 'react'
import AddItem from './layout/AddItem'

function Header({title, noBtn, subtitle}) {
  return (
    <div className="page-title-wrapper flex justify-content-between align-items-center">
      <div>
        <h1 className="page_title">{title}</h1>
        <p className="sub_page_title">{subtitle}</p>
      </div>
      { (noBtn) ? '' : <AddItem />}
    </div>
  )
}

export default Header