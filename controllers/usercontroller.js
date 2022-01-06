const { validateUserRegister, validateUserloging, validateResetPassword, validateUpdateProfile, validateReset } = require('../validation/uservalidate');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { OTPsend } = require('../services/mail');
const { values } = require('lodash');
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);
exports.loging = (req, res) => {
    res.render('login', {
        values: req.body
    });

};
exports.register = (req, res) => {
    res.render('register', {
        values: req.body
    });
}
exports.auth = async (req, res) => {
    const { error } = validateUserloging(req.body);
    if (error) {
        if (error.details[0].context.key == 'email') {
            var err3 = error.details[0].message;
            return res.status(400).render('login', {
                error3: err3,
                values: req.body
            })
        }
        if (error.details[0].context.key == 'password') {
            var err5 = error.details[0].message;
            return res.status(400).render('login', {
                error5: err5,
                values: req.body
            })
        }
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).render('login', {
            error1: 'User Not Found',
            values: req.body
        })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).render('login', {
            error1: 'Invalid Username Or Password',
            values: req.body
        })
    }

    res.redirect('/dashboard');
}

exports.signup = async (req, res, next) => {
    try {
        const { error } = validateUserRegister(req.body);
        if (error) {
            if (error.details[0].context.key == 'first_name') {
                var err1 = error.details[0].message;
                return res.status(400).render('register', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == 'last_name') {
                var err2 = error.details[0].message;
                return res.status(400).render('register', {
                    error2: err2,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'email') {
                var err3 = error.details[0].message;
                return res.status(400).render('register', {
                    error3: err3,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'phone') {
                var err4 = error.details[0].message;
                return res.status(400).render('register', {
                    error4: err4,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'password') {
                var err5 = error.details[0].message;
                return res.status(400).render('register', {
                    error5: err5,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'repassword') {
                var err6 = error.details[0].message;
                return res.status(400).render('register', {
                    error6: err6,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'gender') {
                var err7 = error.details[0].message;
                return res.status(400).render('register', {
                    error7: err7,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'country') {
                var err8 = error.details[0].message;
                return res.status(400).render('register', {
                    error8: err8,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'hobbies') {
                var err9 = error.details[0].message;
                return res.status(400).render('register', {
                    error9: err9,
                    values: req.body
                })
            }
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).render('register', {
                error10: 'User is alredy Registered',
                values: req.body
            })
        }

        user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            profile: req.file.filename,
            gender: req.body.gender,
            country: req.body.country,
            hobbies: req.body.hobbies

        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.redirect('/');

    }
    catch (err) {
        console.error("err", err)

    }
}
exports.forgot = (req, res) => {
    res.render('forgot');
}
exports.verifyemail = async (req, res) => {
    const { error } = validateUserloging(req.body);
    if (error) {
        if (error.details[0].context.key == 'email') {
            var err3 = error.details[0].message;
            return res.status(400).render('forgot', {
                error3: err3,
                values: req.body
            })
        }
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).render('forgot', {
            error1: 'User Not Found',
            values: req.body
        })
    }
    else {
        OTPsend(req.body.email, otp);
        res.render('verifyOtp', {
            email: req.body.email
        });
    }
}
exports.verifyotp = async (req, res) => {
    if (otp == req.body.otp) {
        res.render('resetPassword')
    }
    else {
        res.status(400).render('verifyOtp', {
            error1: 'OTP IS INCORRECT ',
            values: req.body
        });
    }
}
exports.resetpassword = async (req, res) => {
    const { error } = validateResetPassword(req.body);
    if (error) {
        if (error.details[0].context.key == 'password') {
            var err5 = error.details[0].message;
            return res.status(400).render('resetPassword', {
                error5: err5,
                values: req.body
            })
        }
        if (error.details[0].context.key == 'repassword') {
            var err6 = error.details[0].message;
            return res.status(400).render('resetPassword', {
                error6: err6,
                values: req.body
            })
        }
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const updatePassword1 = { password: encryptedPassword };
    User.updateOne({ otp: otp }, updatePassword1, async (err, response) => {
        console.log(response);
        if (err) throw err;
        res.redirect('/');
    });

}
exports.dashboard = (req, res) => {
    res.render('dashboard', {
        values: req.body
    });

};
exports.viewprofile = async (req, res) => {
    const email = req.user.email;

    const user = await User.findOne({ email: email }).select('-password');
    try {
        if (user) {
            res.render('viewprofile', {
                values: user
            });
        }
    }
    catch (error) {
        console.error(error);
    }

}
exports.updateProfile = async (req, res) => {
    const email = req.user.email;

    const user = await User.findOne({ email: email }).select('-password');
    try {
        if (user) {
            res.render('updateProfile', {
                values: user
            });
        }
    }
    catch (error) {
        console.error(error);
    }

}
exports.update = async (req, res) => {
    try {
        console.log(req.body.hobbies);
        const { error } = validateUpdateProfile(req.body);

        if (error) {
            if (error.details[0].context.key == 'first_name') {
                var err1 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == 'last_name') {
                var err2 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error2: err2,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'email') {
                var err3 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error3: err3,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'phone') {
                var err4 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error4: err4,
                    values: req.body
                })
            }

            if (error.details[0].context.key == 'gender') {
                var err7 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error7: err7,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'country') {
                var err8 = error.details[0].message;
                return res.status(400).render('register', {
                    error8: err8,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'hobbies') {
                var err9 = error.details[0].message;
                return res.status(400).render('updateProfile', {
                    error9: err9,
                    values: req.body
                })
            }
        }
        const email = req.user.email;
        let updateuser = await User.findOneAndUpdate({ email: email }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            gender: req.body.gender,
            country: req.body.country,
            hobbies: req.body.hobbies
        });
        if (req.file) {
            updateuser = await User.findOneAndUpdate({ email: email }, {
                profile: req.file.filename
            });
        }
        if (updateuser)
            res.render('updateProfile', {
                success: "User Profile is Updated",
                values: req.body
            })

    } catch (error) {
        console.error(error);
    }

}
exports.updatePassword = (req, res) => {
    res.render('updatePassword', {
        values: req.body
    });

};
exports.updatePass = async (req, res) => {
    const { error } = validateReset(req.body);
    if (error) {
        if (error.details[0].context.key == 'oldPassword') {
            var err1 = error.details[0].message;
            return res.status(400).render('updatePassword', {
                error1: err1,
                values: req.body
            })
        }
        if (error.details[0].context.key == 'newPassword') {
            var err5 = error.details[0].message;
            return res.status(400).render('updatePassword', {
                error5: err5,
                values: req.body
            })
        }
        if (error.details[0].context.key == 'repassword') {
            var err6 = error.details[0].message;
            return res.status(400).render('updatePassword', {
                error6: err6,
                values: req.body
            })
        }
    }
    const email = req.user.email;

    const user = await User.findOne({ email: email });
    if (user) {
        const comparision = await bcrypt.compare(req.body.oldPassword, user.password);

        if (comparision) {
            const encryptedPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
            const updatePassword = { password: encryptedPassword };
            const updateUser = User.updateOne({ email: email }, updatePassword, async (err, response) => {
                console.log(response);
                if (err) throw err;

            });
            if (updateUser) {
                return res.render('updatePassword', {
                    success: "Your Password has been Reset"
                });
            } else {
                return res.render('updatePassword', {
                    error: "Your Password has not been Reset"
                });
            }
        } else {
            return res.render('updatePassword', {
                error: "Current Password is incorrect",
            });
        }
    }

}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
};
