exports.allAcess = ( req, res)=> {
    res.status(200).send({
        status : true,
        message : "Public Content"
    });
};

exports.userBoard =  (req, res) => {
    res.status(200).send({
        status : true,
        message : "User Content"
    });
};


exports.adminBoard =  (req, res) => {
    res.status(200).send({
        status : true,
        message : "Admin Content"
    });
};

exports.moderatorBoard =  (req, res) => {
    res.status(200).send({
        status : true,
        message : "Moderator Content"
    });
};