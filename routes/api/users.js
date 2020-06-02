const express = require('express');
const User = require('../../database/models').User;

const router = express.Router();

/**
 * @route       GET API/users
 * @description gets all users
 * @access      Public
 */
router.get('/', async (req, res) => {
    try {
        const { page=1, limit=10, ...queries } = req.query; //setting the default limit of 10
        const users = await User.findAndCountAll({
            where: queries,
            offset: (page-1)*limit,
            limit
        });
        return res.status(200).send({
            users
        });
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
});

/**
 * @route       POST API/users
 * @description adds a user to the database
 * @access      Public
 */
router.post('/', async (req, res) => {
    try {
        const { email, name, surname } = req.body;
        const user = await User.create({
            email,
            name, 
            surname
        });
        res.status(200).send({
            user
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

module.exports = router;