import { firebase } from '@firebase/app';
import '@firebase/firestore';

let firebaseApp: any;

const config = {
  apiKey: "AIzaSyA_lf_1eMfFjlUeiSHD5v0ysmjG5TBME4M",
  authDomain: "ml-easycode.firebaseapp.com",
  projectId: "ml-easycode",
  PersistenceEnabled: false,  
};


export const initFirebase = async ():Promise<any> => {
  firebaseApp = await firebase.initializeApp(config);
  firebaseApp.firestore().settings({
    timestampsInSnapshots: true
  })
  return firebaseApp;
}

export const getFirebase = async ():Promise<any> => {
  if(firebaseApp === null) {
    return await initFirebase();
  } else {
    return firebaseApp;
  }
}

export const getFirestore = async () => {
  return firebaseApp.firestore();
}
