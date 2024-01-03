import { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import style from '../components/SpeechToText.module.css'
export default function AnyComponent({ value, setValue }) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        timeout: 10000000,
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    const handlerSpeechText = () => {
        if (isRecording) {
            const res = results.reduce((acc, result) => {
                return acc + result.transcript
            }, '')

            setValue(res)
        }
        console.log('repeat')
    }
    handlerSpeechText()

    return (
        <div className='hidden md:flex w-full items-center'>

            <div className={isRecording && style.spinnerContainer}>
                <div className={isRecording && style.spinner}>
                    <button className={`w-[45px] h-[45px] flex justify-center items-center relative cursor-pointer  rounded-full transition-all  p-[2px] text-[12px] border-[2px] border-[brown] shadow z-50 ${isRecording ? 'bg-[brown]' : 'bg-[transparent]'} ${style.animation}`} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke={isRecording ? 'white' : 'brown'} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                    </button>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className={`bg-white w-full rounded-[10px] ml-[10px] flex items-center ${interimResult && 'px-5 min-h-[45px]'}`}>{interimResult}</div>

        </div>
    );
}












// import React, { useState } from 'react';
// import { useSpeechRecognition } from 'react-speech-kit';

// export default function Example() {
//     const [turnON, setTurnON] = useState(false);
//     const [value, setValue] = useState('');
//     const { listen, listening, stop } = useSpeechRecognition({
//         onResult: (result) => {
//             console.log('active')
//           return  setValue(value + result);
//         },
//     });


//     const handlerMicrophone =()=> {
//         !turnON === true
//         ? listen()
//         : stop()
//         setTurnON(!turnON)
//     }
//     return (
//         <div className='flex w-full'>
//             <textarea
//                 className='w-full'
//                 value={value}
//                 onChange={(event) => setValue(event.target.value)}
//             />
//             <button className={`w-[45px] h-[45px] flex justify-center items-center relative cursor-pointer  rounded-full transition-all  p-[2px] text-[12px] border-[2px] border-[brown] shadow ${turnON ? 'bg-[brown]' : 'bg-[transparent]'}`} onClick={handlerMicrophone}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke={turnON ? 'white' : 'brown'} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
//             </button>
//             {/* <Button theme="buttonMiniSecondary" click={isRecording ? stopSpeechToText : startSpeechToText}>
//                  {isRecording ? 'Te escucho... / Parar ?' : 'Dictar Nota a Voz'}
//                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
//              </Button> */}
//             {/* {listening && <div>Go ahead I'm listening</div>} */}
//         </div>
//     );
// }









