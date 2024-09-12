import React from 'react'
import IdCardBg from '../../assets/imgs/id_card_bg.webp'
// import IdCardLogo from '../../assets/imgs/id_card_logo.png'
import Profile from '../../assets/imgs/user.jpg'
import IdCardLogo from '../../assets/imgs/logo_black.png'
import Bismillah from '../../assets/imgs/bismillah.png'


function IdCard(props) {

    console.log(props.data.profile)

  return (

    <div className="row">
        <div className="col-xs-12 col-sm-3"></div>
        <div className="col-xs-12 col-sm-6">
                
                    <div className='id-card-wrapper' style={{display: 'flex', justifyContent: 'center'}}>



                        <div className="id-card" style={{backgroundImage: `url(${IdCardBg})`}}>


                            <div className="id-card-content">
                                <div className="bismillah">
                                    <img src={Bismillah} alt="bismillah" />
                                </div>
                                <div className="id-card-content-header">
                                    <img src={IdCardLogo} alt="" />
                                </div>
                                <div className="id-card-profile">
                                    <img src={`https://husmerklmsbackend.onrender.com/api/v1/uploads/${props.data.profile}`} alt="" />
                                </div>
                                <div className="id-card-info">
                                    <div className="id-card-info-title">
                                        <h2>{props.data.name}</h2>
                                    </div>
                                    <div className="id-card-info-main">
                                        <ul>
                                            <li>
                                                <span>Id No:</span>
                                                <span>{props.data.studentId}</span>
                                            </li>
                                            <li>
                                                <span>Phone:</span>
                                                <span> {props.data.phone}</span>
                                            </li>
                                            <li>
                                                <span>Blood:</span>
                                                <span>{props.data.bloodGroup}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                            
        </div>
        <div className="col-xs-12 col-sm-3"></div>
    </div>
    
  )
}

export default IdCard