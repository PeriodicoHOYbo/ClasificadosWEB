import { useUser } from '../context/Context.js'
import { Zoom, Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { clearUserModalsInterval } from '../HOCs/Interval.js'

export default function Banner({ carpeta, items, click }) {

    const { userDB, zoomIMG, setZoomIMG, setZoomIMG2, bgOpacity, setBgOpacity, timer, setTimer } = useUser()
    // const [zoomIMG, setZoomIMG] = useState(undefined)
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
    function redirect(ruta, db) {
        if (ruta != '#') {
            db.modal
                ? router.push(`/ImgViewer?redireccion=${rute}&whatsapp=${db.whatsapp}&url=${db.url ? db.url : db.enlace}`)
                : window.open(ruta, '_blank')
        } else {
            db.modal
                ? router.push(`/ImgViewer?redireccion=${rute}&whatsapp=${db.whatsapp}&url=${db.url ? db.url : db.enlace}`)
                : ''
        }
    }
    function handlerZoom(i) {
        console.log(i)
        if (i.modal) {
            console.log('active true')

            router.push(`/ImgViewer?redireccion=${i.redireccion}&whatsapp=${i.whatsapp}&url=${i.url ? i.url.replaceAll('%2F', 'spaceURL') : i.enlace.replaceAll('%2F', 'spaceURL')}`)
        } else {
            console.log('active false')

            setZoomIMG({ ...i, lateral: true })
            setZoomIMG2(true)
            setBgOpacity(true)
            setTimer(false)
        }
    }

    return (
        items.map((item,) =>
            userDB[`${carpeta}${item}`] &&

            <div className={`${styles.containerFade} ${carpeta === 'BannerIzquierdo' && styles.containerFadeLeft} ${carpeta === 'BannerDerecho' && styles.containerFadeRight} ${carpeta === 'BannerPortada' && styles.boxShadow}`}>
                {Object.keys(userDB[`${carpeta}${item}`]).length == 1

                    ? Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                        <div className="each-slide" key={index} >
                            {
                                router.pathname === "/Admin"
                                    ? <span onClick={() => click({ carpeta, item, i })}>

                                        {userDB[`${carpeta}${item}`][i].url
                                            ? <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                            :
                                            <>
                                                {userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube')
                                                    ? <>
                                                        <button>Edit</button>
                                                        <iframe
                                                            className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
                                                            src={userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${carpeta}${item}`][i].enlace}
                                                            title="YouTube video player"
                                                            frameborder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowfullscreen></iframe>
                                                    </>
                                                    : <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].enlace} />
                                                }
                                            </>
                                        }
                                    </span>
                                    : <span onClick={() => carpeta !== 'BannerPortada'
                                        ? handlerZoom(userDB[`${carpeta}${item}`][i], userDB[`${carpeta}${item}`][i].modal)
                                        : (redirect(userDB[`${carpeta}${item}`][i].redireccion ? userDB[`${carpeta}${item}`][i].redireccion : (userDB[`${carpeta}${item}`][i].enlace && userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace : '#'), userDB[`${carpeta}${item}`][i]))
                                    } >
                                        {userDB[`${carpeta}${item}`][i].url
                                            ? <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                            : <>
                                                {userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube')
                                                    ? <iframe
                                                        className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
                                                        src={userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[`${carpeta}${item}`][i].enlace}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen></iframe>
                                                    : <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].enlace} />
                                                }
                                            </>
                                        }
                                    </span>
                            }

                            {
                                userDB[`${carpeta}${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${carpeta}${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                </Link>
                            }



                        </div>)

                    : <Fade transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic'>
                        {
                            Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                                <div className="each-slide" key={index} >
                                    {
                                        router.pathname === "/Admin"
                                            ?
                                            <span onClick={() => click({ carpeta, item, i })}>
                                                {userDB[`${carpeta}${item}`][i].url
                                                    ? <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                                    : <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].enlace} />
                                                }
                                            </span>
                                            :
                                            <span onClick={() => carpeta !== 'BannerPortada'
                                                ? handlerZoom(userDB[`${carpeta}${item}`][i],)
                                                : (redirect(userDB[`${carpeta}${item}`][i].redireccion ? userDB[`${carpeta}${item}`][i].redireccion : (userDB[`${carpeta}${item}`][i].enlace && userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace : '#'), userDB[`${carpeta}${item}`][i]))
                                            } >


                                                {userDB[`${carpeta}${item}`][i].url
                                                    ? <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                                    : <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].enlace} />
                                                }                                                </span>
                                    }
                                    {
                                        userDB[`${carpeta}${item}`][i].whatsapp !== '' &&
                                        <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${carpeta}${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                            <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                        </Link>
                                    }
                                </div>
                            )
                        }
                    </Fade>
                }
            </div>


        )

    )
}






