import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Layout from '../layout/Layout'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import Modal from '../components/Modal'

import Section from '../components/Section'
import Header from '../components/Header'
import { sectionsDB } from '../utils/SectionsDB.js'
import styles from '../styles/Home.module.css'
import { handleSignOut, writeUserData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Admin() {
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, setUserDate, viewPeriodista, setUserViewPeriodista } = useUser()
  const router = useRouter()


  //console.log(postsIMG)

  function handlerUploadFile(e, fileName) {
    const file = e.target.files[0]
    uploadIMG(file, fileName, setUserSuccess, postsIMG, setUserPostsIMG)
  }

  const [elements, setElements] = useState(false)
  const [dataForDate, setDataForDate] = useState([])
  const [dataEditor, setDataEditor] = useState(null)

  function setPostsElements() {
    setElements(!elements)
  }


  function handlerLogout(e) {
    handleSignOut()
    router.push("/Login")

  }

  function dateEvent(e) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    console.log(e.target.value)
    const format = e.target.value.split("-")
    console.log(format)
    setUserDate(`${parseInt(format[2])}-${months[format[1] - 1]}-${format[0]}`)

  }
  function handlerViewPeriodista() {
    setUserViewPeriodista(!viewPeriodista)
  }
  // console.log(user.uid)
  function handlerClickEnlace(i) {
    router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
    router.pathname == "/Admin" && setDataEditor(i)
  }
  function resetAutomatico() {
    writeUserData(`/`, { login: !userDB.login }, setUserSuccess)
  }

  // userDB['Inmobiliria'] && Object.keys(userDB['Inmobiliria'].Posts).map((i)=>{
  //   let rute = `Inmobiliria/Posts/${i}`
  // userDB['Inmobiliria'].Posts[i].fecha && writeUserData(rute,{fecha: new Date(userDB['Inmobiliria'].Posts[i].fecha).getTime()})
  //   })

  console.log(userDB)

  useEffect(() => {

    if (userDB.users && userDB.users[user.uid] == undefined) {
      router.replace('/Register')
      return
    }
  }, [userDB]);

  return (
    <Layout>
      <main className={`${styles.main} `}>

        <div className={styles.containerLogout}>
          <span> <img src={userDB.users && userDB.users[user.uid] && userDB.users[user.uid].url} className={styles.perfilIMG} alt="" />Bienvenido {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].name} </span>
          {
            user && userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' ? <div className={styles.blueContainer}>
              <span className={styles.blue}>Register</span>

              <span className={`${styles.circleBlueContainer} ${userDB.login ? '' : styles.circleLeadContainer}`} onClick={resetAutomatico}>
                <span className={`${styles.circleBlue} ${userDB.login ? '' : styles.circleLead}`}></span>
              </span>
            </div>: <span></span>
          }
          <Button style="buttonPrimary" click={handlerLogout}>Logout</Button>
          <span className='block w-full h-[3px] absolute bottom-[-7px] left-0 bg-[brown]'></span>
        </div>
        <Header></Header>
       { sectionsDB.map((i, index) => <Section topic={i.title} publicView={false} color='#8FC2C9' key={index}></Section>)}

        {/* <Section topic="Inicio" publicView={false} color='#8FC2C9'></Section>
        <Section topic="Resoluciones" publicView={false} color='#c98f8f'></Section>
        <Section topic="Comunicados" publicView={false} color='#8FC2C9'></Section>
        <Section topic="Edictos" publicView={false} color='#c98f8f'></Section>
        <Section topic="Remates" publicView={false} color='#8FC2C9'></Section>
        <Section topic="Articulos" publicView={false} color='#c98f8f'></Section>
        <Section topic="Citaciones" publicView={false} color='#8FC2C9'></Section>
        <Section topic="Invitaciones" publicView={false} color='#c98f8f'></Section>
        <Section topic="Inmobiliria" publicView={false} color='#8FC2C9'></Section>
        <Section topic="Servicios profesionales" publicView={false} color='#c98f8f'></Section>
        <Section topic="Empleos" publicView={false} color='#8FC2C9'></Section> */}
        {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && <button className={styles.viewPeriodista} onClick={handlerViewPeriodista}>P</button>}
      </main>


      {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>}
      {success === "CompleteFORM" && <Error>Complete el formulario...</Error>}
      {success === "CompleteFechaInit" && <Error>Complete la fecha de inicio...</Error>}
      {success === "CompleteFechaFinish" && <Error>Complete la fecha final...</Error>}
      {success === "CompleteIMG" && <Error>Añade una imagen...</Error>}
      {success == "Cargando" && <Success>Cargando...</Success>}
      {success == "save" && <Success>Cargando...</Success>}

    </Layout>
  )
}

export default WithAuth(Admin) 









