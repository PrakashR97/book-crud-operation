import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Update = () => {
    const [book,setBook]=useState(
        {
            title:"",
            des:"",
            cover:"",
            price:""   
        }
    )


    

    const navigate=useNavigate()
    const location=useLocation()

   console.log(location.pathname.split("/")[2])

   const id=location.pathname.split("/")[2]

   

    const handleClick =async e =>
    {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8800/books/${id}`,book)
            navigate("/")
        } catch (err) {
            
            console.log("Prkaah")
        }
    }


    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }

  return (
    <div className="form">
        <h1>Update New Book</h1>
        <input type="text" placeholder='title'   onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc'    onChange={handleChange} name='des'/>
        <input type="text" placeholder='cover'   onChange={handleChange} name='cover'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update