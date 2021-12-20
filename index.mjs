import nodemailer,{createTransport} from "nodemailer";
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,query,orderByChild,onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCob5ojiT0zUlC9wh9OKnaRT0PjaOcjHA",
  authDomain: "quizzine-vssut-ae280.firebaseapp.com",
  databaseURL: "https://quizzine-vssut-ae280-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quizzine-vssut-ae280",
  storageBucket: "quizzine-vssut-ae280.appspot.com",
  messagingSenderId: "753234684975",
  appId: "1:753234684975:web:1f247b363295e5d211aada",
  measurementId: "G-JFNVNPJ8QW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quizzinenewsletter@gmail.com',
    pass: 'quizzinenewsletter12345'
  }
});



var tcliref = query(ref(db,'email/'),orderByChild("email"))
  function getEmail(tcliref){
    return new Promise((resolve, reject)=>{
      onValue(tcliref, (snapshot) => {
        resolve(snapshot)
      })
    })
  
}

getEmail(tcliref).then((snapshot) => {
 console.log("finished")
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    console.log(childData.email)
    passEm(childData.email);
  })
})

  


function passEm(email){

    var mailOptions = {
      from: 'quizzinenewsletter@gmail.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      html: '<h1>Welcome</h1><p>That was easy!</p>'
    };
   
   passOp(mailOptions)

}


function passOp(mailOptions){
 
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        
      }
  
  })

}