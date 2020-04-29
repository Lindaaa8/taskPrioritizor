var express = require('express')

var router = express.Router()

/* get all tasks */
router.get('/api/get/tasks', (req, res, next) => {
    pool.query("SELECT * FROM tasks ORDER BY date_created DESC", (q_err, q_res) => {
        res.json(q_res.rows)
    })
})

/* add a task */
router.post('/api/post/taskstodb', (req, res, next) => {
    const values = [
        req.body.project_name, 
        res.body.user_id, 
        req.body.task_owner, 
        req.body.taskname, 
        req.body.task_description, 
        req.body.date_created,
        req.body.date_end,
        req.body.expected_duration,
        req.body.actual_duration,
        req.body.complexity_level
     ]
    pool.query(`INSERT INTO tasks(project_name, user_id, task_owner, taskname, task_description, date_created, date_end, expected_duration, actual_duration, complexity_level)
    VALUES($1,$2,$3,$4,$5, NOW(),$7,$8,$9,$10)`, values, (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res.rows)
    })
})

/* update a task */
router.put('/api/put/taskstodb', (req, res, next) => {
    const values = [
        res.body.task_id,
        req.body.project_name, 
        res.body.user_id, 
        req.body.task_owner, 
        req.body.taskname, 
        req.body.task_description,
        req.body.date_end,
        req.body.expected_duration,
        req.body.actual_duration,
        req.body.complexity_level
     ]
    pool.query(`UPDATE tasks SET project_name=$2, user_id=$3, task_owner=$4, taskname=$5, task_description=$6, date_end=NOW(), expected_duration=$6, actual_duration=$8, complexity_level=$9
    WHERE pid = $1`, values, (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    })
})

/* delete a task by name */
router.delete('api/delete/tasks', (req, res, next) => {
    const task_name = req.body.task_name
    pool.query(`DELETE FROM tasks WHERE tasknameß = $1`, [task_name], 
    (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    })
})

/* delete all tasks of a project */
router.delete('api/delete/tasks', (req, res, next) => {
    const project_name = req.body.project_name
    pool.query(`DELETE FROM tasks WHERE project_name = $1`, [project_name], 
    (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    })
})

/* add a project */
router.post('/api/post/project', (req, res, next) => {
    const values = [
        res.body.user_id, 
        res.body.project_owner,
        req.body.pname, 
        req.body.duration,
        req.body.complete
     ]
    pool.query(`INSERT INTO project(user_id, project_owner, pname, duration, date_created, complete)
    VALUES($1,$2,$3,$4, NOW(),$5)`, values, (q_err, q_res) => {
        if(q_err) return next(q_err);
        res.json(q_res.rows)
    })
})

/* update a project */
router.put('/api/put/project', (req, res, next) => {
    const values = [
        res.body.pid,
        res.body.user_id, 
        res.body.project_owner,
        req.body.pname, 
        req.body.duration,
        req.body.complete
     ]
    pool.query(`UPDATE project SET user_id=$2, project_owner=$3, pname=$4, duration=$5, date_created=NOW(), completed=$6 WHERE pid = $1`, values, (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    })
})

/* delete a project by name*/
router.delete('api/delete/project', (req, res, next) => {
    const project_name = req.body.project_name
    pool.query(`DELETE FROM project WHERE project_name = $1`, [project_name], 
    (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    })
})

/* get all projects of a user */

router.get('/api/get/allprojects', (req, res, next) => {
    const user_id = String(res.query.user_id)
    pool.query(`SELECT * FROM project WHRER user_id=$1`, [user_id], (q_err, q_res) => {
        res.json(q_res.rows)
        console.log(q_err)
    })
})

/* USER PROFILE SECTION */
router.post('api/post/userprofiletodb', (req,res,next)=>{
    const values = [req.body.username, req.body.email, req.body.role]
    pool.query(`INSERT INTO users(username, email, role) VALUES($1,$2,$3,NOW())
    ON CONFLICT DO NOTHING`, values, 
    (q_err, q_res)=>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})

/* get the user profile */
router.get('api/get/userprofiletodb', (req,res,next)=>{
    const email = String(req.body.email)
    pool.query(`SELECT * FROM users WHERE email=$1`, [email],
    (q_err, q_res)=>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})

/*get all projects */
router.get('api/get/userprojects', (req,res,next)=>{
    const user_id = String(req.body.user_id)
    pool.query(`SELECT * FROM project WHERE user_id=$1`, [user_id],
    (q_err, q_res)=>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})

module.exports = router