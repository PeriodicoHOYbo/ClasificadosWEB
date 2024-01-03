import { useState, useEffect } from 'react'
import { useUser } from '../context/Context.js'
import Layout from '../layout/Layout.jsx'
import { WithoutAuth } from '../HOCs/WithoutAuth.jsx'
import styles from '../styles/ModalAdds.module.css'
import Link from 'next/link.js'

function Temporizador({topic}) {
    const { userDB, timer, setTimer, timerId, setTimerId, zoomIMG, setZoomIMG, bgOpacity, setBgOpacity } = useUser()
    const [first, setFirs] = useState(true)

    console.log(topic)
    function closeZoom() {
        setTimer(false)
        setZoomIMG(undefined)
        setBgOpacity(false)
    }

    const setTimeOut2 = () => setTimeout(() => {
        closeZoom()
    }, 10000)

    const setUserModalsInterval = (time) => {
        let id = setTimeout(() => {
            if (Object.values(userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals'])[0]) {
                setZoomIMG(Object.values(userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals'])[getRandomInt(userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals'] && Object.values(userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals']).length)])
                setBgOpacity(true)
                setFirs(false)
                setTimeOut2()
            }
        }, first ? 3000 : time)

        setTimerId(id)
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function redirect(ruta) {
        ruta != '#' ? window.open(ruta, '_blank') : ''
    }
    useEffect(() => {
        if (timer) {
            zoomIMG === undefined && userDB && userDB[topic && topic !== undefined ? topic : 'Inicio'] && userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals'] && Object.values(userDB[topic && topic !== undefined ? topic : 'Inicio']['Modals']).length > 0 && setUserModalsInterval(12000)
        } else if (!timer && timerId) {
            clearTimeout(timerId);
            setTimer(true)
        }
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, [timer, userDB]);

    return <>
        {/* {bgOpacity && <div className={` ${styles.animation}`}></div>} */}

        {zoomIMG !== undefined && <div className={`fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] z-[10000] ${styles.animation} `} onClick={closeZoom}>
            <div className='inline-block relative'>
                <span onClick={() => redirect(zoomIMG !== undefined && zoomIMG.redireccion ? zoomIMG.redireccion : (zoomIMG !== undefined && zoomIMG.enlace && zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace : '#'))}>
                    {zoomIMG !== undefined && zoomIMG.url
                        ? <img className='landscape:h-[100vh] landscape:max-w-[100vw] portrait:w-[100vw] portrait:max-h-[100vh] object-contain rounded-[15px]' src={zoomIMG.url} />
                        : <>
                            {zoomIMG !== undefined && zoomIMG.enlace !== undefined && zoomIMG.enlace.includes('https://www.youtube')
                                ? <iframe
                                    className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
                                    src={zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : zoomIMG.enlace}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                                : <img className='landscape:h-[100vh] landscape:max-w-[100vw] portrait:w-[100vw] portrait:max-h-[100vh] object-contain rounded-[15px]' src={zoomIMG !== undefined && zoomIMG.enlace} />
                            }
                        </>
                    }
                </span>
                {
                    zoomIMG !== undefined && zoomIMG.whatsapp !== undefined && <Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
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
        </div>}



    </>



}




export default Temporizador