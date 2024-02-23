import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'

import Link from 'next/link'
import FormAdds from '../components/FormAdds'
import Layout from '../layout/Layout'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'
import { sectionsDB } from '../utils/SectionsDB'
import styles from '../styles/Home.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { listAll } from 'firebase/storage'
import Temporizador from '../components/Temporizador'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = "AIzaSyBZkk7x_tGRbf-Yg_A7Y9QYcBQe7T9QtWU"

var fetch_url = `${YOUTUBE_PLAYLIST_ITEMS_API}`


function Home() {
  const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, showVideo, date, setUserDate, zoomIMG, setZoomIMG, bgOpacity, setBgOpacity, timer } = useUser()
  const router = useRouter()

  const [listYT, setListYT] = useState(false);


  // const [zoomIMG, setZoomIMG] = useState(undefined)
  const [modalsInterval, setModalsInterval] = useState(false)

  async function getYB() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=8&playlistId=UULFXFA6pzESb1NQMsepmhC6Vw&key=${YOUTUBE_API_KEY}`)
    const data = await res.json();
    setListYT(data)
  }

  function redirectYT() {
    window.open('https://www.youtube.com/@periodicohoybolivia2201/videos', '_blank')
  }

  useEffect(() => {
    getYB()
  }, [])



  function redirect(ruta) {
    ruta != '#' ? window.open(ruta, '_blank') : ''
  }

  function closeZoom() {
    setZoomIMG(undefined)
    setBgOpacity(false)
    // zoomIMG.lateral !== true ? console.log('nolaterla') : console.log('lateral')
    zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(5000)
    // zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(userDB, zoomIMG, setZoomIMG, setBgOpacity, 5000)

  }
  // const setUserModalsInterval = (time) => {
  //   console.log('interval')
  //   timer.current = setTimeout(() => {
  //     console.log(zoomIMG)
  //     if (Object.values(userDB['Inicio']['Modals'])[0]) {
  //       setZoomIMG(Object.values(userDB['Inicio']['Modals'])[getRandomInt(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length)])
  //       setBgOpacity(true)
  //     }
  //   }, time)

  //   return () => {
  //     clearTimeout(timer.current)
  //   }
  // }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



  return (
    <>
      <Layout>
        <div className={styles.main}>
          <Header></Header>

          {/* {showImg &&

          <div className='columns-3 gap-2 pb-3'>

            {userDB && userDB.Inicio && Object.keys(userDB.Inicio.Posts).map((i, index) => {

              return <div className='relative' key={index}>
                <Link href='#' legacyBehavior>
                  <a target='_blank'>
                    <img className='block w-full mb-2' src={userDB.Inicio.Posts[i].url} alt="img" />
                    <span className={styles.description}>{userDB.Inicio.Posts[i].description}</span>
                  </a>
                </Link >
              </div>
            })}
          </div>} */}



          {showImg &&

            <div className={styles.gridImages}>

              {userDB && userDB.Inicio && Object.keys(userDB.Inicio.Posts).map((i, index) => {

                return <div className={styles.image} key={index}>
                  <Link href='#' legacyBehavior>
                    <a target='_blank'>
                      <img className={styles.image} src={userDB.Inicio.Posts[i].url} alt="img" />
                      <span className={styles.description}>{userDB.Inicio.Posts[i].description}</span>
                    </a>
                  </Link >
                </div>
              })}
            </div>}

          {showVideo && listYT !== false &&

            <div className={styles.gridVideos}>


              {listYT.items.map(({ id, snippet = {} }) => {
                const { title, thumbnails = {}, resourceId = {} } = snippet;
                const { medium } = thumbnails;
                return (
                  <div key={id} className={styles.boxVideo}>

                    <iframe
                      className={styles.video}
                      // width={medium.width}
                      // height={medium.heigth}
                      src={`https://www.youtube.com/embed/${resourceId.videoId}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>

                    {/* <p className={styles.videoDescription}>{title}</p> */}

                  </div>
                )
              })}
              <div className={styles.boxVideo} onClick={redirectYT}>
                <img className={styles.seeMoreYT}
                  src="/seeMoreYT.jpeg"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen />
                {/* <p className={styles.videoDescription}>Las noticias mas relevantes en <br /> HOY.BO</p> */}
              </div>

            </div>}

          {showImg == false && showVideo == false && sectionsDB.map((i) => <Section topic={i.title} publicView={true} color=''></Section>)}
          {/* <Section topic={i.title} publicView={true} color=''></Section> */}

        </div>



      </Layout>
      <Temporizador />

    </>
  )
}

export default WithoutAuth(Home)






// {bgOpacity && <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-[1000]'></div>}

// {zoomIMG !== undefined && <div className='fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] z-[10000]' onClick={closeZoom}>
//   <div className='inline-block relative'>
//     <span onClick={() => redirect(zoomIMG.redireccion ? zoomIMG.redireccion : (zoomIMG.enlace && zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace : '#'))}>
//       {zoomIMG.url
//         ? <img className='landscape:w-[80vh] portrait:h-[80vw] object-contain rounded-[15px]' src={zoomIMG.url} />
//         : <>
//           {zoomIMG.enlace !== undefined && zoomIMG.enlace.includes('https://www.youtube')
//             ? <iframe
//               className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
//               src={zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : zoomIMG.enlace}
//               title="YouTube video player"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowfullscreen></iframe>
//             : <img className='landscape:w-[80vh] portrait:h-[80vw] object-contain rounded-[15px]' src={zoomIMG.enlace} />
//           }
//         </>
//       }
//     </span>
//     {
//       zoomIMG.whatsapp !== undefined && <Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
//         <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
//       </Link>
//     }
//     <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-[#000000c7] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center z-50" onClick={closeZoom}>
//       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//       </svg>
//       <span className="sr-only">Close modal</span>
//     </button>
//   </div>
// </div>}

