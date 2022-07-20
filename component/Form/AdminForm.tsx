import React from 'react'
import { ContainerForm, WrapperForm, Input, Button, Label, InputFile } from './AdminStyledForm'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

import style from './style.module.css'


interface HickingProps {
  name: string
  location: string;
  duration: number
  altitude: number
  distance: number
  description: string
  tips: string
  difficulty: string
  image: string
}

const AdminForm = () => {
  const { register, handleSubmit, reset } = useForm<HickingProps>({
    defaultValues: {
      name: '',
      image: '',
      location: '',
      distance: 0,
      duration: 0,
      altitude: 0,
      difficulty: '',
      description: '',
      tips: '',

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
          <label htmlFor="image" >Choose a file</label>
          <InputFile type="file" {...register("image")}/>
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