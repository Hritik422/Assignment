import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './style.css'
import pic from './photo.png'
import gif from './submit.gif'
export default function Form() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx2rsxy3IP81vxk2PuMYzFu6kiyGuNUO8MRSx4iGAbu3GqYnLBwjcsvG43aSxE2BzWfiQ/exec';
    let [cur,updated]=useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit=(values,event)=>{
function change(){
  updated(false);
}
function myStopFunction() {
  setTimeout(change,5000);
}
    event.preventDefault();
    const form = document.querySelector("#form")
    let requestBody = new FormData(form)
     fetch(scriptURL, { method: 'POST', body: requestBody})
       .then(response => {
        updated(true)
        myStopFunction();
         })
       .catch(error => {
       alert('Error!', error.message)
       })

  };
  
  return (
    <main>
    <img src={pic}></img>
    <form onSubmit={handleSubmit(onSubmit)} id='form'>
      <label></label>
      <input type="text" placeholder='Name' {...register("NAME", { required: true })} />
      {errors.NAME && <p>Name is required</p>}
      <label></label>
      <input type="email" placeholder='Email'{...register("EMAIL", { required: true, pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/})} />
      {errors.EMAIL && <p>Email must be valid</p>}
      <label></label>
      <input type='tel' placeholder='Mobile'{...register("PHONE", { required: true, pattern: /^(\+91|\+91\-|0)?[789]\d{9}$/})} />
      {errors.PHONE && <p>Phone Number is incorrect</p>}
      <label></label>
      <input type="text" placeholder='MESSAGE'{...register("MESSAGE")} />
      {errors.MESSAGE && <p>Message is required</p>}
      <button type="submit">Submit</button>
    </form>
    <div>
    {cur && <div className='submit'> <img height='15%' width='15%'src={gif}></img></div>}</div>
    </main>
  );
}