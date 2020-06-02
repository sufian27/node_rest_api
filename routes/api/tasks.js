const express = require('express');
const Task = require('../../database/models').Task;
const User = require('../../database/models').User;
const { Op } = require('sequelize');

const router = express.Router();

/**
 * @route       GET API/tasks
 * @description gets all tasks
 * @access      Public
 */
router.get('/', async (req, res) => {
    try {
        //make score_gt and score_lt, assuming lowest score is 0 and highest is 20
        //assignee_name, assignee_surname, assignee_id
        //assigner_name, assigner_surname, assigner_id
        var { 
            score_gt = -1,
            score_lt = 21, 
            assignee_name = null,
            assignee_surname = null,
            assignee_user_id = null,
            assigner_name = null,
            assigner_surname = null,
            assigner_user_id = null,
            page=1, 
            limit=10,
            ...query
        } = req.query;

        if (!('score' in query)) {
            var score = {
                [Op.gt]: score_gt,
                [Op.lt]: score_lt
            }
        } else {
            var { score, ...query } = query;
        }
        query = {...query, score}; //adding score to query

        
        const queryFromUsers = {
            assignee_name,
            assignee_surname,
            assignee_user_id,
            assigner_name,
            assigner_surname,
            assigner_user_id
        };

        var queryAssignees={};
        var queryAssigners={};
        for (key in queryFromUsers) {
            console.log(queryFromUsers[key])
            if (queryFromUsers[key] != null) {
                const keyArray = key.split('_');
                if (keyArray[2]) {
                    var k = keyArray[1]+'_'+keyArray[2];
                } else {
                    var k = keyArray[1];
                }
                switch(keyArray[0]) {
                    case 'assignee':
                        queryAssignees = {...queryAssignees, [k]:queryFromUsers[key]};
                        break;
                    case 'assigner':
                        queryAssigners = {...queryAssigners, [k]:queryFromUsers[key]};
                        break;
                    default:
                        break;
                }
            }
        }

        const tasks = await Task.findAndCountAll({
            where: query,
            include: [{
                model: User,
                as: 'assigner',
                where: queryAssigners 
            },{
                model: User,
                as: 'assignee',
                where: queryAssignees 
            }],
            offset: (page-1)*limit,
            limit
        });
        return res.status(200).send({
            tasks
        });
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
});

/**
 * @route       POST API/tasks
 * @description adds a task to the database
 * @access      Public
 */
router.post('/', async (req, res) => {
    try {
        const { name, description, score, status, assignee_id, user_id, project_id } = req.body;
        const task = await Task.create({
            name,
            description,
            score,
            status,
            assignee_id,
            user_id,
            project_id
        });
        res.status(200).send({
            task
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

module.exports = router;