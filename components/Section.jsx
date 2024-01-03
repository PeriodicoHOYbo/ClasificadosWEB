import { useUser } from '../context/Context'
import Template from './Template'
import Button from './Button'
import Select from './Select'
import styles from '../styles/Template.module.css'
import { useState, useEffect } from 'react'
import Tag from '../components/Tag'
import style from '../styles/Form.module.css'
import { removeData } from '../firebase/utils'
import Form from './Form'
import FormAddsC from './FormAddsC'
import { useRouter } from 'next/router'

import { getDate, getDayMonthYear } from "../utils/Utils";
import Link from 'next/link'
import Modal2 from './Modal2'
import ModalForm from './ModalForm'
import { Fade } from 'react-slideshow-image'



const bannerNotas = [
    {
        id: null,
        title: '------------'
    },
    {
        id: 'BN1',
        ruteDB: 'BannerNotas1',
        ruteSTG: 'Banners',
        title: 'Ban. De Notas 1'
    },
    {
        id: 'BN2',
        ruteDB: 'BannerNotas2',
        ruteSTG: 'Banners',
        title: 'Ban. De Notas 2'
    },
    {
        id: 'BN3',
        ruteDB: 'BannerNotas3',
        ruteSTG: 'Banners',
        title: 'Ban. De Notas 3'
    },
    {
        id: 'BN4',
        ruteDB: 'BannerNotas4',
        ruteSTG: 'Banners',
        title: 'Ban. De Notas 4'
    },
]


