




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
import { Slide } from 'react-slideshow-image'

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


  const [arr, setArr] = useState([0])

  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [copyrightIMG, setCopyrightIMG] = useState(null)
  const [removeKEY1, setRemoveKEY1] = useState(false)
  const [removeKEY2, setRemoveKEY2] = useState(false)

  const [textEditor, setTextEditor] = useState("")

  const [formViewer, setFormViewer] = useState(true)
  const [dataEditor, setDataEditor] = useState(null)
  const [isChecked, setIsChecked] = useState(true)

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']




  // function handlerPlayMusic() {
  //   console.log('play')
  //   load('/news_1.mp3', {
  //     autoplay: true,
  //     loop: true,
  //   });
  // }



  const router = useRouter()

  function handlerOnChange(e) {
    const name = e.target.name
    const value = e.target.value
    name == 'title' ? setTitle(value) : ''
    name == 'description' ? setDescription(value) : ''
    name == 'copyrightIMG' ? setCopyrightIMG(value) : ''
  }
  function handlerTextEditorOnChange(content, delta, source, editor) {
    setTextEditor(editor.getHTML())
  }

  function redirect(ruta, self) {
    ruta != '#' ? window.open(ruta, self ? '_self' : '_blank') : ''
  }

  function validate() {

    switch (router.query.temporal.slice(0, 2)) {
      case '11':
        return "Inicio"
        break;
      case '12':
        return "Resoluciones"
        break;
      case '13':
        return "Comunicados"
        break;
      case '14':
        return "Edictos"
        break;
      case '15':
        return "Remates"
        break;
      case '16':
        return "Articulos"
        break;
      case '17':
        return "Citaciones"
        break;
      case '18':
        return "Invitaciones"
        break;
      case '19':
        return "Inmobiliria"
        break;
      case '20':
        return "Servicios profesionales"
        break;
      case '21':
        return "Citaciones"
        break;
      case '22':
        return "Empleos"
        break;
      default:
        return 'anything'
    }
  }


  function save(e, st) {

    const ruteDB = `${validate()}/Posts/PostImage_${router.query.temporal.slice(2)}`
    const objectDB = {
      title: title ? title : '',
      description: description ? description : '',
      copyrightIMG: copyrightIMG ? copyrightIMG : '',
      state: st == 'B' ? 'Borrador' : 'Publicado',
      redactor: user.uid
    }
    const rutePost = `/Posts/PostImage_${router.query.temporal}`
    const objectPost = {
      nota: textEditor,
    }
    writeUserData(ruteDB, objectDB, setUserSuccess, 'save')
    isChecked && writeUserData(`Inicio/Posts/PostImage_${router.query.temporal.slice(2)}`, objectDB, setUserSuccess, 'save')
    writeUserData(rutePost, objectPost, setUserSuccess, 'save')

    return setUserSpecificData({
      ...specificData, [`PostImage_${router.query.temporal}`]: { ...objectDB, ...objectPost },
    })

  }


  function formViewerHandler() {
    setFormViewer(!formViewer)
  }

  function handlerClickEnlace(data) {
    setDataEditor(data)
  }

  function handlerChecked() {
    setIsChecked(!isChecked)
  }
  const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px'
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}></button>,
    nextArrow: <button style={{ ...buttonStyle }}></button>
  }

  useEffect(() => {
    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota
      ? console.log('nota existente')
      : getSpecificData(`/Posts/PostImage_${router.query.temporal}`, specificData, setUserSpecificData)

    title === null && userDB && userDB[validate()] && setTitle(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].title)
    description === null && userDB && userDB[validate()] && setDescription(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].description)
    copyrightIMG === null && userDB && userDB[validate()] && setCopyrightIMG(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].copyrightIMG)

    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota
      ? setTextEditor(specificData[`PostImage_${router.query.temporal}`].nota)
      : setTextEditor('En redacción ')
  }, [userDB, specificData, router.query.temporal]);





  console.log(parse(textEditor))


  // useEffect(() => {
  //   userDB && user === null && userDB[validate()] && userDB[validate()]['Modals'] && Object.values(userDB[validate()]['Modals']).length > 0 && setUserModalsInterval(5000)
  // }, [userDB]);
  // console.log(specificData && router.query && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota !== '' && specificData[`PostImage_${router.query.temporal}`].nota && specificData[`PostImage_${router.query.temporal}`].nota !== undefined)
  return (

    specificData && router.query.temporal !== undefined &&
    <main className={`${styles.main} `}>

      {
        formViewer === true && <div className={`relative h-screen bg-black ${styles.viewer}`}>
          {/* <h2 className={`p-5 sm:w-[50vw] absolute left-0 right-0 mx-auto ${styles.title} text-center bg-white rounded-[20px] shadow-2xl z-50`}>{description}</h2> */}
          <h2
            className={`p-5 sm:w-[50vw] fixed top-[70px] left-0 text-[#007483] text-[40px]  overflow-hidden m-0 text-center  rounded-[20px] shadow-2xl z-50 transition-all ${styles.title} ${removeKEY1 === false && styles.titleKEY}`}>
            {description}
            <span className='absolute right-5 font-bold text-[#007483] text-[16px]  h-[30px] w-[30px] rounded-full' onClick={() => setRemoveKEY1(!removeKEY1)}> {removeKEY1 === true ? '<<' : '>>'} </span>
          </h2>


          <div className={`${removeKEY2 === false && styles.containerButtonsPlayer} fixed w-full transition-all right-0 flex sm:w-[50vw] justify-center sm:justify-start  z-50`}>
            <div className='relative inline  '>
              <span className='absolute top-0 bottom-0 my-auto left-2 text-[20px] z-50 text-white' onClick={() => setRemoveKEY2(!removeKEY2)}> {removeKEY2 === true ? '>>' : '<<'} </span>
              {specificData && router.query && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota !== '' && specificData[`PostImage_${router.query.temporal}`].nota && specificData[`PostImage_${router.query.temporal}`].nota !== undefined && specificData[`PostImage_${router.query.temporal}`].nota !== 'en redaccion' && <SpeechSynthesis text={parse(textEditor) !== 'En redacción ' && Array.isArray(parse(textEditor)) && parse(textEditor).reduce((acc, result) => {
                return acc + result.props.children
              }, '').replaceAll('[object Object]').replaceAll('undefined')} />}
            </div>

          </div>



          {userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].images !== undefined &&
            <div className='relative '>
              <Slide transitionDuration={50} duration={50} scale={1} indicators={true} easing='cubic' autoplay={false}>
                {
                  userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].images.map((i, index) =>
                    <div className="each-slide " key={index} >
                      <img className='block relative w-screen   sm:h-screen object-contain cursor-zoom-in' src={i.url} onClick={() => redirect(i.url, true)} />
                      {
                        userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                          <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                        </Link>
                      }
                    </div>
                  )}
              </Slide>
            </div>
          }



          {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].state == 'Publicado' || user &&
            <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
              <div className={styles.redactorData}>
                <div className={styles.perfil}>
                  <img src={userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor !== undefined && userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].url} className={styles.perfilIMG} alt="" />
                  {userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor] && <p>{userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].name} <br /> Redactor</p>}
                </div>
                <span>
                  {days[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDay()]} {' de '}
                  {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDate()} {' de '}
                  {months[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getMonth()]} {' de '}
                  {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getFullYear()}</span>
              </div>
            </div>
          }
          <div className='fixed bottom-[50px] left-0 right-0 mx-auto flex w-[50vw] justify-between'>
            <img src="/velas.gif" className='w-[50px]' alt="" />
            <img src="/velas.gif" className='w-[50px]' alt="" />
          </div>

          {user && formViewer === true && <div className='w-[90%] max-w-[350px] relative left-0 right-0 bottom-[20px] mx-auto z--50'>
            <Button style="miniButtonPrimary" click={formViewerHandler}>Editar nota</Button>
          </div>}
        </div>
      }





      {/* editor */}


      {user && formViewer === false && <div className={`p-5 min-h-screen bg-slate-100 ${styles.viewer}`}>
        <div className='flex w-full'>
          <label htmlFor="Title" className='w-[100px]' >Titulo</label>
          <input type="text" id="Title" name="description" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={description} />
        </div>
        <br />
        {/* <div className='flex w-full'>
              <label htmlFor="Description" className='w-[100px]' >Descripcion</label>
              <input type="text" id="Description" name="title" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={title} />
            </div> */}

        <h2 className={styles.title}>{description}</h2>
        <p className={styles.description}>{title}</p>


        <SpeechToText setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} />
        <br />
        <div className={styles.editor}  >
          <TextEditor setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} edit={true}></TextEditor>
        </div>

        <br />

        <input type="checkbox" onClick={handlerChecked} checked={isChecked} /> init
        <br />
        <br />


        <div className={styles.buttonsContainer}>
          <Button style="miniButtonPrimary" click={(e) => save(e, 'B')}> Guardar/Borrador</Button>
          <Button style="miniButtonPrimary" click={(e) => save(e, 'P')}> Publicar</Button>
        </div>
        {user && formViewer == false && <div className='w-[90%] max-w-[350px] relative left-0 right-0  mx-auto py-5'>
          <Button style="miniButtonPrimary" click={formViewerHandler}>Previsualizar</Button>
        </div>}
      </div>}



      {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

      {success == "save" && <Success>Cargando...</Success>}

      {user === null && <Temporizador topic={validate()} />}



    </main>

  )
}
export default WithoutAuth(TemplateOne)



