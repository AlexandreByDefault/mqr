import React, { useState } from 'react'
import { ContainerForm, WrapperForm, Input, Button, Label, InputFile } from './AdminStyledForm'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../client/supabase.client';

type Difficulty = 'Difficile' | 'Moyen' | 'Facile'

interface HickingProps {
  name: string
  location: string;
  starting_point: string
  duration: number
  altitude: number
  distance: number
  description: string
  tips: string
  difficulty: Difficulty
  image: string
}


const AdminForm = ({ difficulty }: HickingProps) => {
  const { register, handleSubmit, reset, watch } = useForm<HickingProps>()

  const [value, setValue] = useState<FileList | null>(null)

  let label = ''

  if (value !== null) {
    if (value['length'] > 1) {
      label = ` ${value.length} Selected`
    } else if (value.length === 1) {
      label = value[0].name
    }
  }

  const onSubmit = async (_data: HickingProps) => {
    // set name and file to upload on supabase storage 
    let name: string | undefined = ''
    let image: File = {} as File
    if (value !== null) {
      name = value[0].name.split('-').at(-1)
      image = value[0]
    }
    const { data, error: Error } = await supabase
      .storage
      .from('hiking-picture')
      .upload(`public/${Date.now() + '-' + name}`, image, {
        cacheControl: '3600',
        upsert: false
      })
    let pathUrl = ''
    if (data) {
      pathUrl = data.Key
    }
    if (Error) {
      console.log(Error)
    }

    //send row in table 

    const { error } = await supabase
      .from('hiking')
      .insert([{
        name: _data.name,
        location: _data.location,
        starting_point: _data.starting_point,
        difficulty: _data.difficulty,
        altitude: _data.altitude,
        duration: _data.duration,
        distance: _data.distance,
        description: _data.description,
        tips: _data.tips,
        image_url: pathUrl
      }])
    if (error) {
      console.log(error)
    }
    toast('ok')

  }

  return (
    <>
      <div>
        <ToastContainer position='top-right'/>
      </div>

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
            <Input w type="number" {...register("distance")} step={0.1} defaultValue={0.1} />
            <label htmlFor="duration"> Durée : </label>
            <Input w type="number"  {...register("duration")} step={0.1} defaultValue={0.1} />
            <label htmlFor="altitude">Altitude : </label>
            <Input w type="number" {...register("altitude")} step={0.1} defaultValue={0.1} />
          </WrapperForm>
          <WrapperForm flex>
            <Label htmlFor="image" >{label ? label : 'choose a image'}</Label>
            <InputFile type="file" onChange={e => setValue(e.currentTarget.files)} multiple accept='Image/*' />

            <select {...register("difficulty")}>
              <option value={"Difficile"}> Difficile</option>
              <option value={"Moyen"}> Moyen</option>
              <option value={"Facile"}> Difficile</option>
            </select>

            <label htmlFor="description">Description : </label>
            <textarea {...register("description")} rows={6} cols={50}></textarea>
            <label htmlFor="tips">tips : </label>
            <textarea {...register("tips")} rows={6} cols={50}></textarea>
          </WrapperForm>
          <Button>submit</Button>
        </ContainerForm>
      </form>
    </>
  )
}

export default AdminForm