export default function Section({ topic, publicView, color }) {

    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear, dayMonthYear, viewPeriodista, item, setItem, modal, setModal } = useUser()
    const [tag, setTag] = useState('')
    const [zoomIMG, setZoomIMG] = useState(undefined)
    const [modalsInterval, setModalsInterval] = useState(false)
    const [counterModals, setCounterModals] = useState(0)
    const [check, setCheck] = useState(undefined)
    const [props, setProps] = useState({})
    const [dataEditor, setDataEditor] = useState(null)
    const router = useRouter()

    function handlerTag(val) {
        tag === val && val !== 'Notas' ? setTag('') : setTag(val)
        val !== 'Notas' ? setCheck(bannerNotas[0]) : ''
    }

    function handlerZoom(i) {
        setZoomIMG(i)
    }
    function closeZoom() {
        setZoomIMG(undefined)
    }




    function handlerClickEnlace(i, topic, banner) {
        if (router.pathname == "/Admin") {
            setModal('EDIT')
            setDataEditor(i)
            setItem(banner)
        }
    }

    function deletConfirm() {
        removeData(item.route, setUserData, setUserSuccess)
        setModal('')
    }
    function delet(i, path) {
        console.log(topic)
        setItem({ ...i, route: `${topic}/${path}/${i.uuid}` })
        setModal('DELETE')
    }





    function handleCheck(i) {
        console.log(i)
        // const value = e.target.value
        if (i.title.includes('Notas')) {
            handlerTag('Notas')
        } else {
            handlerTag('')
        }

        setCheck(i)
    }
    // console.log(userDB && userDB[topic] &&  userDB[topic] !== undefined && check !== undefined && userDB[topic][check.ruteDB])

    return (
        <div className='w-full bg-white pb-[5px] sm:pb-[10px]'>
            {modal === 'DELETE' && <Modal2 theme="Danger" button="Eliminar" funcion={deletConfirm}>Estas seguro de eliminar la publicidad que selecionaste</Modal2>}
            {modal === 'EDIT' && dataEditor && <ModalForm>
                {tag === 'Modals' && <FormAddsC ruteDB={`/${topic}/Modals`} ruteSTG={`/${topic}/Modals`} id='BM' title='Añadir Modal' dataDB={dataEditor} />}
                {tag === 'Notas' && <FormAddsC ruteDB={`/${topic}/${check.ruteDB}`} ruteSTG={`/${topic}/${check.ruteDB}`} id={check.id} title={check.title} dataDB={dataEditor} />}
            </ModalForm>
            }
            {/* <Modal topic={topic} carpeta={dataEditor.carpeta} i={dataEditor.i} close={handlerClickEnlace} ></Modal> */}
            {userDB[topic] !== null && publicView == false && <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form>}

            {user && userDB && userDB.users && userDB.users[user.uid] !== undefined && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && publicView == false && viewPeriodista == false &&
                <>
                    <div className={`grid ${topic !== 'Inicio' ? 'grid-cols-3' : 'grid-cols-3'} gap-2`}>
                        <Tag theme={tag === 'Banners' ? 'Primary' : 'Transparent'} click={() => handlerTag('Banners')}>Banners</Tag>
                        <Tag theme={tag === 'Modals' ? 'Primary' : 'Transparent'} click={() => handlerTag('Modals')}>{topic !== 'Inicio' ? 'Modals' : 'Modals Portada'}</Tag>
                        {topic !== 'Inicio'
                            ? <Select arr={bannerNotas} click={handleCheck} focus={tag.includes('Notas') ? true : false}></Select>
                            : <Tag theme={tag === 'Banners' ? 'Primary' : 'Transparent'} click={() => router.push('/EdicionDigital')}>Edición digital</Tag>}
                        {/* { topic !== 'Inicio' && <Tag theme={tag === 'Notas' ? 'Primary' : 'Transparent'} click={() => handlerTag('Notas')}>Notas</Tag>} */}
                    </div>
                    <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
                        {tag === 'Banners' && <>
                            <FormAddsC ruteDB={`/${topic}/BannerTop`} ruteSTG={`/${topic}/BannerTop`} id={'BTop'} title='Añadir Banner Cabecera' />
                            <FormAddsC ruteDB={`/${topic}/BannerBottom`} ruteSTG={`/${topic}/BannerBottom`} id={'BBotom'} title='Añadir Banner Pie' />
                        </>}
                        {tag === 'Modals' && <FormAddsC ruteDB={`/${topic}/Modals`} ruteSTG={`/${topic}/Modals`} id='BM' title='Añadir Modal' />}
                        {topic !== 'Inicio' && tag.includes('Notas') && <FormAddsC ruteDB={`/${topic}/${check.ruteDB}`} ruteSTG={`/${topic}/${check.ruteDB}`} id={check.id} title={check.title} />}
                    </div>
                </>
            }
            {tag === 'Modals' && <div className="columns-3 gap-3 pb-3">
                {userDB && userDB[topic] && userDB[topic]['Modals'] && Object.values(userDB[topic]['Modals']).map((i, index) => {
                    return <div className='inline-block relative' key={index}>
                        <img src={i.url && i.url !== undefined ? i.url : i.enlace} className={`${'w-full gap-5 rounded-[15px] mb-3.5'} transition-all`} style={{ zIndex: '1000000000' }} onClick={() => handlerZoom(i)} alt="" />
                        <div className='w-full absolute bottom-[20px] px-5 z-50'>
                            <Button theme='MiniDanger' click={() => router.pathname == "/Admin" && handlerClickEnlace(i)}>Config</Button>
                        </div>
                    </div>
                })}
            </div>}
            {tag === 'Notas' && <div className="columns-3 gap-3 pb-3">
                {userDB && userDB[topic] && userDB[topic][check.ruteDB] && Object.values(userDB[topic][check.ruteDB]).map((i, index) => {
                    return <div className='inline-block relative' key={index}>
                        <img src={i.url} className={`${'w-full gap-5 rounded-[15px] mb-3.5'} transition-all`} style={{ zIndex: '1000000000' }} alt="" />
                        <div className='w-full absolute bottom-[20px] px-5 z-50'>

                            <Button theme='MiniDanger' click={() => router.pathname == "/Admin" && handlerClickEnlace(i)}>config</Button>
                            {/* <Button theme='MiniDanger' click={() => delet(i, 'Notas')}>config</Button> */}
                        </div>
                    </div>
                })}
            </div>}

            {userDB && userDB[topic] && userDB[topic]['Templates'] && (tag === 'Banners' || tag === '') &&
                <Template
                    topic={topic}
                    color={color}
                    grid={userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()]} />
            }
            {zoomIMG !== undefined && <div className='fixed flex justify-center items-center top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-[1000000000]' onClick={closeZoom}>
                <div className='inline-block relative'>
                    <span onClick={() => redirect(zoomIMG.redireccion ? zoomIMG.redireccion : (zoomIMG.enlace && zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace : '#'))}>
                        {zoomIMG.url
                            ? <img className='landscape:w-[80vh] portrait:h-[80vw] object-contain rounded-[15px]' src={zoomIMG.url} />
                            : <>
                                {zoomIMG.enlace !== undefined && zoomIMG.enlace.includes('https://www.youtube')
                                    ? <iframe
                                        className={`${styles.responsiveIframe} ${carpeta === 'BannerPortada' && 'h-[200px] md:h-[300px]'}`}
                                        src={zoomIMG.enlace.includes('https://www.youtube') ? zoomIMG.enlace.replace('/watch?v=', '/embed/') + '?showinfo=0' : zoomIMG.enlace}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen></iframe>
                                    : <img className='landscape:w-[80vh] portrait:h-[80vw] object-contain rounded-[15px]' src={zoomIMG.enlace} />
                                }
                            </>
                        }
                    </span>

                    {
                        zoomIMG.whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${zoomIMG.whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
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

        </div>

    )
}

