import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import Banner from './Banner'
import Modal from './Modal'
import { getIndexStorage } from '../firebase/storage'
import styles from '../styles/Template.module.css'
import { useRouter } from 'next/router'
import { Slide } from 'react-slideshow-image'

import Link from 'next/link'




function TemplateFour({ color, topic, grid }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerClickEnlace(i) {
        router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        router.pathname == "/Admin" && setDataEditor(i)
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
    // console.log(userDB)
    useEffect(() => {
        userDB[topic] && userDB[topic]["Posts"] && setDataForDate(Object.keys(userDB[topic]["Posts"]).map(i => { const newI = i.split('_'); return newI[1] }).sort((a, b) => b - a))
    }, [userDB]);
    return (

        <section className={styles.section} id={topic} style={{ backgroundColor: 'white' }}>
            {topic != "Inicio" && <div className={styles.containerSubtitle}><h4 className={styles.subtitle}>{topic == 'Invitaciones' ? 'Invitaciones' : topic.toUpperCase()}</h4></div>}

            {userDB[topic]["BannerTop"] && <Banner ruta={topic} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}

            {topic != "Inicio" && <button className={styles.buttonSeeAll} onClick={setPostsElements}>Ver todo</button>}


            <div className={`
                ${grid === 'TemplateOne' && styles.gridOne}
                ${grid === 'TemplateThreeA' && styles.gridThreeA}
                ${grid === 'TemplateThreeB' && styles.gridThreeB}
                ${grid === 'TemplateFour' && styles.gridFour}
                ${grid === 'TemplateFive' && styles.gridFive}
                ${grid === 'TemplateSix' && styles.gridSix}
                ${grid === 'TemplateSeven' && styles.gridSeven}
                ${grid === 'TemplateEight' && styles.gridEight}
                ${grid == null && styles.gridEight} 
                ${elements == true || styles.allVisible}`}
            >

                {userDB && dataForDate.length > 0 && dataForDate.map((i, index) =>
                    <>
                        {userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && router.pathname !== "/Admin" &&
                            <div key={index} >
                                {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{router.pathname !== "/Admin" && ''}</span>}
                                {router.pathname == "/Admin" && <span className={styles.datePost} onClick={() => router.pathname == "/Admin" && handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}

                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}>

                                        {userDB[topic].Posts[`PostImage_${i}`].images !== undefined && <Slide transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic' autoplay={false}>
                                            {
                                                userDB[topic].Posts[`PostImage_${i}`].images.map((i, index) =>
                                                    <div className="each-slide" key={index} >
                                                        {
                                                            router.pathname == "/Admin"
                                                                ? <img className='object-cover h-full' src={i.url} />
                                                                : <img className='object-cover h-full' src={i.url} />
                                                        }
                                                        {/* {
                                                            userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                                                <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                                            </Link>
                                                        } */}
                                                    </div>
                                                )}
                                        </Slide>}
                                    </a>
                                </Link>

                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>
                        }
                        {
                            userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && router.pathname == "/Admin" &&
                            <div key={index}>
                                {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{router.pathname !== "/Admin" && ''}</span>}
                                {<span className={styles.datePost} onClick={() => router.pathname == "/Admin" && handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}
                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}>


                                        {userDB[topic].Posts[`PostImage_${i}`].images !== undefined && <Slide transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic' autoplay={false}>
                                            {
                                                userDB[topic].Posts[`PostImage_${i}`].images.map((i, index) =>
                                                    <div className="each-slide" key={index} >
                                                        {
                                                            <img className='object-cover h-full' src={i.url} />

                                                        }
                                                        {/* {
                                                            userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${routeDB}`][`BannerNotas${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                                                <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                                            </Link>
                                                        } */}
                                                    </div>
                                                )}
                                        </Slide>}
                                    </a>
                                </Link>
                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>
                        }
                    </>
                )}

            </div>

            {userDB[topic]["BannerBottom"] && <Banner ruta={topic} carpeta="BannerBottom" click={handlerClickEnlace} ></Banner>}
            {dataEditor && <Modal topic={topic} carpeta={dataEditor.carpeta} i={dataEditor.i} close={handlerClickEnlace} ></Modal>}

        </section>


    )
}
export default TemplateFour






