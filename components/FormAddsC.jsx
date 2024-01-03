import { writeUserData, getData, removeData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from './Button'
import Error from './Error'
import style from '../styles/FormAddsC.module.css'
import { useState } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import imageCompression from 'browser-image-compression';


export default function Form({ id, ruteDB, ruteSTG, title, dataDB, close }) {
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear } = useUser()

    const [data, setData] = useState({})

    const [localFile, setLocalFile] = useState(null)
    const [localFileURL, setLocalFileURL] = useState(null)
    const [isCheckedComp, setIsCheckedComp] = useState(true)
    const [isCheckedModal, setIsCheckedModal] = useState(true)


    function handlerEventChange(e) {
        let year = e.target.value.split('-')[0]
        let month = e.target.value.split('-')[1]
        let day = e.target.value.split('-')[2]

        const name = e.target.name.split('-')[1]
        const value = e.target.value
        const object = { [name]: name.includes('date') ? new Date(parseInt(year), parseInt(month - 1), day, 0, 0, 0).getTime() : value }

        setData({ ...data, ...object })
    }

    function handlerInputFile(e) {
        const file = e.target.files[0]

        setLocalFile(file)
        setLocalFileURL(URL.createObjectURL(file))
    }
    function ressetInputFile(e) {
        setLocalFile(null)
        setLocalFileURL(null)
    }
    function handlerCheckedComp() {
        setIsCheckedComp(!isCheckedComp)
    }
    function handlerCheckedModal() {
        setIsCheckedModal(!isCheckedModal)
    }

    function save(e) {
        e.preventDefault()
        const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
        const newDate = new Date()
        if (userDB && dataDB !== undefined && dataDB.uuid) {
            writeUserData(`${ruteDB}/${dataDB.uuid}`, {...data, modal: isCheckedModal}, setUserSuccess, setUserData)
            localFile && uploadIMG(`${ruteDB}/${dataDB.uuid}`, ruteSTG, key, localFile, setUserSuccess, monthYear, isCheckedComp)
        } else {
            if (data[`dateInit`] && data[`dateFinish`]) {
                const key = newDate.getTime()
                const object = { [key]: { uuid: key, ...data, modal: isCheckedModal } }
                writeUserData(ruteDB, object, setUserSuccess, setUserData)
                localFile && uploadIMG(ruteDB, ruteSTG, key, localFile, setUserSuccess, monthYear, isCheckedComp)
            } else {
                setUserSuccess("CompleteFORM")
                data.dateInitBannerTop && data.dateFinishBannerLeft && bannerLeftImage == undefined && setUserSuccess("CompleteIMG")
            }
        }
    }

    function remove(e) {
        e.preventDefault()
        removeData(`${ruteDB}/${dataDB.uuid}`, setUserData, setUserSuccess)
        // close(null)
    }

    return (
        <>
            {userDB && dataDB && dataDB !== undefined
                ?
                <form className={style.formSelectAdds}>

                    {dataDB.url !== undefined
                        ? <label for={`for${id}`} className={style.label} >{title}</label>
                        : <label className={style.label} >Edicion Video o IMG url</label>
                    }

                    <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />

                    {dataDB.url !== undefined
                        ? <img className={style.previewIMGBanner} src={localFileURL ? localFileURL : dataDB.url} alt="" />
                        : <img className={style.previewIMGBanner} src={data[`enlace`] !== undefined ? data[`enlace`] : dataDB.enlace} alt="" />
                    }
                    {dataDB.url !== undefined && <div className={style.radioInputs}>
                        <input type="checkbox" onClick={handlerCheckedComp} checked={isCheckedComp} /> Comp
                    </div>}

                    <input type="text" placeholder='Enlace' name={`${id}-enlace`} defaultValue={data.enlace ? data.enlace : dataDB.enlace} onChange={handlerEventChange} />
                    <input type="text" placeholder='Enalce redireccion' name={`${id}-redireccion`} defaultValue={data.redireccion ? data.redireccion : dataDB.redireccion} onChange={handlerEventChange} />
                    <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} defaultValue={data.whatsapp ? data.whatsapp : dataDB.whatsapp} onChange={handlerEventChange} />

                    <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

                    <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

                    <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button>
                    <br />
                    <Button style="buttonMiniSecondary" click={(e) => remove(e, id)}>Eliminar</Button>

                </form>
                :
                <form className={style.formSelectAdds}>

                    <label for={`for${id}`} className={style.label} >{title}</label>
                    <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />
                    <img className={style.previewIMGBanner} src={(localFileURL && localFileURL) || (data[`enlace`] !== undefined && data[`enlace`].length > 10 ? data[`enlace`] : null)} onClick={ressetInputFile} alt="" />

                    <div className={style.radioInputs}>
                        <input type="checkbox" onClick={handlerCheckedComp} checked={isCheckedComp} /> Comp
                        <input type="checkbox" onClick={handlerCheckedModal} checked={isCheckedModal} /> Modal
                    </div>

                    <input type="text" placeholder='Enlace Youtube o IMG' name={`${id}-enlace`} onChange={handlerEventChange} />
                    <input type="text" placeholder='Enalce redireccion' name={`${id}-redireccion`} onChange={handlerEventChange} />
                    <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} onChange={handlerEventChange} />
                    <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

                    <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

                    <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button>
                </form>
            }
        </>
    )
}




