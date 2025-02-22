import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

const Profile = () => {
  const {loding,userInfo} = useSelector((state)=>state.auth)
  if(loding){
    return <p>Lodign.....</p>
  }else{
    return (
      <div>
        Profile
        <h1>Email: {userInfo.email}
        </h1>
      </div>
    )
  }
}

export default Profile
