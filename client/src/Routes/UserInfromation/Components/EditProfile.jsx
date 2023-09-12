import React, { useRef, useState } from 'react'

import { imagesData } from './ImagesData'

import { GiCrossMark, GiCheckMark } from 'react-icons/gi';
import { soundEffects } from '../../../SoundEffects/soundEffects';
import { httpUpdateProfileImage, httpUpdateUsername } from '../../../hooks/requests';

const EditProfile = ({ currentUser, setShowModal, socket }) => {

    const usernameRef = useRef();
    const [profileImage, setProfileImage] = useState(currentUser?.image)

    const submitUsernameChange = async() => {
        const newUsername = usernameRef?.current?.value;
        try {
            await httpUpdateUsername(currentUser.id, {name: newUsername})
            soundEffects.success.play()
            // socket.emit('refreshAllUsers')
        } catch(err) {
            soundEffects.fail.play()
            console.log('error changing username', err)
        }
    }

    const submitProfileImageChange = async(newImage) => {
        try {
            await httpUpdateProfileImage(currentUser.id, {image: newImage})
            soundEffects.success.play()
            // socket.emit('refreshAllUsers')
        } catch(err) {
            soundEffects.fail.play()
            console.log('error updating profile image', err)
        }
    }

    const handleImageSelect = (image) => {
        setProfileImage(image)
    }

  return (
    <div className='edit-profile-container'>
        <button onClick={() => {setShowModal(false); soundEffects.navButton.play()}} className="card-modal-close-button"><GiCrossMark /></button>
        <div className='edit-profile-form'>
            <label htmlFor='username'>Username</label>
            <input ref={usernameRef} name="username" id='username' defaultValue={currentUser?.username} type='text' />
            <button onClick={submitUsernameChange} className="submit-button">Submit change</button>
            <label htmlFor="image">Profile picture</label>
            <div className="profile-images-container">
                {
                    imagesData.map(imageInfo => (
                        <div onClick={() => handleImageSelect(imageInfo.src)} key={imageInfo.src} className="profile-image">
                            {
                                imageInfo.src === profileImage
                                    ? <span><GiCheckMark /></span>
                                    : null
                            }
                            <img src={imageInfo.src} alt='profile avatar' />
                        </div>
                    ))
                }
            </div>
            <button onClick={() => submitProfileImageChange(profileImage)} className="submit-button">Submit change</button>
        </div>
    </div>
  )
}

export default EditProfile