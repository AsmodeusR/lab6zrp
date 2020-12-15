var express = require("express");
var router = express.Router();

const { Get, Create, Delete, Update, GetGroups } = require("../crudGroups");

/**
 * @swagger
 *
 * /groups/:
 *   get:
 *     tags:
 *     - groups
 *     summary: Get all groups
 *     description: GetGroupsById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of the Faculty
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: GetGroups
 */
router.get("/", (req, res, next) => {
  console.log(req.query);
  Get(req.query.id, res, req);
});

/**
 * @swagger
 *
 * /groups/create/:
 *   post:
 *     tags:
 *     - groups
 *     summary: Create group
 *     description: CreateGroup
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Create new group
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: 
 *                 type: integer
 *                 format: int64
 *               name: 
 *                 type: string
 *                 example: IT-92
 *               course: 
 *                 type: integer
 *                 example: 1
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: CreateGroup
 */
router.post("/create", (req, res, next) => {
  console.log(req.body);
  Create(+req.body.id, req.body.name, +req.body.course, res, req);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.fakId, +req.query.groupId, res, req);
});

/**
 * @swagger
 *
 * /groups/delete/:
 *   delete:
 *     tags:
 *     - groups
 *     summary: Delete group
 *     description: DeleteGroupById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: fakId
 *         schema:
 *           type: integer
 *         description: Id of the Faculty
 *       - in: query
 *         name: groupId
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
 *         description: DeleteGroup
 */
router.delete("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.fakId, +req.query.groupId, res, req);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateGroup", {
    title: "updateGroup",
    idFak: +req.body.idFak,
    idGroup: +req.body.idGroup,
    name: req.body.name,
    course: +req.body.course
  });
});

/**
 * @swagger
 *
 * /groups/update/:
 *   put:
 *     tags:
 *     - groups
 *     summary: Update group
 *     description: UpdateGroup
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Update past group
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idFak: 
 *                 type: integer
 *                 format: int64
 *               idGroup: 
 *                 type: integer
 *                 format: int64
 *               name: 
 *                 type: string
 *                 example: IT-92
 *               course: 
 *                 type: integer
 *                 example: 2
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: UpdateGroup
 */
router.put("/update", (req, res, next) => {
  console.log(req.body);
  Update(+req.body.idFak, +req.body.idGroup, req.body.name, +req.body.course, res, req);
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(+req.body.idFak, +req.body.idGroup, req.body.name, +req.body.course, res);
});

router.get("/grops", (req, res, next) => {
  console.log(req.query);
  GetGroups(+req.query.idGroup, res);
});

module.exports = router;
