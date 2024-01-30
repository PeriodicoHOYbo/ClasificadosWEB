import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { useEffect, useState, useRef } from 'react'

import style from '../styles/NavbarSimple.module.css'

export default function Navbar({ footer }) {
    const { pathname } = useRouter()
    const router = useRouter()

    const { setUserShowImg, showImg } = useUser()
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    function handleClick() {
        setUserShowImg(!showImg)
    }
    function handlerClick() {
        setUserShowImg(false)
    }


    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (


        <div className={`${style.container} `}>
            <nav className={`${style.nav}`} style={{ padding: '0 80px', position: 'relative' }}>
                <Link href="/" legacyBehavior scroll={false}>
                    <a className={`uppercase  absolute pt-[5px] h-[30px] top-0 left-[0px] ${pathname == "#Resoluciones" ? style.active : ''}`} onClick={handlerClick}>
                        <span className=' h-[30px] rounded-full flex justify-center items-center bg-white rounded'><img src={'/inicio_v2.jpeg'} className="block h-[30px] rounded-full cursor-pointer" onClick={() => router.push('/')} alt="" /></span>
                    </a>
                </Link>
                <Link href="/#Resoluciones" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Resoluciones" ? style.active : ''}`} onClick={handlerClick}>Resoluciones</a>
                </Link>
                <Link href="/#Comunicados" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Comunicados" ? style.active : ''}`} onClick={handlerClick}>Comunicados</a>
                </Link>
                <Link href="/#Edictos" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Edictos" ? style.active : ''}`} onClick={handlerClick}>Edictos</a>
                </Link>
                <Link href="/#Remates" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Remates" ? style.active : ''}`} onClick={handlerClick}>Remates</a>
                </Link>
                <Link href="/#Articulos" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Articulos" ? style.active : ''}`} onClick={handlerClick}>Articulos</a>
                </Link>
                <Link href="/#Citaciones" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Citaciones" ? style.active : ''}`} onClick={handlerClick}>Citaciones</a>
                </Link>
                <Link href="/#Invitaciones" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Invitaciones" ? style.active : ''}`} onClick={handlerClick}>Invitaciones</a>
                </Link>
                <Link href="/#Inmobiliria" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Inmobiliria" ? style.active : ''}`} onClick={handlerClick}>Inmobiliria</a>
                </Link>
                <Link href="/#Servicios profesionales" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Servicios profesionales" ? style.active : ''}`} onClick={handlerClick}>Servicios profesionales</a>
                </Link>
                <Link href="/#Opinion" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Opinion" ? style.active : ''}`} onClick={handlerClick}>OPINIÓN</a>
                </Link>
               
                <Link href="/#Nosotros" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Nosotros" ? style.active : ''}`} onClick={handleClick}>NOSOTROS</a>
                </Link>
                <Link href="/" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Nosotros" ? style.active : ''}`} onClick={handleClick}>CLASIFICADOS</a>
                </Link>
                <Link href="/" legacyBehavior scroll={false}>
                    <a className={`uppercase absolute pt-[5px] top-0 bottom-0 my-auto  right-[0px] ${pathname == "#Resoluciones" ? style.active : ''}`} onClick={handlerClick}>
                        <span className='  h-[30px] rounded-full flex justify-center items-center bg-white rounded my-auto '><img src={'/clasificados_v2.jpeg'} className="block h-[30px] rounded-full cursor-pointer" onClick={() => router.push('/')} alt="" /></span>
                    </a>
                </Link>
                {/* <Link href="/" legacyBehavior scroll={false}>
                    <a className={`uppercase ${style.link} ${pathname == "#Nosotros" ? style.active : ''}`} onClick={handleClick}>
                        <span className=' w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white rounded my-auto '><img src={'/clasificados_v2.jpeg'} className="block h-[40px] rounded-full cursor-pointer" onClick={() => router.push('/')} alt="" /></span>
                    </a>
                </Link> */}
            </nav>
            {footer !== 'layout' && <div className={style.containerSocialMediaIcons}>
                <div className={style.socialMediaIcons} >

                    <Link href="https://api.whatsapp.com/send?phone=+59161116665&text=Hola%20Periódico%20HOY%20%20quiero%20contactarme%20con%20un%20agente%20de%20ventas..." legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/whatsapp.svg" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://www.facebook.com/periodicohoybolivia0" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/facebook.png" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://www.instagram.com/periodicohoybolivia/" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/instagram.png" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://twitter.com/_HOYBolivia" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/twiter.png" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCXFA6pzESb1NQMsepmhC6Vw" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/youtube.png" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://www.tiktok.com/@periodicohoybolivia" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/tiktok.png" alt="SocialMedia" /></a>
                    </Link>
                    <Link href="https://firebasestorage.googleapis.com/v0/b/hoy-bo-8b964.appspot.com/o/Peri%C3%B3dico%20HOY.apk?alt=media&token=1f242f98-80da-4bc5-bc61-63f6b556f87f" legacyBehavior scroll={false}>
                        <a onClick={handlerClick} > <img src="/SocialMedia/android.svg" alt="SocialMedia" /></a>
                    </Link>
                </div>
            </div>}
        </div>


    )
}