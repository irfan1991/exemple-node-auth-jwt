module.exports = app => {
    const artilce = require("../controllers/article.controller.js");

    var router =  require("express").Router();

    //create
    router.post("/", artilce.create);

    //retrieve all
    router.get("/",artilce.findAll);

    //retrieve all published 
    router.get("/published", artilce.findAllPublished);

    //retrieve a single article
    router.get("/:id", artilce.findOne);

    //update
    router.put("/:id", artilce.update);

    //delete by id 
    router.delete("/:id", artilce.delete);

    //delete all
    router.delete("/", artilce.deleteAll);

    app.use('/api/article', router);
};