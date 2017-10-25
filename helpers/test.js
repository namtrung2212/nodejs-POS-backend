var OTP = require('otp');

var otp = OTP({
    secret : "trung"
});

console.log(otp.hotp(4));
console.log(otp.totp());