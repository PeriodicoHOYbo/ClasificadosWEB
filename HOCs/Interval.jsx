


import { useState, useEffect, useRef } from "react";

const delay = 1;

export default function App() {
  const [counter, setCounter] = useState(0);
  const timer = useRef(null); // we can save timer in useRef and pass it to child

  useEffect(() => {
    // useRef value stored in .current property
    timer.current = setInterval(() => setCounter((v) => v + 1), delay * 1000);

    // clear on component unmount
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div>
      <div>Interval is working, counter is: {counter}</div>
      <Child counter={counter} currentTimer={timer.current} />
    </div>
  );
}

function Child({ counter, currentTimer }) {
    // this will clearInterval in parent component after counter gets to 5
    useEffect(() => {
      if (counter < 5) return;
  
      clearInterval(currentTimer);
    }, [counter, currentTimer]);
  
    return null;
  }


// let interval
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// const setUserModalsInterval = (userDB, zoomIMG, setZoomIMG, setBgOpacity, time) => {
//     console.log(zoomIMG !== undefined && zoomIMG.lateral)
//     interval = setTimeout(() => {
//         console.log(zoomIMG)
//         if (userDB && userDB !== undefined && Object.values(userDB['Inicio']['Modals'])[0]) {
//             setZoomIMG(Object.values(userDB['Inicio']['Modals'])[getRandomInt(userDB['Inicio']['Modals'] && Object.values(userDB['Inicio']['Modals']).length)])
//             setBgOpacity(true)
//         }
//     }, time)

//     return () => {
//         clearTimeout(interval)
//     }
// }
// const clearUserModalsInterval = () => {
//     return () => {
//         clearTimeout(interval)
//     }
// }

export { setUserModalsInterval, clearUserModalsInterval }