const db = require("../models");
const Article =db.articles;
const Op = db.Sequelize.Op;


//create and save
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            status : false,
            message : "Cannot be empty !"
        });

        return;
    }

    //create object field
    const article = {
        title :  req.body.title,
        description : req.body.description,
        published: req.body.published ? req.body.published : false,
        userId : req.body.userId
    };

    //save
    Article.create(article)
    .then(
        data => {

            res.send(data);
        })
    .catch(err => {
            res.status(500).send({
                status: false,
                message : err.message || "something error while creating data"
        });
    });

};


// retrieve all 
exports.findAll = (req, res) => {
    const title =  req.query.title;
    var condition = title ? {title : {[Op.like] : `%${title}%`}} :  null;

    Article.findAll({where : condition})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            status : false,
            message : err.message || "something error while retrieving data"
        });
    });
};

//find a single
exports.findOne =  (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            status:false,
            message : err.message || "something error while retrieving data with id = "+id
        });
    });

};

//update data
exports.update =  (req, res) => {
    const id = req.params.id;

    Article.update(req.body,{
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Article was updated successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot update Article with id= ${id}. 
                Maybe article was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error updating Article with id = ${id}`
        });
    })
};

// delete single 
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Article was deleted successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot delete Article with id= ${id}. 
                Maybe article was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error deleting Article with id = ${id}`
        });
    })
};

// delete all 
exports.deleteAll =  (req, res) => {
    Article.destroy({
        where : {},
        truncate : false
    })
    .then(nums => {
        res.send({
            status : true,
            message : `${nums} Articles were deleted successfully`
        });

    })
    .catch(err => {
        res.status(500).send({
            status :false,
            message : err.message || `Some error occured while removing all articless`
        });
    });
};

//find all published
exports.findAllPublished = (req, res) => {
    Article.findAll({where : {published :  true}})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message :  err.message ||  `Some error occured while removing all articles`
        });
    });
};