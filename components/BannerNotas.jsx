import { useUser } from '../context/Context.js'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useRouter } from 'next/router'

import Link from 'next/link'


export default function Banner({ routeDB, items, click, admin }) {

    const { userDB, zoomIMG, setZoomIMG, setZoomIMG2, bgOpacity, setBgOpacity, timer, setTimer } = useUser()
    // console.log(userDB[ruta])
    const router = useRouter()

    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
    function redirect(rute) {
        console.log('redirect')
        rute !== '#' && window.open(rute, '_blank')
    }
    function redirect(ruta) {
        ruta != '#' ? window.open(ruta, '_blank') : ''
    }
    function handlerZoom(i) {
        console.log('click')
        setZoomIMG({ ...i, lateral: true })
        setZoomIMG2(true)
        setBgOpacity(true)
        setTimer(false)
    }

    return (

        items.map((item,) =>
            userDB && userDB[`${routeDB}`] && userDB[`${routeDB}`] !== undefined && userDB[`${routeDB}`][`BannerNotas${item}`] &&

            <div className={`${styles.containerFadeNota} border-white border-[5px]`} >
                {Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).length == 1

                    ? Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).map((i, index) =>
                        <div className="each-slide" key={index} >
                            {
                                admin ?
                                    <span onClick={() => handlerZoom(userDB[`${routeDB}`][`BannerNotas${item}`][i])}>
                                        {/* <span onClick={() => click({ routeDB, item, i })}> */}

                                        {

                                            userDB[`${routeDB}`][`BannerNotas${item}`][i].url
                                                ?
                                                <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                :
                                                <>
                                                    {userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube')
                                                        ?
                                                        <iframe
                                                            className={styles.responsiveIframe}
                                                            src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace}
                                                            title="YouTube video player"
                                                            frameborder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowfullscreen></iframe>


                                                        : <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace} />
                                                    }
                                                </>

                                        }

                                    </span>
                                    : <span onClick={() => handlerZoom(userDB[`${routeDB}`][`BannerNotas${item}`][i])}>

                                        {userDB[`${routeDB}`][`BannerNotas${item}`][i].url
                                            ?
                                            <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                            :
                                            <>
                                                {userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube')
                                                    ?
                                                    <iframe
                                                        className={styles.responsiveIframe}
                                                        src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen></iframe>


                                                    : <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace} />
                                                }
                                            </>
                                        }

                                    </span>
                            }
                            {
                                userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp !== '' && 
                                <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                </Link>
                            }
                        </div>
                    )
                    :
                    <Fade transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic'>
                        {
                            Object.keys(userDB[`${routeDB}`][`BannerNotas${item}`]).map((i, index) =>
                                <div className="each-slide" key={index} >
                                    {
                                        !admin
                                            ?
                                            <span onClick={() => handlerZoom(userDB[`${routeDB}`][`BannerNotas${item}`][i])}>
                                                {
                                                    userDB[`${routeDB}`][`BannerNotas${item}`][i].url
                                                        ? <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                                        : <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].enlace} />
                                                }
                                            </span>
                                            :
                                            <span onClick={() => handlerZoom(userDB[`${routeDB}`][`BannerNotas${item}`][i])}>
                                                <img className={styles.sliderIMG} src={userDB[`${routeDB}`][`BannerNotas${item}`][i].url} />
                                            </span>
                                    }
                                    {
                                        userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                            <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                        </Link>
                                    }
                                </div>
                            )}
                    </Fade>
                }
            </div>
        )

    )
}
