var express = require("express");
var router = express.Router();

const { Get, Create, Delete, Update } = require("../crudStudents");

/**
 * @swagger
 *
 * /groups/students/:
 *   get:
 *     tags:
 *     - students
 *     summary: Get students
 *     description: GetStudentsById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idGroup
 *         schema:
 *           type: integer
 *         description: Id of the Group
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: GetStudents
 */
router.get("/", (req, res, next) => {
  console.log(req.query);
  Get(+req.query.idGroup, res, req);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.groupId, +req.query.studentId, res, req);
});

/**
 * @swagger
 *
 * /groups/students/delete/:
 *   delete:
 *     tags:
 *     - students
 *     summary: Delete student
 *     description: DeleteStudentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: integer
 *         description: Id of the Group
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: integer
 *         description: Id of the Student
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: DeleteStudent
 */
router.delete("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.groupId, +req.query.studentId, res, req);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateStudent", {
    title: "updateStudent",
    idStudent: +req.body.idStudent,
    idGroup: +req.body.idGroup,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });
});

/**
 * @swagger
 *
 * /groups/students/update/:
 *   put:
 *     tags:
 *     - students
 *     summary: Update student
 *     description: UpdateStudent
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Update past student
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idGroup: 
 *                 type: integer
 *                 format: int64
 *               idStudent: 
 *                 type: integer
 *                 format: int64
 *               name: 
 *                 type: string
 *                 example: Dimonchik
 *               email: 
 *                 type: string
 *                 example: malenkyiDaUdalenkyi@gmail.com
 *               phone: 
 *                 type: string
 *                 example: 0953422291
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: UpdateStudent
 */
router.put("/update", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.idGroup,
    +req.body.idStudent,
    req.body.name,
    req.body.email,
    req.body.phone,
    res,
    req
  );
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.idGroup,
    +req.body.idStudent,
    req.body.name,
    req.body.email,
    req.body.phone,
    res
  );
});

/**
 * @swagger
 *
 * /groups/students/create/:
 *   post:
 *     tags:
 *     - students
 *     summary: Create student
 *     description: CreateStudent
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Create new student
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idGroup: 
 *                 type: integer
 *                 format: int64
 *               name: 
 *                 type: string
 *                 example: Dima
 *               email: 
 *                 type: string
 *                 example: malenkyiDaUdalenkyi@gmail.com
 *               phone: 
 *                 type: string
 *                 example: 0953422291
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: CreateStudent
 */
router.post("/create", (req, res, next) => {
  console.log(req.body);
  Create(+req.body.idGroup, req.body.name, req.body.email, req.body.phone, res, req);
});

module.exports = router;
