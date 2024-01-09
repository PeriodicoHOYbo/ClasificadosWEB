import { writeUserData, getData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Form.module.css'
import { useState } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import FormAddsC from './FormAddsC'
import Tag from '../components/Tag'

export default function Form({ topic, value, color }) {
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()

  const [data, setData] = useState({})
  const [isChecked, setIsChecked] = useState(true)
  const [isCheckedComp, setIsCheckedComp] = useState(true)
  const [isCheckedLength, setIsCheckedLength] = useState(true)

  const [postImage, setPostImage] = useState(null)
  const [urlPostImage, setUrlPostImage] = useState(null)
  const [fileList, setFileList] = useState([])

  // function manageInputIMG(e) {
  //   const fileName = `${e.target.name}`
  //   const file = e.target.files[0]

  //   if (fileName === 'PostImage') {
  //     setPostImage(file)
  //     setUrlPostImage(URL.createObjectURL(file))
  //   }
  // }
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

  function manageTemplate(e) {
    //const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
    const ruteDB = `/${topic}/Templates` // /Inicio
    const value = e.target.value

    const object = { [dayMonthYear]: value }
    writeUserData(ruteDB, object, setUserSuccess)
  }

  function handlerEventChange(e) {
    const name = e.target.name
    const value = e.target.value
    const object = { [name]: value }
    setData({ ...data, ...object })
  }
  function handlerEventChange2(e) {
    e.preventDefault()
    console.log(e)
    const name = e.target.name
    const value = e.target[0].value

    const object = { [new Date().getTime()]: value }
    setFileList([...fileList.filter(i => typeof i === 'string'), value])
  }
  function handlerChecked() {
    setIsChecked(!isChecked)
  }
  function handlerCheckedComp() {
    setIsCheckedComp(!isCheckedComp)
  }
  function handlerCheckedLength() {
    setIsCheckedLength(!isCheckedLength)
  }
  function validator(e) {
    e.preventDefault()

    switch (topic) {
      case "Inicio":
        return save(11)
        break;
      case "Resoluciones":
        return save(12)
        break;
      case "Comunicados":
        return save(13)
        break;
      case "Edictos":
        return save(14)
        break;
      case "Remates":
        return save(15)
        break;
      case "Articulos":
        return save(16)
      case "Citaciones":
        return save(17)
        break;
      case "Invitaciones":
        return save(18)
        break;
      case "Inmobiliria":
        return save(19)
        break;
      case "Servicios profesionales":
        return save(20)
        break;
      case "Citaciones":
        return save(21)
        break;
      case "Empleos":
        return save(22)
        break;
      default:
        return setUserSuccess(false)
    }
  }

  function save(num) {
    setUserSuccess('Cargando')

    const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
    const newDate = new Date()

    if (fileList.length > 0) {
      const ruteDB = `/${topic}/Posts` // Nov-2022/Inicio
      const ruteSTG = `${topic}` // Nov-2022/
      const fileName = `PostImage_${newDate.getTime()}` // PostImage_Tue Nov 15 2022 
      const object = {
        [fileName]: typeof fileList[0] === 'string'
          ? { fecha: newDate.getTime(), description: data.descriptionPost ? data.descriptionPost : '', enlace: data.enlacePost ? data.enlacePost : `${num}${newDate.getTime()}`, objectFit: data.objectPositionPost ? data.objectPositionPost : 'center', nota: '', images: fileList.map(i=>{return {url: i}})}
          : { fecha: newDate.getTime(), description: data.descriptionPost ? data.descriptionPost : '', enlace: data.enlacePost ? data.enlacePost : `${num}${newDate.getTime()}`, objectFit: data.objectPositionPost ? data.objectPositionPost : 'center', nota: '' }
      }

      setUserSuccess('Cargando')
      writeUserData(ruteDB, object, setUserSuccess, setUserData)
      typeof fileList[0] !== 'string' && uploadIMG(`${ruteDB}/${fileName}/images`, ruteSTG, '', fileList, setUserSuccess, null, false, true)

      // uploadIMG(ruteDB, ruteSTG, fileName, postImage, setUserSuccess, monthYear, isCheckedComp)
      isChecked && writeUserData(`/Inicio/Posts`, object, setUserSuccess, setUserData)
      // isChecked && uploadIMG(`/Inicio/Posts`, 'Inicio', fileName, postImage, setUserSuccess, monthYear, isCheckedComp)
      isChecked && typeof fileList[0] !== 'string' && uploadIMG(`${ruteDB}/${fileName}/images`, ruteSTG, '', fileList, setUserSuccess, null, false, true)
    } else {
      setUserSuccess("CompleteIMG")
    }
  }
  const bytesToMegaBytes = bytes => bytes / (1024 * 1024)
  const handlerItem = (index) => {
    const arr = [...fileList]
    arr.splice(index, 1)
    setFileList(arr)
  }
  function formSubmit(e) {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <div className={style.form}>
      {/* <select className={style.select}  name={`${topic}-Template-${dayMonthYear}`} onChange={manageTemplate} style={{ backgroundColor: color, fontWeight: 'bold', border: '2px solid brown' }}> */}
      <select className={`${style.select} text-white`} name={`${topic}-Template-${dayMonthYear}`} onChange={manageTemplate} style={{ fontWeight: 'bold', }}>
        <option value="#" selected={value == "TemplateOne" ? true : false}>Ninguno-{topic}</option>
        <option value="TemplateOne" selected={value == "TemplateOne" ? true : false}>Plantilla 1-{topic}</option>
        <option value="TemplateThreeA" selected={value == "TemplateThreeA" ? true : false}>Plantilla 2-{topic}</option>
        <option value="TemplateThreeB" selected={value == "TemplateThreeB" ? true : false}>Plantilla 3-{topic}</option>
        <option value="TemplateFour" selected={value == "TemplateFour" ? true : false}>Plantilla 4-{topic}</option>
        <option value="TemplateFive" selected={value == "TemplateFive" ? true : false}>Plantilla 5-{topic}</option>
        <option value="TemplateSix" selected={value == "TemplateSix" ? true : false}>Plantilla 6-{topic}</option>
        <option value="TemplateSeven" selected={value == "TemplateSeven" ? true : false}>Plantilla 7-{topic}</option>
        <option value="TemplateEight" selected={value == "TemplateEight" ? true : false}>Plantilla 8-{topic}</option>
      </select>

      {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'periodista' || viewPeriodista == true ?

        <div className={`bg-white h-full md:grid md:grid-cols-2`}>



          <div className="divide-y divide-gray-200  p-10 h-[450px] overflow-y-scroll w-full  ">
            <h3 className='text-center'>Imagenes Seleccionadas</h3>
            <br />
            {
              fileList.length > 0 && fileList.map((i, index) => {
                return <li className="pb-3 sm:pb-4 w-full list-none" key={index}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-[5px]"
                        src={typeof i === 'string' ? i : URL.createObjectURL(i)} alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {i.name ? i.name : `Imagen ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {bytesToMegaBytes(i.size).toFixed(2) !== 'NaN' ? `${bytesToMegaBytes(i.size).toFixed(2)} MB` : 'Cargado por URL'}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                      </svg>
                    </div>
                  </div>
                </li>
              })
            }
            {
              data.images !== undefined && data.images.length > 0 && data.images.map((i, index) => {
                return <li className="pb-3 sm:pb-4 w-full list-none" key={index}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-[5px]" src={i} alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Imagen {index + 1}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Cargado desde URL
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                      </svg>
                    </div>
                  </div>
                </li>
              })
            }
          </div>







          <div className={`min-h-[450px]  relative flex flex-col justify-center items-center bg-[#00404a] p-5 lg:p-10`}>
            <h3 className='text-white pb-[20px]'>Subir clasificados</h3>
            <form className='relative  w-full flex mb-2 ' onSubmit={handlerEventChange2}>
              <input type="text" className='w-full border-b-[1px] border-gray-500 rounded-[5px] mr-2 text-[12px]' placeholder='Urls' name="images" />
              <button className='block w-[50px] relative cursor-pointer  rounded-bl-[5px] rounded-tr-[5px] transition-all p-[2px] text-[white] text-[12px] bg-[brown] border-[2px] border-[brown]'>add</button>
            </form>
            <form className={`w-full bg-white rounded-[20px] p-5 space-y-5 ${style.formSelectPost}`} onSubmit={formSubmit}>
              <label htmlFor={`${topic}-Post`} className='block relative cursor-pointer min-w-[140px] rounded-[20px] transition-all w-full p-[2px] text-[white] text-[12px] bg-[brown] border-[2px] border-[brown]' >Añadir publicación </label>
              {/* <div className={style.counterBox}>
                <div>
                  <img className={style.previewIMG} style={{ objectPosition: `${data.objectPositionPost ? data.objectPositionPost : 'center'} ` }} src={urlPostImage} alt="" />
                  <p className={`${style.require} ${postImage ? style.green : ''}`}>{postImage ? 'Correcto' : '*Imagen Requerida'}  </p>
                </div>
              </div> */}
              <div className={`w-full ${style.counter}`}> Caracteres: {data.descriptionPost ? data.descriptionPost.length : '0'}</div>
              <input type="file" id={`${topic}-Post`} className={style.inputFile} name={`PostImage`} onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" multiple />
              <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='Titular' name="descriptionPost" onChange={handlerEventChange} maxLength={isCheckedLength ? 65 : ''} />
              {/* <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='Enlace' name="enlacePost" onChange={handlerEventChange} /> */}
              <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='WhatsApp' name="whatsapp" onChange={handlerEventChange} />


              <div className='w-full flex justify-between text-[12px]'>
                <input type="checkbox" onClick={handlerCheckedLength} checked={isCheckedLength} onChange={handlerEventChange} /> Max65
                {/* <input type="radio" value="left" name="objectPositionPost" onChange={handlerEventChange} /> ⇦
                <input type="radio" value="top" name="objectPositionPost" onChange={handlerEventChange} /> ⇧
                <input type="radio" value="center" name="objectPositionPost" onChange={handlerEventChange} /> c
                <input type="radio" value="bottom" name="objectPositionPost" onChange={handlerEventChange} /> ⇩
                <input type="radio" value="right" name="objectPositionPost" onChange={handlerEventChange} /> ⇨ */}
                <input type="checkbox" onClick={handlerChecked} checked={isChecked} /> Init
                <input type="checkbox" onClick={handlerCheckedComp} checked={isCheckedComp} /> Comp
              </div>
              {fileList.length > 0 ? <Button style="buttonMiniSecondary" click={validator}>Guardar</Button> : <Button style="buttonMiniDisable" click={validator}>Guardar</Button>}
            </form>
          </div>












        </div> : ''
      }
    </div>
  )
}








{/* {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && viewPeriodista == false && <>
        <div className='grid grid-cols-3 gap-2'>
          <Tag theme={tag === 'Banners' ? 'Primary': 'Transparent'} click={() => handlerTag('Banners')}>Banners</Tag>
          <Tag theme={tag === 'Modals' ? 'Primary': 'Transparent'} click={() => handlerTag('Modals')}>Modals</Tag>
          <Tag theme={tag === 'Notas' ? 'Primary': 'Transparent'} click={() => handlerTag('Notas')}>Notas</Tag>
        </div>
        {tag === 'Banners' && <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
          <FormAddsC ruteDB={`/${topic}/BannerTop`} ruteSTG='Banners' id={`/${topic}/BannerTop`} title='Añadir Banner Cabecera' />
          <FormAddsC ruteDB={`/${topic}/BannerBottom`} ruteSTG='Banners' id={`/${topic}/BannerBottom`} title='Añadir Banner Pie' />
        </div>}
        {tag === 'Modals' && <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
          <FormAddsC ruteDB={`/${topic}/Modals`} ruteSTG='Modals' id={`/${topic}/Modals`} title='Añadir Modal' />
        </div>}
        {tag === 'Notas' && <div className={`${style.formInputsAdmin} ${style.formInputs}`}>
          <FormAddsC ruteDB={`/${topic}/Notas`} ruteSTG='Notas' id={`/${topic}/Notas`} title='Añadir publicidad' />
        </div>}
      </>} */}



