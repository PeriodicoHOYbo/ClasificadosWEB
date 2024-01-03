import HTMLFlipBook from 'react-pageflip';
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import NavbarBack from '../components/NavbarBack';
import { useRouter } from 'next/router'

function MyBook(props) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const router = useRouter()
    let navegador = navigator.userAgent;

    console.log(window.screen.width)

    return (
        userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital[router.query.edicion] && userDB.EdicionDigital[router.query.edicion] !== undefined && <div className='absolute sm:max-h-[133vw] flex justify-center items-center bg-[#00404a] min-h-screen w-full overflow-hidden '>
            <NavbarBack></NavbarBack>

            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:left-[20px] pointer-events-none' >Anterior</button>
            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:right-[20px] pointer-events-none' >Siguiente</button>

            <HTMLFlipBook
                width={ navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || window.innerWidth <= 780 ? window.screen.width - 50 : window.screen.width - 300} 
                // width={screen.width - 300}
                height={screen.width * 1.3}
                // size={'stretch'}
                maxShadowOpacity={0.5}
                showCover={false}
                swipeDistance={100}
                flippingTime={500}
                mobileScrollSupport={true}
            >
                {/* {Object.values(userDB.EdicionDigital[ router.query.edicion]).map((i, index) => <img src={`${i.url}`} key={index} />)} */}
                {Object.values(userDB.EdicionDigital[router.query.edicion]).map((i, index) => <img src={`${i.url}`} key={index} />)}
            </HTMLFlipBook>
        </div>
    )
}


export default WithoutAuth(MyBook)