import { writeUserData, getData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import Tag from '../components/Tag'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import HTMLFlipBook from 'react-pageflip';

function Form({ topic, value, color }) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const router = useRouter()

    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(true)
    const [isCheckedComp, setIsCheckedComp] = useState(true)
    const [isCheckedLength, setIsCheckedLength] = useState(true)

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)
    const [fileList, setFileList] = useState([])

    function manageInputIMG(e) {
        e.preventDefault()
        const fileName = `${e.target.name}`
        const file = e.target.files[0]
        setFileList([...e.target.files])
        if (fileName === 'PostImage') {
            setPostImage(file)
            setUrlPostImage(URL.createObjectURL(file))
        }
    }


    console.log(userDB)

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }


    const handlerItem = (index) => {
        const arr = [...fileList]
        arr.splice(index, 1)
        setFileList(arr)
    }


    const bytesToMegaBytes = bytes => bytes / (1024 * 1024)
    function save(e) {
        e.preventDefault()
        const newDate = new Date()

        const ruteDB = `EdicionDigital/${data.titular !== undefined && data.titular}`
        const ruteSTG = `EdicionDigital/${data.titular !== undefined && data.titular}`

        uploadIMG(ruteDB, ruteSTG, '', fileList, setUserSuccess, null, false, true)


        // if (postImage) {
        //     const ruteDB = `/${topic}/Posts` // Nov-2022/Inicio
        //     const ruteSTG = `${topic}` // Nov-2022/
        //     const fileName = `PostImage_${newDate.getTime()}` // PostImage_Tue Nov 15 2022 
        //     const object = { [fileName]: { fecha: newDate.getTime(), description: data.descriptionPost ? data.descriptionPost : '', enlace: data.enlacePost ? data.enlacePost : `${num}${newDate.getTime()}`, objectFit: data.objectPositionPost ? data.objectPositionPost : 'center', nota: '' } }
        //     setUserSuccess('Cargando')
        //     writeUserData(ruteDB, object, setUserSuccess, setUserData)
        //     uploadIMG(ruteDB, ruteSTG, fileName, postImage, setUserSuccess, monthYear, isCheckedComp)


        //     isChecked && writeUserData(`/Inicio/Posts`, object, setUserSuccess, setUserData)
        //     isChecked && uploadIMG(`/Inicio/Posts`, 'Inicio', fileName, postImage, setUserSuccess, monthYear, isCheckedComp)

        // } else {
        //     setUserSuccess("CompleteIMG")
        // }
    }

    console.log(data)
    return (
        <div className='fixed top-0 left-0  h-[50px] w-full col-span-2 z-50 p-5'>
            <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg " onClick={() => router.back()}>
                <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 32L2 17L17 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}


export default Form