import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (0)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nostrum esse tempore officia similique aut, commodi doloremque accusantium delectus nemo minus sequi beatae quibusdam enim quae sunt ea quis exercitationem.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nemo soluta, inventore reiciendis possimus molestiae placeat deserunt rerum illo itaque repellendus vel asperiores unde! Dignissimos officia libero ab odit adipisci.</p>
        </div>
    </div>
  )
}

export default DescriptionBox