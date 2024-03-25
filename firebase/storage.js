import { app } from './config'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { writeUserData } from './utils'

import imageCompression from 'browser-image-compression';

const storage = getStorage(app)

//--------------------------- Firebase Storage ---------------------------
async function uploadIMG(ruteDB, ruteSTG, fileName, file, setUserSuccess, monthAndYear, compresse, multiple) {
    const imagesRef = ref(storage, `/${ruteSTG}/${fileName}`);



    let newRuteDB = `/${ruteDB}/${fileName}`
    const options = {
        maxWidthOrHeight: 500,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300,
        fileType: 'image/webp'
    }
    const compressedFile = file.type != 'image/gif' && compresse == true ? await imageCompression(file, options) : file

    if (multiple == true) {

        file.map((f, index) => {
            uploadBytes(ref(storage, `/${ruteSTG}/${index}`), f).then(async (snapshot) => {
                getDownloadURL(ref(storage, snapshot.metadata.fullPath))
                    .then((url) => {
                        let obj = {
                            url,
                        }
                        return writeUserData(`${newRuteDB}/${index}`, obj)
                    })
                    .catch((error) => {
                    });
            });
        })
        return
    }


    uploadBytes(imagesRef, compressedFile).then(async (snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
            .then((url) => {
                let obj = {
                    url,
                }

                return writeUserData(newRuteDB, obj)
            })
            .catch((error) => {
            });
    });
}

let object = {}
export { uploadIMG }
