const { Category } = require('../models/category');
const { validateAddcategory } = require('../validation/categoryValidate')

exports.data = async (req, res) => {
    const category = await Category.find();
    res.render('category', {
        values: category
    });

};
exports.newCategory = (req, res) => {
    res.render('newCategory', {
        values: req.body
    });

};
exports.addCategory = async (req, res) => {
    try {
        const { error } = validateAddcategory(req.body);
        if (error) {
            if (error.details[0].context.key == 'category') {
                var err1 = error.details[0].message;
                return res.status(400).render('newCategory', {
                    error1: err1,
                    values: req.body
                })
            }
        }
        let category = await Category.findOne({ category: req.body.category });
        if (category) {
            return res.status(400).render('newCategory', {
                error10: 'Category is already Add',
                values: req.body
            })
        }
        category = new Category({
            category: req.body.category,
        });
        await category.save();
        res.redirect('/category');


    }
    catch (error) {
        console.error(error);
    }

}
exports.editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await Category.findById(id);
        res.render('editCategory', {
            values: category
        });
    }
    catch (error) {
        console.error(error);
    }

};
exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        await Category.findByIdAndUpdate(id, {
            category: req.body.category
        });
        res.redirect('/category');
    } catch (error) {
        console.error(error);
    }

}
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Category.findByIdAndRemove(id)
        res.redirect('/category');
    } catch (error) {
        console.error(error);
    }
}

exports.multipleDelete = (req, res) => {
    try {
        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            Category.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    console.error(err);
            });

        }
        res.redirect('/category');
    } catch (error) {
        console.error(error);
    }
}

