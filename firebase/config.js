import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyD_8KYqb4XCzzxRFbLejvpxkilgqB6GBD4",
  authDomain: "periodico-hoy-clasificados-db.firebaseapp.com",
  databaseURL: "https://periodico-hoy-clasificados-db-default-rtdb.firebaseio.com",
  projectId: "periodico-hoy-clasificados-db",
  storageBucket: "periodico-hoy-clasificados-db.appspot.com",
  messagingSenderId: "440112604201",
  appId: "1:440112604201:web:01eef7c3dca3715e9ba838"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDF5JudBkhp8lAR2Sof3Dm7s_80pBwjxeU",
//   authDomain: "periodico-hoy-db.firebaseapp.com",
//   databaseURL: "https://periodico-hoy-db-default-rtdb.firebaseio.com",
//   projectId: "periodico-hoy-db",
//   storageBucket: "periodico-hoy-db.appspot.com",
//   messagingSenderId: "758100973171",
//   appId: "1:758100973171:web:7b1ffde4c754288204fc06"
// };



export const app = initializeApp(firebaseConfig)
