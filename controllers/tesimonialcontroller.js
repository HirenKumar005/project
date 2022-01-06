const { Testimonial } = require('../models/testimonial');
const { validateAddTestimonial } = require('../validation/testimonialValidate')
exports.testimonialdata = async (req, res) => {
    const testimonial = await Testimonial.find();
    res.render('testimonial', {
        values: testimonial
    });

};
exports.newtestimonial = async (req, res) => {

    res.render('newtestimonial', {
        values: ''
    });

};
exports.addtestimonial = async (req, res) => {
    try {

        const { error } = validateAddTestimonial(req.body);

        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.status(400).render('newtestimonial', {
                    error1: err1,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'designation') {
                var err2 = error.details[0].message;
                return res.status(400).render('newtestimonial', {
                    error2: err2,
                    values: req.body
                })
            }
            if (error.details[0].context.key == 'description') {
                var err3 = error.details[0].message;
                return res.status(400).render('newtestimonial', {
                    error3: err3,
                    values: req.body
                })
            }

        }
        let testimonial = new Testimonial({
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
            profile: req.file.filename
        });
        await testimonial.save();
        res.redirect('/testimonial');
    }
    catch (error) {
        console.error(error);
    }


};
exports.edittestimonial = async (req, res) => {
    try {
        let id = req.params.id;
        let testimonial = await Testimonial.findById(id);
        res.render('edittestimonial', {
            values: testimonial
        });
    }
    catch (error) {
        console.error(error);
    }

};
exports.updatetestimonial = async (req, res) => {
    try {

        let id = req.params.id;
        const update = await Testimonial.findByIdAndUpdate(id, {
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
        });
        console.log(update);
        if (req.file) {
            await Testimonial.findOneAndUpdate(id, {
                profile: req.file.filename
            });
        }
        res.redirect('/testimonial');
    } catch (error) {
        console.error(error);
    }

}
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Testimonial.findByIdAndRemove(id)
        res.redirect('/testimonial');
    } catch (error) {
        console.error(error);
    }
}

exports.multipleDelete = (req, res) => {
    try {
        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            Testimonial.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    console.error(err);
            });

        }
        res.redirect('/testimonial');
    } catch (error) {
        console.error(error);
    }
}

