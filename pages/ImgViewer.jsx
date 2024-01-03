import Head from 'next/head'
import Image from 'next/image'
import NavbarSimple from '../components/NavbarSimple'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import TemplateNota from '../components/TemplateNota'
import Layout from '../layout/Layout'
import TextEditor from '../components/TextEditor'
import { handleSignOut, writeUserData, getSpecificData } from '../firebase/utils'
import { getIndexStorage } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Banner from '../components/Banner'
import BannerNotas from '../components/BannerNotas'
import Modal from '../components/Modal'
import Link from 'next/link'
import Temporizador from '../components/Temporizador'
import { useGlobalAudioPlayer } from 'react-use-audio-player';

// import { useSpeechSynthesis } from 'react-speech-kit';
// import {SpeechSynthesis} from '../components/SpeechSynthesis'
const SpeechSynthesis = dynamic(() => import("../components/SpeechSynthesis"), {
  ssr: false,
});
const SpeechToText = dynamic(() => import("../components/SpeechToText"), {
  ssr: false,
});
// import useSpeechToText from 'react-hook-speech-to-text';

// import Form from './Form'

import styles from '../styles/Temporal.module.css'

import 'react-quill/dist/quill.core.css';

import dynamic from 'next/dynamic'


const ReactQuill = dynamic(() => import('../components/content'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})





function TemplateOne() {
  const [textArea, setTextArea] = useState("");
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, specificData, setUserSpecificData } = useUser()
  const { load, play, } = useGlobalAudioPlayer();
  const router = useRouter()


  const [buttons, setButtons] = useState(true)

  console.log(router.query)










  function formViewerHandler() {
    setFormViewer(!formViewer)
  }

  function closeModal() {
   
    let navegador = navigator.userAgent;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      setButtons(false)
    } else {
      setButtons(false)
      window.open(router.query.redireccion, '_self')    }

  }

  function redirect(ruta) {
    window.open(ruta, '_blank')
  }



  return (


<div className='relative w-screen h-screen'>
      <img src={`${router.query.url.replaceAll('spaceURL', '%2F')}&token=${router.query.token}`} className='block relative w-screen h-screen object-contain' alt="" />
      {buttons && <div className='h-[100px] bg-[#00000050] items-center  absolute top-0 bottom-0 left-0 right-0 m-auto grid grid-cols-2 gap-[10px] w-full max-w-[500px] px-5'>
        <button type="button" className="absolute top-0 right-0 text-whites bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center text-white" onClick={closeModal}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {router.query.whatsapp && router.query.whatsapp !== undefined && <button className='bg-[#00000050] hover:bg-[#00000080] flex items-center justify-center text-white font-bold text-[16px] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full h-[40px] px-2  text-center z-20' onClick={() => redirect(`https://api.whatsapp.com/send?phone=+${router.query.whatsapp.replaceAll(' ', '')}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`)}>Contactar</button>}
        {router.query.redireccion && router.query.redireccion !== undefined && <button className='bg-[#00000050] hover:bg-[#00000080] flex items-center justify-center text-white font-bold text-[16px] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full h-[40px] px-2  text-center z-20' onClick={() => redirect(router.query.redireccion)}>Visitar Sitio web</button>}
      </div>}
    </div>

    // <div className='relative w-screen h-screen cursor-zoom-in'>
    //   <img src={`${router.query.url.replaceAll('spaceURL', '%2F')}&token=${router.query.token}`} className='block relative w-screen h-screen object-contain' alt="" />
    //   {buttons && <div className='h-[100px] bg-[#00000050] items-center  absolute top-0 bottom-0 left-0 right-0 m-auto grid grid-cols-2 gap-[10px] w-full max-w-[500px] px-5'>
    //     <button type="button" className="absolute top-0 right-0 text-whites bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center text-white" onClick={closeModal}>
    //       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    //       </svg>
    //       <span className="sr-only">Close modal</span>
    //     </button>
    //     {router.query.whatsapp && router.query.whatsapp !== undefined && <button className='bg-[#00000050] hover:bg-[#00000080] flex items-center justify-center text-white font-bold text-[16px] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full h-[40px] px-2  text-center z-20' onClick={() => redirect(`https://api.whatsapp.com/send?phone=+${router.query.whatsapp.replaceAll(' ', '')}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`)}>Contactar</button>}
    //     {router.query.redireccion && router.query.redireccion !== undefined && <button className='bg-[#00000050] hover:bg-[#00000080] flex items-center justify-center text-white font-bold text-[16px] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full h-[40px] px-2  text-center z-20' onClick={() => redirect(router.query.redireccion)}>Visitar Sitio web</button>}
    //   </div>}
    // </div>
  )
}
export default WithoutAuth(TemplateOne)




