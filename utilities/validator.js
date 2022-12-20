const {check,validationResult} = require('express-validator');

const titleValidator = [
    check('title').trim().not().isEmpty().withMessage('Title is Required')
]

const validate = (req,res,next) => {

    const error = validationResult(req).array();

    if(error.length){
        res.send(error[0].msg);
    }

    next();
}

module.exports = {
    titleValidator,
    validate
}