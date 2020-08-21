var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'havalakm1@gmail.com',
        pass: '******'
    }
});
var mailOptions ={
    from:'havalakm1@gmail.com',
    to:'havalakm@gmail.com',
    subject:'Products updates',
    text:'Products list $(data)'
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }    else{
            console.log('Email sent:'+ info.response);
        } 
});
