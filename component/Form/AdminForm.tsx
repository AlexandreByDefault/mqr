import React, { useState } from 'react'
import { ContainerForm, WrapperForm, Input, Button, Label, InputFile } from './AdminStyledForm'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../client/supabase.client';

import style from './style.module.css'

type Difficulty = 'Difficile' | 'Moyen' | 'Facile'

interface HickingProps {
  name: string
  location: string;
  starting_point:string
  duration: number
  altitude: number
  distance: number
  description: string
  tips: string
  difficulty: Difficulty
  image: string
}


const AdminForm = ({difficulty}:HickingProps) => {
  const { register, handleSubmit, reset, watch } = useForm<HickingProps>({})

  const [value, setValue] = useState<FileList | null>(null)

  let label = ''

  if (value !== null) {
    if (value['length'] > 1) {
      label = ` ${value.length} Selected`
    } else if (value.length === 1) {
      label = value[0].name
    }
  }

  console.log(watch("difficulty"))





  const onSubmit = async (_data: HickingProps) => {

    try {
      const { error } = await supabase
      .from('hiking')
      .insert([
        { name: _data.name },
        { location: _data.location },
        { starting_point: _data.starting_point},
        { difficulty: _data.difficulty },
        { altitude: _data.altitude },
        { duration: _data.duration },
        { distance: _data.distance },
        { image_url: _data.image },
        { description: _data.description },
        { tips: _data.tips },
      ])
      alert('sucess')
      
    } catch (error) {
      console.log(error)
      
    }

 


  }





  return (
    <div>
   
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
          <Label htmlFor="image" >{label ? label : 'choose a image'}</Label>
          <InputFile type="file" {...register("image")} onChange={e => setValue(e.currentTarget.files)} multiple accept='Image/*' />

          <select {...register("difficulty")}>
            <option value={"Difficile"}> Difficile</option>
            <option value={"Moyen"}> Moyen</option>
            <option value={"Facile"}> Difficile</option>
          </select>

          <label htmlFor="description">Description : </label>
          <textarea {...register("description")} rows={6} cols={50}></textarea>
          <label htmlFor="description">tips : </label>
          <textarea {...register("tips")} rows={6} cols={50}></textarea>
        </WrapperForm>
        <Button>submit</Button>
      </ContainerForm>
    </form>
    </div>
  )
}

export default AdminForm