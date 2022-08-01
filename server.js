function smail(email2, name)

{const nodemailer=require('nodemailer');
let mailOptions = {
    from: "tejoravivarma07@gmail.com",
    to: email2,
    subject: "Thanks for your Feedback",
    text: "Dear "+name+", Thank you for your feedback! \n\nTejo Ravi Varma Thotakura  \n https://newappfeedback1.herokuapp.com/"
};


let transporter = nodemailer.createTransport({
    service:'gmail',
auth: {
    user: "tejoravivarma07@gmail.com",
    pass: "sslavnavbbhlrdvw"
}
})
.sendMail(mailOptions, (error, info) => {
    if (error) {
 console.log(error.message);
}
else{
console.log('Email sent to user');}
});
return ;
}
module.exports= { smail };