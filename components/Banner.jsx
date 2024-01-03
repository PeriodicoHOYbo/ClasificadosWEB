import { useUser } from '../context/Context.js'
import { Zoom, Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Banner({ ruta, carpeta, click }) {

    const { userDB } = useUser()
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
    function redirect(rute, db) {
        if (ruta != '#') {
            db.modal
                ? router.push(`/ImgViewer?redireccion=${rute}&whatsapp=${db.whatsapp}&url=${db.url ? db.url : db.enlace}`)
                : window.open(ruta, '_blank')
        } else {
            db.modal
                ? router.push(`/ImgViewer?redireccion=${rute}&whatsapp=${db.whatsapp}&url=${db.url ? db.url : db.enlace}`)
                : ''
        }    }

    return (
        <div className={`${styles.containerFade} ${styles.containerFadeBanner}`} >
            {userDB[ruta] && Object.keys(userDB[ruta][carpeta]).length == 1

                ? Object.keys(userDB[ruta][carpeta]).map((i, index) =>
                    <div className="each-slide" key={index}>
                        <div>
                            {
                                router.pathname === "/Admin"
                                    ? <span onClick={() => click({ carpeta, i })}>
                                        {userDB[ruta][`${carpeta}`][i].url
                                            ? <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].url} />
                                            :
                                            <>
                                                <button className={styles.editButton}>Edit</button>
                                                {userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube')
                                                    ? <iframe
                                                        className={`${styles.responsiveIframe} h-[200px] md:h-[300px]`}
                                                        src={userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube') ? userDB[ruta][`${carpeta}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[ruta][`${carpeta}`][i].enlace}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen></iframe>
                                                    : <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].enlace} />
                                                }
                                            </>
                                        }
                                    </span>
                                    : <span onClick={() => redirect(userDB[ruta][`${carpeta}`][i].redireccion ? userDB[ruta][`${carpeta}`][i].redireccion : (userDB[ruta][`${carpeta}`][i].enlace && userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube') ? userDB[ruta][`${carpeta}`][i].enlace : '#'), userDB[ruta][`${carpeta}`][i])}>
                                        {userDB[ruta][`${carpeta}`][i].url
                                            ?
                                            <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].url} />
                                            : <>
                                                {userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube')
                                                    ? <iframe
                                                        className={`${styles.responsiveIframe} h-[200px] md:h-[300px]`}
                                                        src={userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube') ? userDB[ruta][`${carpeta}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : userDB[ruta][`${carpeta}`][i].enlace}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen></iframe>
                                                    : <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].enlace} />}
                                            </>
                                        }
                                    </span>
                            }
                            {
                                userDB[ruta][carpeta][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[ruta][carpeta][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                    <a target="_blank"><span><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></span></a>
                                </Link>
                            }
                        </div>
                    </div>)

                : <Fade transitionDuration={800} duration={2000} scale={1} {...properties} indicators={true}>
                    {Object.keys(userDB[ruta][carpeta]).map((i, index) =>
                        <div className="each-slide" key={index}>
                            <div>
                                {
                                    router.pathname === "/Admin"
                                        ? <span onClick={() => click({ carpeta, i })}>
                                            {userDB[ruta][`${carpeta}`][i].url
                                                ? <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].url} />
                                                : <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].enlace} />
                                            }
                                        </span>

                                        : <span onClick={() => redirect(userDB[ruta][`${carpeta}`][i].redireccion ? userDB[ruta][`${carpeta}`][i].redireccion : (userDB[ruta][`${carpeta}`][i].enlace && userDB[ruta][`${carpeta}`][i].enlace.includes('https://www.youtube') ? userDB[ruta][`${carpeta}`][i].enlace : '#'), userDB[ruta][`${carpeta}`][i])}>
                                            {userDB[ruta][`${carpeta}`][i].url
                                                ? <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].url} />
                                                : <img className={styles.sliderIMG} src={userDB[ruta][`${carpeta}`][i].enlace} />
                                            }
                                        </span>
                                }
                                {
                                    userDB[ruta][carpeta][i].whatsapp !== '' &&
                                    <Link href={`https://api.whatsapp.com/send?phone=${userDB[ruta][carpeta][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                        <a target="_blank"><span><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></span></a>
                                    </Link>
                                }
                            </div>
                        </div>
                    )}
                </Fade>

            }
        </div>
    )
}
