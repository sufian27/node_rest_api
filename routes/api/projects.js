const express = require('express');
const Project = require('../../database/models').Project;
const User = require('../../database/models').User;
const Task = require('../../database/models').Task;
const { Op } = require('sequelize');

const router = express.Router();

/**
 * @route       GET API/projects
 * @description gets all projects
 * @access      Public
 */
router.get('/', async (req, res) => {
    try {
        //name, body, status is in Project table
        //score needs to be taken from Task
        //assignee has to be taken from User from Task, im assuming that all task assignees which are associated 
        //with a single project are assignees of that project
        var {
            score_gt = -1,
            score_lt = 21, 
            assignee_name = null,
            assignee_surname = null,
            assignee_user_id = null,
            assigner_name = null,
            assigner_surname = null,
            assigner_user_id = null,
            ...query
        } = req.query;

        var taskQuery={};
        if (!('score' in query)) { //if score key isnt in query
            var score = {
                [Op.gt]: score_gt,
                [Op.lt]: score_lt
            };
        } else {
            var { score, ...query } = query;
        }
        taskQuery = {...taskQuery, score};

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

        const projects = await Project.findAndCountAll({
            where: query,
            include: [{
                model: Task,
                as: 'tasks',
                where: taskQuery,
                include: [{
                    model: User,
                    as: 'assigner',
                    where: queryAssigners 
                },{
                    model: User,
                    as: 'assignee',
                    where: queryAssignees 
                }]
            }]
        });
        return res.status(200).send({
            projects
        });
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
});

/**
 * @route       POST API/projects
 * @description adds a project to the database
 * @access      Public
 */
router.post('/', async (req, res) => {
    try {
        const { name, body, status, user_id } = req.body;
        const project = await Project.create({
            name,
            body,
            status,
            user_id
        });
        res.status(200).send({
            project
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

module.exports = router;