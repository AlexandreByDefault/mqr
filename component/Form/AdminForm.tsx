import React from 'react'
import styled, { css } from 'styled-components'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';


type Props ={
  primary?: boolean
  flex?: boolean
  w?: boolean
}
const WrapperForm = styled.div<Props>`
${props => props.flex && css` display:flex; flex-direction:column;`}
margin:auto;
`
const Input = styled.input<Props>`
${props => props.w && css`
width:4rem;`}
font-size:16px;
`
const ContainerForm = styled.div`
display: flex;
flex-direction: column;
`
const Button = styled.button`
width: intrinsic;
margin: 10px auto;
background-color: #06d6a0;
border: 1px solid transparent;
border-radius: 5px;
color: white;
font-size: 16px;
transition: all 200ms;
&:hover{
  background-color:#01a379;
}

` 

interface HickingProps<T> {
  name: string
  location:string;
  duration:number
  altitude:number
  distance: number
  description:string
  tips:string
  difficulty:string
  image: string
}

const AdminForm = () => {
  const {register,handleSubmit} = useForm<HickingProps>({
    defaultValues:{
      name:'',
      image:'',
      location:'',
      distance:0,
      duration:0,
      altitude:0,
      difficulty:'',
      description:'',
      tips:'',

    }
  })
  const onSubmit = () => {
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContainerForm>

     
      <WrapperForm >
      <label htmlFor="name">Nom : </label>
      <Input type="text" {...register('name')} />
      <label htmlFor="localisation">Localisation</label>
      <Input type="text" {...register("location")} />
      </WrapperForm>
      <WrapperForm  >
      <label htmlFor="distance">Distance : </label>
      <Input w type="number" step={0.1} min={0} />
      <label htmlFor="duration"> Durée : </label>
      <Input w type="number" step={0.1} min={0} />
      <label htmlFor="altitude">Altitude : </label>
      <Input w type="number" step={0.1} min={0} />
      </WrapperForm>
      <WrapperForm flex>
        <label htmlFor="file">Choose a file</label>
      <input type="file" {...register("image")} />
      <label htmlFor="description">Description : </label>
      <textarea {...register("description")} rows={6} cols={50}></textarea>
      <label htmlFor="description">tips : </label>
      <textarea {...register("tips")} rows={6} cols={50}></textarea>
      </WrapperForm>
      <Button>submit</Button>
      </ContainerForm>

    
    </form>
  )
}

export default AdminForm