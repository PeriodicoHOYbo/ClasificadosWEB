import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import style from './Select.module.css'
import { useUser } from '../context/Context.js'

export default function Select({ arr, name, click, defaultValue, uuid, focus }) {
    const { setFilterDis, user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart, modal, setModal, setFilter, success } = useUser()

    const router = useRouter()

    const [select, setSelect] = useState(false)
    const [state, setState] = useState(arr[0])

    function handlerSelect() {
        setSelect(!select)
    }

    function handlerUserState(name, i) {
        setState(i)
        click(i)
    }
useEffect(()=>{
    focus === false && setState(arr[0])
},[focus])

    return (

        <div className={`relative text-gray-900 text-[14px] focus:ring-blue-500 focus:border-blue-500 block w-full  p-0 z-50`} onClick={handlerSelect}>
            <div className={`w-[100%]  text-gray-700 text-[14px] text-center font-medium px-2.5 py-0.5 my-1 rounded-2xl border border-gray-700 shadow-md ${focus ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
                {state.title} 
                <span className={select ? 'font-semibold absolute top-3 right-5 rotate-[270deg]' : 'font-semibold absolute top-3 right-5 rotate-90'}>{'>'}</span>
            </div>
            <ul className={select ? `py-3 absolute h-[100px] overflow-y-auto  left-0 top-9 bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full z-50` : 'hidden'} >
                {
                    arr.map((i, index) => <li key={i.id} className={`mb-2 cursor-pointer py-0 px-3 font-semibold ${index % 2 === 0 ? 'bg-gray-100' : ''}`} onClick={() => handlerUserState(name, i)}>{i.title}</li>)
                }
            </ul>
        </div>
    )
}