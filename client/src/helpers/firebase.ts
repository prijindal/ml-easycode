import '@firebase/firestore';
import * as firebase from 'firebase';

let firebaseApp:firebase.app.App;

const config = {
  apiKey: "AIzaSyA_lf_1eMfFjlUeiSHD5v0ysmjG5TBME4M",
  authDomain: "ml-easycode.firebaseapp.com",
  projectId: "ml-easycode",
  PersistenceEnabled: false,  
};


export const initFirebase = async ():Promise<firebase.app.App> => {
  firebaseApp = await firebase.initializeApp(config);
  firebaseApp.firestore().settings({
    timestampsInSnapshots: true
  })
  return firebaseApp;
}

export const getFirebase = async ():Promise<firebase.app.App> => {
  if(firebaseApp === null) {
    return await initFirebase();
  } else {
    return firebaseApp;
  }
}

export const getFirestore = async () => {
  return firebaseApp.firestore();
}
