import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkMz1Cxk-ElfEPnz_0_7kum1eXPrAgd-Y",
  authDomain: "react-chat-app-603f7.firebaseapp.com",
  databaseURL: "https://react-chat-app-603f7.firebaseio.com",
  projectId: "react-chat-app-603f7",
  storageBucket: "react-chat-app-603f7.appspot.com",
  messagingSenderId: "903059309798",
  appId: "1:903059309798:web:874fff498fac18fe"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };