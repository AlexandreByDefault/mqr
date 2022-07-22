import React, { useState } from "react";
import {
  ContainerForm,
  WrapperForm,
  Input,
  Button,
  Label,
  InputFile,
} from "./AdminStyledForm";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { supabase } from "../client/supabase.client";
import { HickingProps } from "./HikingProps";


const AdminForm = ({ difficulty }: HickingProps) => {
  const { register, handleSubmit, reset, watch } = useForm<HickingProps>();
  const [value, setValue] = useState<FileList | null>(null);
  // change the label title according to the number of elements
  let label = "";
  if (value !== null) {
    if (value["length"] > 1) {
      label = ` ${value.length} Selected`;
    } else if (value.length === 1) {
      label = value[0].name;
    }
  }

  const onSubmit = async (_data: HickingProps) => {
    // set name, path and file to upload on supabase storage
    let name: string | undefined = "";
    let image: File = {} as File;
    let path = ``;
    if (value !== null) {
      name = value[0].name.split("-").at(-1);
      image = value[0];
      path = `public/${Date.now() + "-" + name}`;
    }
    let [{ data, error: Error }] = await Promise.all([
      supabase.storage.from("hiking-picture").upload(path, image, {
        cacheControl: "3600",
        upsert: false,
      }),
      supabase.from("hiking").insert([
        {
          name: _data.name,
          location: _data.location,
          starting_point: _data.starting_point,
          difficulty: _data.difficulty,
          altitude: _data.altitude,
          duration: _data.duration,
          distance: _data.distance,
          description: _data.description,
          tips: _data.tips,
          image_url: path,
        },
      ]),
    ]);
    if (Error) {
      console.log(Error);
      toast.error("❌ not send");
    }
    if(data){
      toast.success('🚀 Data sent ... ')
      reset()
    }
  };
  return (
    <>
      <div>
        <ToastContainer position="top-right" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerForm>
          <WrapperForm>
            <label htmlFor="name">Nom : </label>
            <Input type="text" {...register("name")} required/>
            <label htmlFor="localisation">Localisation</label>
            <Input type="text" {...register("location")} required/>
          </WrapperForm>
          <WrapperForm>
            <label htmlFor="distance">Distance : </label>
            <Input
              w
              type="number"
              {...register("distance")}
              step={0.1}
              defaultValue={0.1}
              required
            />
            <label htmlFor="duration"> Durée : </label>
            <Input
              w
              type="number"
              {...register("duration")}
              step={0.1}
              defaultValue={0.1}
              required
            />
            <label htmlFor="altitude">Altitude : </label>
            <Input
              w
              type="number"
              {...register("altitude")}
              step={0.1}
              defaultValue={0.1}
              required
            />
          </WrapperForm>
          <WrapperForm flex>
            <Label htmlFor="image">{label ? label : "choose a image"}</Label>
            <InputFile
              type="file"
              onChange={(e) => setValue(e.currentTarget.files)}
              multiple
              accept="Image/*"
              required
            />

            <select {...register("difficulty")}required>
              <option value={"Difficile"}> Difficile</option>
              <option value={"Moyen"}> Moyen</option>
              <option value={"Facile"}> Difficile</option>
            </select>

            <label htmlFor="description">Description : </label>
            <textarea
              {...register("description")}
              rows={6}
              cols={50}
              required
            ></textarea>
            <label htmlFor="tips">tips : </label>
            <textarea {...register("tips")} rows={6} cols={50} required></textarea>
          </WrapperForm>
          <Button>submit</Button>
        </ContainerForm>
      </form>
    </>
  );
};

export default AdminForm;
