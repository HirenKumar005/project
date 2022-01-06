const { Contact } = require('../models/contactus');
const { Testimonial } = require('../models/testimonial');
const { validateAddContact } = require('../validation/contactValidate')
exports.contactus = async (req, res) => {
    const contact = await Contact.find();
    res.render('contactus', {
        values: contact
    });

};
exports.newcontact = async (req, res) => {

    res.render('newcontact', {
        values: ''
    });

};
exports.addcontact = async (req, res) => {
    try {
        const { error } = validateAddContact(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.status(400).render('newcontact', {
                    error1: err1,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'email') {
                var err2 = error.details[0].message;
                return res.status(400).render('newcontact', {
                    error2: err2,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'number') {
                var err3 = error.details[0].message;
                return res.status(400).render('newcontact', {
                    error3: err3,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'message') {
                var err4 = error.details[0].message;
                return res.status(400).render('newcontact', {
                    error4: err4,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'date') {
                var err5 = error.details[0].message;
                return res.status(400).render('newcontact', {
                    error5: err5,
                    values: req.body
                })
            }

        }
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            message: req.body.message,
            date: req.body.date
        });
        await contact.save();
        res.redirect('/contactus');
    } catch (error) {
        console.error(error);
    }


};
exports.editcontact = async (req, res) => {
    try {
        let id = req.params.id;
        let contact = await Contact.findById(id);
        res.render('editcontact', {
            values: contact
        });
    }
    catch (error) {
        console.error(error);
    }

};
exports.updatecontact = async (req, res) => {

    try {

        let id = req.params.id;
        await Contact.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            message: req.body.message,
            date: req.body.date
        });
        res.redirect('/contactus');
    } catch (error) {
        console.error(error);
    }

}
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Contact.findByIdAndRemove(id)
        res.redirect('/contactus');
    } catch (error) {
        console.error(error);
    }
}
exports.multipleDeletecontact = (req, res) => {
    try {
        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            Contact.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    console.error(err);
            });

        }
        res.redirect('/contactus');
    } catch (error) {
        console.error(error);
    }
}