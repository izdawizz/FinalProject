
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC_XrmzAzUB6vafeETKb2Yfqu1qf9wMlPQ',
    authDomain: 'your-auth-domain-b1234.firebaseapp.com',
    databaseURL: 'https://savvy-concord-307106-default-rtdb.firebaseio.com',
    projectId: 'savvy-concord-307106',
    storageBucket: 'gs://savvy-concord-307106.appspot.com',
    messagingSenderId: '784862411678',
    appId: '1:784862411678:android:025067f9eee2c57594f48f',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };