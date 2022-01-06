const { Category } = require('../models/category');
const { Portfolio } = require('../models/portfolio')
const { validateAddPortfolio } = require('../validation/portfolioValidate')

exports.portfoliodata = async (req, res) => {
    const portfolio = await Portfolio.find().populate('project_category');

    res.render('portfolio', {
        values: portfolio
    });

};
exports.newportfolio = async (req, res) => {
    const category = await Category.find();
    res.render('newportfolio', {
        values: 'req.body',
        categories: category
    })

};
exports.addportfolio = async (req, res) => {

    const category = await Category.find();
    try {
        const { error } = validateAddPortfolio(req.body);

        if (error) {

            if (error.details[0].context.key == 'porject_name') {

                var err2 = error.details[0].message;
                return res.status(400).render('newportfolio', {
                    error2: err2,
                    values: req.body,
                    categories: category


                })
            }
            if (error.details[0].context.key == 'porject_title') {

                var err4 = error.details[0].message;
                return res.status(400).render('newportfolio', {
                    error4: err4,
                    values: req.body,
                    categories: category


                })
            }
            if (error.details[0].context.key == 'porject_date') {

                var err5 = error.details[0].message;
                return res.status(400).render('newportfolio', {
                    error5: err5,
                    values: req.body,
                    categories: category


                })
            }
            if (error.details[0].context.key == 'description') {

                var err6 = error.details[0].message;
                return res.status(400).render('newportfolio', {
                    error6: err6,
                    values: req.body,
                    categories: category


                })
            }
        }
        const multipleimg = req.files.map((multipleimg) => multipleimg.filename)
        let portfolio = new Portfolio({
            project_category: req.body.project_category,
            porject_name: req.body.porject_name,
            profile: multipleimg,
            porject_title: req.body.porject_title,
            porject_date: req.body.porject_date,
            description: req.body.description,
        });
        await portfolio.save();
        res.redirect('/portfolio');
    }
    catch (error) {
        console.error(error);
    }


};
exports.editportfolio = async (req, res) => {
    try {
        let id = req.params.id;
        const category = await Category.find();
        let portfolio = await Portfolio.findById(id);
        res.render('editportfolio', {
            values: portfolio,
            categories: category
        });
    }
    catch (error) {
        console.error(error);
    }

};
exports.updateportfolio = async (req, res) => {
    try {

        let id = req.params.id;
        await Portfolio.findByIdAndUpdate(id, {
            project_category: req.body.project_category,
            porject_name: req.body.porject_name,
            porject_title: req.body.porject_title,
            porject_date: req.body.porject_date,
            description: req.body.description,
        });
        if (req.files) {
            const multipleimg = req.files.map((multipleimg) => multipleimg.filename)
            await Portfolio.findOneAndUpdate(id, {
                profile: multipleimg,
            });
            console.log('errror');
        }
        res.redirect('/portfolio');
    } catch (error) {
        console.error(error);
    }



};
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Portfolio.findByIdAndRemove(id)
        res.redirect('/portfolio');
    } catch (error) {
        console.error(error);
    }
}
exports.multipleDelete = (req, res) => {
    try {
        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            Portfolio.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    console.error(err);
            });

        }
        res.redirect('/portfolio');
    } catch (error) {
        console.error(error);
    }
}

