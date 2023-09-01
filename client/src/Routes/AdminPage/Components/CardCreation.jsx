import React, { useRef, useCallback } from 'react';
import uuid from "react-uuid";

const CardCreation = ({ httpCreateCard }) => {

    const formRef = useRef();

    
    const formHandler = useCallback(() => async(e) => {
        e.preventDefault();

        const formData = {
            id: uuid(),
            name: formRef?.current?.name?.value,
            attack: formRef?.current?.attack?.value,
            hp: formRef?.current?.hp?.value,
            maxHp: formRef.current.hp.value,
            armor: formRef?.current?.armor?.value,
            magicResist: formRef?.current?.magicResist?.value,
            critRate: formRef?.current?.critRate?.value,
            critDamage: formRef?.current?.critDamage?.value,
            image: formRef?.current?.image?.value,
            video: formRef?.current?.video?.value,
            skill: [
                formRef?.current?.skill1?.value,
                formRef?.current?.skill2?.value,
                formRef?.current?.skill3?.value,
                formRef?.current?.skill4?.value
            ],
            skillCharge: 0,
            skillCount: formRef?.current?.skillCount?.value,
            theme: formRef?.current?.theme?.value,
            damageType: formRef?.current?.damageType?.value,
            stance: "normal",
        }

        e.target.reset()
        
        await httpCreateCard(formData)
    }, [httpCreateCard])   

    
  return (
    <form ref={formRef} onSubmit={formHandler()} className='create-form'>
        <div className="form-container">
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id="name" required/>
            <label htmlFor='attack'>Attack</label>
            <input type='number' name='attack' id="attack" required/>
            <label htmlFor='hp'>Hp</label>
            <input type='number' name='hp' id="hp" required/>
            <label htmlFor='armor'>Armor</label>
            <input type='number' name='armor' id="armor" required/>
            <label htmlFor='magicResist'>Magic Resist</label>
            <input type='number' name='magicResist' id="magicResist" required/>
            <label htmlFor='critRate'>Crit Rate</label>
            <input type='number' name='critRate' id="critRate" required/>
            <label htmlFor='critDamage'>Crit Damage</label>
            <input type='number' name='critDamage' id="critDamage" required/>
            <label htmlFor='image'>Image</label>
            <input type='text' name='image' id="image" required/>
        </div>
        <div className="form-container">
            <label htmlFor='video'>Active skill video</label>
            <input type='text' name='video' id="video" required/>
            <label htmlFor='skill1'>Skill</label>
            <input type='text' name='skill1' id="skill1" required/>
            <label htmlFor='skill2'>Skill</label>
            <input type='text' name='skill2' id="skill2" />
            <label htmlFor='skill3'>Skill</label>
            <input type='text' name='skill3' id="skill3" />
            <label htmlFor='skill4'>Skill</label>
            <input type='text' name='skill4' id="skill4" />
            <label htmlFor='skillCount'>Skill count</label>
            <input type='number' name='skillCount' id="skillCount" required/>
            <label htmlFor='theme'>Theme</label>
            <select id='theme' name='theme'>
                <option value='purple'>Purple</option>
                <option value='orange'>Orange</option>
                <option value='yellow'>Yellow</option>
                <option value='green'>Green</option>
                <option value='lightblue'>Lightblue</option>
                <option value='red'>Red</option>
                <option value='pink'>Pink</option>
                <option value='black'>Black</option>
                <option value='brown'>Brown</option>
                <option value='special'>Special</option>
                <option value='white'>White</option>
                <option value='grey'>Grey</option>
            </select>
            <label htmlFor='damageType'>Damage type</label>
            <select id='damageType' name='damageType'>
                <option value='ad'>Physical damage</option>
                <option value='ap'>Magic damage</option>
            </select>
        </div>

        <button type='submit' className="creation-submit">Submit Creation</button>
    </form>
  )
}

export default CardCreation