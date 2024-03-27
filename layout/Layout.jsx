import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import NavbarSimple from '../components/NavbarSimple'

import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Link from 'next/link'
import FormAdds from '../components/FormAdds'
import Modal from '../components/Modal'

import BannerLeft from '../components/BannerLeft'
import BannerLateral from '../components/BannerLateral'
import BannerPortada from '../components/BannerPortada'

import styles from '../styles/Layout.module.css'
import style from '../styles/RelojDigital.module.css'

import { handleSignOut } from '../firebase/utils'
import { getIndexStorage } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

function Layout({ children }) {
    const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, setUserPostsIMG, showImg, date, setUserDate } = useUser()
    const audioPlayer = useRef();
    const [dataEditor, setDataEditor] = useState(null)
    const router = useRouter()


    function handlerClickEnlace(data) {
        router.pathname != "/Admin" && window.open(data.href, data.target)
        router.pathname == "/Admin" && setDataEditor(data)
        // console.log(data.href, data.target)
    }

    function handlerClick(url) {
        router.push(url)
    }
    audioPlayer.current !== undefined ? audioPlayer.current.volume = 0.08 : ''
    function getSecondsToday() {
        let now = new Date();

        // creamos un objeto que contenga el día/mes/año actual
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let diff = now - today; // diferencia entre fechas, representado en ms
        return Math.round(diff / 1000); // pasaje a segundos
    }
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    useEffect(() => {
        // let arr2 = ['BannerIzquierdo1', 'BannerIzquierdo2', 'BannerIzquierdo3', 'BannerIzquierdo4','BannerPortada1', 'BannerPortada2', 'BannerPortada3', 'BannerDerecho1', 'BannerDerecho2', 'BannerDerecho3', 'BannerDerecho4','BannerPortada']

        // arr2.map((i) => { 
        //     userDB && userDB[i] && getIndexStorage('Banners', userDB[i], postsIMG, setUserPostsIMG)
        // });

    }, [userDB]);


    return (
        <>
            <div className={styles.container}>

                <div>
                    <BannerLateral carpeta="BannerPortada" items={[1, 2, 3]} click={handlerClickEnlace}></BannerLateral>
                </div>
                <div>
                    <BannerLateral carpeta="BannerIzquierdo" items={[1, 2, 3, 4]} click={handlerClickEnlace}></BannerLateral>
                </div>
                <div>
                    <BannerLateral carpeta="BannerDerecho" items={[1, 2, 3, 4]} click={handlerClickEnlace}></BannerLateral>
                </div>
                <main className={styles.main}>
                    {children}

                    <Link href="/FlipBook?edicion=Edicion 11_2023" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank">
                            <img src='/ninoPDF-optimizado.jpeg' className={`${styles.animationNinoPDF}`} />
                        </a>
                    </Link>


                    <NavbarSimple footer='layout'></NavbarSimple>
                    <footer className={styles.footer} id="Nosotros">
                        <div>
                            <h5>MISIÓN</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/vision.svg" alt="" />
                                <p className={styles.paragraph}>Informar, educar y contribuir a la formación de una Inmobiliria ciudadana en torno a la realidad nacional e Servicios profesionales.</p>

                            </div>
                        </div>
                        <div>
                            <h5>DIRECCIÓN Y PUBLICIDAD ONLINE</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/contact.svg" alt="" />
                                <p>(+591) 2 488973 <br /> 73002076 <br />60101760</p>
                                <img src="/ubication.svg" alt="" />
                                <p>Calle Cañada Strongest, <br /> No. 1782 esq. Capitán Castrillo, <br /> Edif. Napolis, Piso 4, Of. 4B <br /> Zona San Pedro</p>
                            </div>

                        </div>
                        <div>
                            <h5>VISIÓN</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/mision.svg" alt="" />
                                <p>Ser el medio impreso y digital de mayor influencia en la construcción de un Inmobiliria ciudadana en torno a la realidad nacional e Servicios profesionales.</p>
                            </div>
                        </div>
                        <div>
                            <h5>SIGUENOS EN</h5>
                            <div className='flex items-center h-[50px] '>
                                <Link href="https://www.facebook.com/periodicohoybolivia0" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/FACEBOOK-01.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.instagram.com/periodicohoybolivia/" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/INSTAGRAM-02.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://twitter.com/_HOYBolivia" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/TWITTER-03.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.youtube.com/channel/UCXFA6pzESb1NQMsepmhC6Vw" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/YOUTUBE-04.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.tiktok.com/@periodicohoybolivia" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/tIK tOK-05.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                                <Link href={`https://api.whatsapp.com/send?phone=+59161116665&text=Hola%20Periódico%20HOY%20%20quiero%20contactarme%20con%20un%20agente%20de%20ventas...`} legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/WHATSAPP-06.svg" className='h-[30px] w-[30px]' alt="SocialMedia" /></a>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <br />
                            <br />
                        
                            <div>
                            <br />
                            <br />
                            <div>
                            <br />
                                <div className='block w-full'>Nº de Visitas HOY <br />  </div>
                                <div className={style.container}>
                                <span className={style.time} style={{ fontSize: '35px', color: 'white', height: '50px' }}>{new Intl.NumberFormat('es-MX').format(Math.round(getSecondsToday() / ((new Date().getDay() < 3 ? new Date().getDay() + 1 : - 1) * 5)))}</span> 
                                </div>
                            </div>
                            </div>
                            
                            <br />
                            <Link href="/Login" legacyBehavior scroll={false}>
                                <a onClick={handlerClick}> <span> ©TARKAN Ltda.</span></a>

                            </Link>
                            <Link href="https://swoou.com/" legacyBehavior scroll={false}>
                                <a onClick={handlerClick}> <span></span></a>
                            </Link>
                        </div>
                    </footer>
                </main>
                {/* <audio src="/news_1.mp3" loop autoPlay ref={audioPlayer}></audio> */}

                {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

                {success == "NoData" && <Success>NO existe DATOS en esta decha</Success>}
            </div>
        </>
    )
}

export default Layout


