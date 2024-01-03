import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'

import Link from 'next/link'
import styles from '../styles/ModalAdds.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'



function Home() {
    const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, showVideo, date, setUserDate, zoomIMG, setZoomIMG, zoomIMG2, setZoomIMG2, bgOpacity, setBgOpacity, timer, setTimer,
        timerId, setTimerId, } = useUser()
    const router = useRouter()


    function redirect(ruta) {
        ruta != '#' ? window.open(ruta, '_blank') : ''
    }

    function closeZoom() {
        setZoomIMG(undefined)
        setZoomIMG2(false)
        setBgOpacity(false)
        // zoomIMG.lateral !== true ? console.log('nolaterla') : console.log('lateral')
        zoomIMG !== undefined &&    zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(5000)
        // zoomIMG.lateral !== true && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(userDB, zoomIMG, setZoomIMG, setBgOpacity, 5000)

    }
    const setUserModalsInterval = (time) => {
        console.log('interval')
        let id = setTimeout(() => {
            setTimerId(id);
            if (Object.values(userDB['Inicio']['Modals'])[0]) {
                setZoomIMG(Object.values(userDB['Inicio']['Modals'])[getRandomInt(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length)])
                setBgOpacity(true)
            }
        }, time)
        setTimerId(id)
        setTimer(true)
        return () => {
            clearTimeout(timerId)
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        zoomIMG === undefined && userDB && userDB['Inicio'] && userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length > 0 && setUserModalsInterval(3000)
    }, [userDB]);

    useEffect(() => {
        if (timer) {
            // timer should start
            //  let id = setTimeout(/*... do stuff ...*/, 5000);
            //  setTimerId(id);
        } else if (!timer && timerId) {
            // timer is started but is interrupted by user
            console.log('clear timer')
            clearTimeout(timerId);
        }
        return () => {
            // clean up
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, [timer]); // listen to changes on timer state





    return (
        <>
            {/* {bgOpacity && <div className={` ${styles.animation}`}></div>} */}

            <div className={`fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] z-[10000]  ${styles.animation}`} onClick={closeZoom}>
                <div className='inline-block relative'>
                    <span onClick={() => redirect(zoomIMG !== undefined && zoomIMG.redireccion ? zoomIMG.redireccion : (zoomIMG !== undefined && zoomIMG.enlace && zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace : '#'))}>
                        {zoomIMG !== undefined && zoomIMG.url
                            ? <img className='landscape:w-[80vh] portrait:w-[100vw] object-contain rounded-[15px]' src={zoomIMG.url} />
                            : <>
                                {zoomIMG !== undefined && zoomIMG.enlace !== undefined && zoomIMG.enlace.includes('https://www.youtube')
                                    ? <iframe
                                        className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
                                        src={zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : zoomIMG.enlace}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen></iframe>
                                    : <img className='landscape:w-[80vh] portrait:w-[100vw] object-contain rounded-[15px]' src={zoomIMG !== undefined && zoomIMG.enlace} />
                                }
                            </>
                        }
                    </span>
                    {
                      zoomIMG !== undefined &&   zoomIMG.whatsapp !== undefined && <Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                            <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                        </Link>
                    }
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-[#000000c7] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center z-50" onClick={closeZoom}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home