// import { writeUserData, getData, removeData } from '../firebase/utils'
// import { uploadIMG } from '../firebase/storage'
// import { useUser } from '../context/Context.js'
// import Button from './Button'
// import Error from './Error'
// import style from '../styles/FormAddsC.module.css'
// import { useState } from 'react'
// import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
// import imageCompression from 'browser-image-compression';


// export default function Form({ id, ruteDB, ruteSTG, title, i, carpeta, dataDB, dataSTG, close }) {
//     const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear } = useUser()

//     const [data, setData] = useState({})

    
//     const [localFile, setLocalFile] = useState(null)
//     const [localFileURL, setLocalFileURL] = useState(null)
//     const [isCheckedComp, setIsCheckedComp] = useState(true)

//     function handlerEventChange(e) {
//         let year = e.target.value.split('-')[0]
//         let month = e.target.value.split('-')[1]
//         let day = e.target.value.split('-')[2]

//         const name = e.target.name
//         const value = e.target.value
//         const object = { [name]: name.includes('date') ? new Date(parseInt(year), parseInt(month - 1), day, 0, 0, 0).getTime() : value }

//         setData({ ...data, ...object })
//     }

//     function handlerInputFile(e) {
//         const file = e.target.files[0]

//         setLocalFile(file)
//         setLocalFileURL(URL.createObjectURL(file))
//     }
//     function handlerCheckedComp() {
//         setIsCheckedComp(!isCheckedComp)
//     }

//     function save(e, key) {
//         e.preventDefault()
//         const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
//         const newDate = new Date()
//         if (userDB && i) {

//             const key = i
//             const object = { [key]: { whatsapp: data[`${id}-whatsapp`] && data[`${id}-whatsapp`].length >= 0 ? data[`${id}-whatsapp`] : dataDB.whatsapp, enlace: data[`${id}-enlace`] ? data[`${id}-enlace`] : dataDB.enlace, dateInit: data[`${id}-dateInit`] ? data[`${id}-dateInit`] : dataDB.dateInit, dateFinish: data[`${id}-dateFinish`] ? data[`${id}-dateFinish`] : dataDB.dateFinish, url: dataDB.url ? dataDB.url : null } }
//             writeUserData(ruteDB, object, setUserSuccess, setUserData)
//             localFile && uploadIMG(ruteDB, ruteSTG, key, localFile, setUserSuccess, monthYear, isCheckedComp)

//         } else {
//             if (data[`${id}-dateInit`] && data[`${id}-dateFinish`]) {

//                 const key = newDate.getTime()
//                 const object = { [key]: {uuid: key, whatsapp: data[`${id}-whatsapp`] ? data[`${id}-whatsapp`] : '', enlace: data[`${id}-enlace`] ? data[`${id}-enlace`] : '', dateInit: data[`${id}-dateInit`], dateFinish: data[`${id}-dateFinish`] } }
//                 writeUserData(ruteDB, object, setUserSuccess, setUserData)
//                 localFile && uploadIMG(ruteDB, ruteSTG, key, localFile, setUserSuccess, monthYear, isCheckedComp)
//             } else {
//                 setUserSuccess("CompleteFORM")
//                 data.dateInitBannerTop && data.dateFinishBannerLeft && bannerLeftImage == undefined && setUserSuccess("CompleteIMG")
//             }
//         }

//     }

//     function remove(e) {
//         console.log(ruteDB)
//         e.preventDefault()
//         removeData(`${ruteDB}/${i}`, setUserData, setUserSuccess)
//         close(null)
//     }



//     return (

//         <>

//             {userDB && dataDB && dataDB !== undefined  ? <form className={style.formSelectAdds}>

//                 {dataDB.url !== undefined
//                     ? <label for={`for${id}`} className={style.label} >{title}</label>
//                     : <label className={style.label} >Video Edicion</label>
//                 }

//                 <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />

//                 {dataDB.url !== undefined && <img className={style.previewIMGBanner} src={localFileURL ? localFileURL : dataDB.url} alt="" />}
//                 {dataDB.url !== undefined && <div className={style.radioInputs}>
//                     <input type="checkbox" onClick={handlerCheckedComp} checked={isCheckedComp} /> Comp
//                 </div>}

//                 <input type="text" placeholder='Enlace' name={`${id}-enlace`} defaultValue={data.enlace ? data.enlace : dataDB.enlace} onChange={handlerEventChange} />
//                 <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} defaultValue={data.whatsapp ? data.whatsapp : dataDB.whatsapp} onChange={handlerEventChange} />

//                 <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
//                 <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

//                 <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
//                 <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

//                 <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button>
//                 <br />
//                 <Button style="buttonMiniSecondary" click={(e) => remove(e, id)}>Eliminar</Button>

//             </form> :
//                 <form className={style.formSelectAdds}>

//                     <label for={`for${id}`} className={style.label} >{title}</label>
//                     <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />
//                     <img className={style.previewIMGBanner} src={localFileURL} alt="" />

//                     <div className={style.radioInputs}>
//                         <input type="checkbox" onClick={handlerCheckedComp} checked={isCheckedComp} /> Comp
//                     </div>

//                     <input type="text" placeholder='Enlace' name={`${id}-enlace`} onChange={handlerEventChange} />
//                     <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} onChange={handlerEventChange} />

//                     <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
//                     <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

//                     <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
//                     <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

//                     <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button>
//                 </form>
//             }
//         </>
//     )
// }




