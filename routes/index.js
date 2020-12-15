var express = require("express");

var router = express.Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const { ReadCheckUser, Update, Delete, Insert, SaveUser, GetFaks } = require("../crudFaculties");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.header("dima") == "sad") {
    res.json({ sasha: "BANDERA" });
  }
  res.render("login", { title: "Login" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});

/** 
 *  @swagger
 * tags:
 * - name: faculties
 *   description: Get Post Put for fackulties
 * - name: groups
 *   description: Get Post Put for groups
 * - name: students
 *   description: Get Post Put for students
 * 
 */

/**
 * @swagger
 *
 * /faks/:
 *   get:
 *     tags:
 *     - faculties
 *     summary: Get faculties
 *     description: GetFacksById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idFaculty
 *         schema:
 *           type: integer
 *         description: Id of the Faculty user
 *     responses: 
 *       200:
 *         description: GetFacs
 */
router.get("/faks", function (req, res, next) {
  GetFaks(req.query.idFaculty, res);
});

router.post("/saveuser", function (req, res, next) {
  console.log(req.body);
  SaveUser(req.body.name, req.body.password, res);
});

router.post("/fak", function (req, res, next) {
  console.log(req.body);

  ReadCheckUser(req.body.name, req.body.password, res, req);
});


/**
 * @swagger
 *
 * /create/:
 *   post:
 *     tags:
 *     - faculties
 *     summary: Create faculty
 *     description: CreateFac
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Create new faculty
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
 *                 example: Ingeniring Faculty
 *               shortname: 
 *                 type: string
 *                 example: FICT
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: CreateFac
 */
router.post("/create", (req, res, next) => {
  console.log(req.body);

  Insert(+req.body.id, req.body.name, req.body.shortname, res, req);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.id, +req.query.fakId, res, req);
  // res.location("http://localhost:3000/fak");
  // Insert(+req.body.id, req.body.name, req.body.shortname, res);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateFak", {
    title: "Update",
    id: +req.body.id,
    name: req.body.name,
    shortname: req.body.shortname
  });
  // Delete(+req.body.id, req.body.name, req.body.shortname, res);
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.id,
    req.body.name,
    req.body.shortname,
    req.body.pastname,
    req.body.pastshortname,
    res
  );
});

/**
 * @swagger
 *
 * /update/:
 *   put:
 *     tags:
 *     - faculties
 *     summary: Update faculty
 *     description: UpdateFac
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Update past faculty
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: 
 *                 type: integer
 *                 format: int64
 *               pastname: 
 *                 type: string
 *                 example: Ingeniring Faculty
 *               pastshortname: 
 *                 type: string
 *                 example: FICT
 *               name: 
 *                 type: string
 *                 example: New Ingeniring Faculty
 *               shortname: 
 *                 type: string
 *                 example: new FICT
 *     parameters:
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: UpdateFac
 */
router.put("/update", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.id,
    req.body.name,
    req.body.shortname,
    req.body.pastname,
    req.body.pastshortname,
    res,
    req
  );
});

/**
 * @swagger
 *
 * /delete/:
 *   delete:
 *     tags:
 *     - faculties
 *     summary: Delete faculty
 *     description: DeleteFacById
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of the user
 *       - in: query
 *         name: fakId
 *         schema:
 *           type: integer
 *         description: Id of the faculty
 *       - in: header
 *         name: "dima"
 *         value: "sad"
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: DeleteFac
 */
router.delete("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.id, +req.query.fakId, res, req);
});

module.exports = router;
