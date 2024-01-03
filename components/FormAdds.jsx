import { writeUserData, getData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from './Button'
import Select from './Select'
import FormAddsC from './FormAddsC'
import style from '../styles/Form.module.css'
import { useState } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import imageCompression from 'browser-image-compression';


export default function Form() {

  const [check, setCheck] = useState(null)

  const bannerIzquierdo = [
    {
      id: null,
      title: '------------'
    },
    {
      id: 'BI1',
      ruteDB: 'BannerIzquierdo1',
      ruteSTG: 'Banners',
      title: 'Ban. Izquierdo 1'
    },
    {
      id: 'BI2',
      ruteDB: 'BannerIzquierdo2',
      ruteSTG: 'Banners',
      title: 'Ban. Izquierdo 2'
    },
    {
      id: 'BI3',
      ruteDB: 'BannerIzquierdo3',
      ruteSTG: 'Banners',
      title: 'Ban. Izquierdo 3'
    },
    {
      id: 'BI4',
      ruteDB: 'BannerIzquierdo4',
      ruteSTG: 'Banners',
      title: 'Ban. Izquierdo 4'
    }
  ]
  const bannerPortada = [
    {
      id: null,
      title: '------------'
    },
    {
      id: 'BP1',
      ruteDB: 'BannerPortada1',
      ruteSTG: 'Banners',
      title: 'Ban. Portada 1'
    },
    {
      id: 'BP2',
      ruteDB: 'BannerPortada2',
      ruteSTG: 'Banners',
      title: 'Ban. Portada 2'
    },
    {
      id: 'BP3',
      ruteDB: 'BannerPortada3',
      ruteSTG: 'Banners',
      title: 'Ban. Portada 3'
    },
    {
      id: 'BP',
      ruteDB: 'BannerPortada',
      ruteSTG: 'Banners',
      title: 'Ban. Portada 4'
    },
  ]
  const bannerDerecho = [
    {
      id: null,
      title: '------------'
    },
    {
      id: 'BD1',
      ruteDB: 'BannerDerecho1',
      ruteSTG: 'Banners',
      title: 'Ban. Derecho 1'
    },
    {
      id: 'BD2',
      ruteDB: 'BannerDerecho2',
      ruteSTG: 'Banners',
      title: 'Ban. Derecho 2'
    },
    {
      id: 'BD3',
      ruteDB: 'BannerDerecho3',
      ruteSTG: 'Banners',
      title: 'Ban. Derecho 3'
    },
    {
      id: 'BD4',
      ruteDB: 'BannerDerecho4',
      ruteSTG: 'Banners',
      title: 'Ban. Derecho 4'
    }
  ]

  function handleCheck(i) {
    console.log(i)
    setCheck(i)
  }
  return (
    <div className={`w-full `}>
      <form className='grid grid-cols-3 gap-5'>
        <Select arr={bannerIzquierdo} name='' defaultValue="Selecionar" focus={check && check.title.includes('Izquierdo')} click={handleCheck}></Select>
        <Select arr={bannerPortada} name='' defaultValue="Selecionar" focus={check && check.title.includes('Portada')} click={handleCheck}></Select>
        <Select arr={bannerDerecho} name='' defaultValue="Selecionar" focus={check && check.title.includes('Derecho')} click={handleCheck}></Select>
      </form>
      <div className={style.formInputs}>
        {check && check.id && <FormAddsC ruteDB={check.ruteDB} ruteSTG={check.ruteSTG} id={check.id} title={check.title} />}
      </div>
    </div>
  )
}




