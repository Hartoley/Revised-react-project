import React from 'react'
import './body1.css'


const Body1 = () => {
  return (
    <>
        <div className="body1">
            <img className='img' src="https://img-b.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg" alt="" />
            <div className="whiteBox">
                <p className='you'>Learning that gets you</p>
                <p className='skills'>Skills for your present (and your future). Get started with us.</p>
            </div>
           
        </div>
        <div className="dismis">
            <div className="training">
              <p>Training 5 or more people?Get your team access to Udemy's top 25,000+ courses</p>
            </div>
            <div className="buttonBox">
              <button className="button1">Get Udemy Business</button>
              <button className="button2">Dismiss</button>
            </div>

           
            
        </div>
        
       
    </>
  )
}

export default Body1