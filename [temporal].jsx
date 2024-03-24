




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


  const [arr, setArr] = useState([0])

  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [copyrightIMG, setCopyrightIMG] = useState(null)

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

  function redirect(ruta) {
    ruta != '#' ? window.open(ruta, '_blank') : ''
  }

  function validate() {

    switch (router.query.temporal.slice(0, 2)) {
      case '11':
        return "Inicio"
        break;
      case '12':
        return "Sociedad"
        break;
      case '13':
        return "Salud"
        break;
      case '14':
        return "Seguridad"
        break;
      case '15':
        return "Politica"
        break;
      case '16':
        return "Economia"
        break;
      case '17':
        return "Deportes"
        break;
      case '18':
        return "GestionDeGobierno"
        break;
      case '19':
        return "Cultura"
        break;
      case '20':
        return "Internacional"
        break;
      case '21':
        return "Deportes"
        break;
      case '22':
        return "Empresarial"
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

  return (

    <Layout>

      {specificData && router.query.temporal !== undefined &&
        <main className={styles.main}>
          <NavbarSimple footer={false}></NavbarSimple>

          <div className={styles.containerBanner}>
            {userDB && userDB[validate()] && userDB[validate()]["BannerTop"] && <Banner ruta={validate()} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
          </div>



          <div className={`${styles.viewer} ${formViewer == false && styles.hideForm}`}>

            <h2 className={styles.title}>{description}</h2>
            <p className={styles.description}>{title}</p>

            <div className={`${styles.containerButtonsPlayer} flex w-full justify-center`}>
              {specificData && router.query && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota && <SpeechSynthesis text={parse(textEditor) !== 'En redacción ' && Array.isArray(parse(textEditor)) && parse(textEditor).reduce((acc, result) => {
                return acc + result.props.children
              }, '').replaceAll('[object Object]').replaceAll('undefined')} />}
            </div>

            <div className={styles.containerIMGCenter}>
              <div className={styles.containerIMG}>
                <img src={userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url !== undefined && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
                <span className={styles.copyrightIMG}>{copyrightIMG}</span>
              </div>
            </div>



            {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].state == 'Publicado' || user
              ? <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
                <div className={`${styles.editor} ${styles.editorNon}`}>
                  <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={false}></TextEditor>
                </div>

                <br />

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


              : <div>En redacción...</div>

            }
            {user && formViewer == true && <div className='w-[90%] max-w-[350px] relative left-0 right-0 bottom-[20px] mx-auto z--50'>
              <Button style="miniButtonPrimary" click={formViewerHandler}>Editar nota</Button>
            </div>}
          </div>

          <div className={styles.adds}>



            <BannerNotas routeDB={`${validate()}`} items={[1, 2, 3, 4]} click={handlerClickEnlace} admin={formViewer}></BannerNotas>

            {/* <img src="/publicidad.jpg" alt="" /> */}
          </div>



          {/* editor */}


          {user && <div className={`${styles.viewer} ${formViewer == true && styles.hideForm}`}>
            <div className='flex w-full'>
              <label htmlFor="Title" className='w-[100px]' >Titulo</label>
              <input type="text" id="Title" name="description" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={description} />

            </div>
            <br />
            <div className='flex w-full'>
              <label htmlFor="Description" className='w-[100px]' >Descripcion</label>
              <input type="text" id="Description" name="title" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={title} />

            </div>
            <br />
            <div className='flex w-full'>
              <label htmlFor="Description" className='w-[100px]' >Autor IMG</label>
              <input type="text" id="Description" name="copyrightIMG" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={copyrightIMG} />
            </div>


            <h2 className={styles.title}>{description}</h2>
            <p className={styles.description}>{title}</p>

            <div className={styles.containerIMGCenter}>
              <div className={styles.containerIMG}>
                <img src={userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
                <span className={styles.copyrightIMG}>{copyrightIMG}</span>
              </div>
            </div>
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

        </main>}
      {specificData && router.query.temporal !== undefined &&
        <TemplateNota topic={validate()} publicView={true} banner='none'></TemplateNota>

      }

      {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

      {success == "save" && <Success>Cargando...</Success>}

      {user === null && <Temporizador topic={validate()} />}
    </Layout>
  )
}
export default WithoutAuth(TemplateOne)



