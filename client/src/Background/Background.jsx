import React from 'react'
import './Background.css'

const Background = () => {
  return (
    <div className="app-background">
    
        <img className='background-logo' src="svg/logo-wr.png" alt="logo" />

        <div className="corner-line-container top-left opacity-low">
            <div className="line mds line-1"></div>
            <div className="line tn line-2"></div>
            <div className="line tn line-3"></div>
            <div className="outer-circle">
                <div className="inner-circle"></div>
            </div>
            <div className="line mdl line-4"></div>
            <div className="triangle"></div>
            <div className="line mds line-5"></div>
            <div className="line mdl line-6"></div>
        </div>
        <div className="corner-line-container top-right opacity-low">
            <div className="line mds line-1"></div>
            <div className="line tn line-2"></div>
            <div className="line tn line-3"></div>
            <div className="outer-circle">
                <div className="inner-circle"></div>
            </div>
            <div className="line mdl line-4"></div>
            <div className="triangle"></div>
            <div className="line mds line-5"></div>
            <div className="line mdl line-6"></div>
        </div>
        <div className="corner-line-container bottom-left opacity-low">
            <div className="line mds line-1"></div>
            <div className="line tn line-2"></div>
            <div className="line tn line-3"></div>
            <div className="outer-circle">
                <div className="inner-circle"></div>
            </div>
            <div className="line mdl line-4"></div>
            <div className="triangle"></div>
            <div className="line mds line-5"></div>
            <div className="line mdl line-6"></div>
        </div>
        <div className="corner-line-container bottom-right opacity-low">
            <div className="line mds line-1"></div>
            <div className="line tn line-2"></div>
            <div className="line tn line-3"></div>
            <div className="outer-circle">
                <div className="inner-circle"></div>
            </div>
            <div className="line mdl line-4"></div>
            <div className="triangle"></div>
            <div className="line mds line-5"></div>
            <div className="line mdl line-6"></div>
        </div>

        <div className="middle-line-container opacity-low">
            <div className="mid-left-cover"></div>
            <div className="mid-right-cover"></div>

            <div className="mid-section">

                <div className="mid-line"></div>
                <div className="mid-line-left"></div>
                <div className="mid-line-right"></div>

                <div className="mid-line-bottom"></div>
                <div className="mid-line-left-bottom"></div>
                <div className="mid-line-right-bottom"></div>
            </div>
            <div className="left-section">
                <div className="left-line-up"></div>
                <div className="left-line-bottom"></div>
            </div>
            <div className="right-section">
                <div className="right-line-up"></div>
                <div className="right-line-bottom"></div>
            </div>

        </div>
        <div className="top-section opacity-low">
            <div className="mid-triangle-left"></div>
            <div className="mid-triangle-right"></div>
        </div>

        <div className="bottom-section opacity-low">
            <div className="mid-triangle-left"></div>
            <div className="mid-triangle-right"></div>
        </div>

    </div>
  )
}

export default Background