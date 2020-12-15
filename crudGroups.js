var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var Connection = require("tedious").Connection;

// Create connection to database
var config = {
  server: "db",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "YourStrong@Passw0rd",
    },
  },
  options: {
    database: "laba2zrp",
    validateBulkLoadParameters: false,
    //instanceName: "MSSQLSERVER02",
    encrypt: false,
    rowCollectionOnRequestCompletion: true
  },
};

var connection = new Connection(config);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});

connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

function Get(id, responsee, requeste) {
  console.log("Reading rows from the Table Groups...");

  request1 = new Request(
    `SELECT IdFaculty, IdGroup, Name, Course FROM LABA2ZRPschema.Groups
       WHERE IdFaculty = @Id
       ORDER BY IdGroup DESC;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) returned");
        if (requeste.header("dima") == "sad") {
          let glek = [];
          rows.map((row, index) => {
            glek[index] = [];
            row.map((col) => (glek[index] = [col.value, ...glek[index]]));
          });
          responsee.json({ groups: glek });
        } else {
          responsee.render("groups", {
            title: "Groups",
            rows: rows,
            id: id
          });
        }
      }
    }
  );
  request1.addParameter("Id", TYPES.Int, id);
  var result1 = "";
  request1.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result1 += column.value + " ";
      }
    });
    // responsee.render("faculties", { title: result1 });
    console.log(result1);
    result1 = "";
  });

  // Execute SQL statement
  connection.execSql(request1);
}

function Create(id, name, course, responsee, requeste) {
  console.log("Inserting '" + name + "' into Group Table...");

  request = new Request(
    `INSERT INTO LABA2ZRPschema.Groups (Name, Course, IdFaculty) VALUES (@Name, @Course, @IdFaculty);
      SELECT IdFaculty, IdGroup, Name, Course FROM LABA2ZRPschema.Groups
      WHERE IdFaculty = @IdFaculty;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        if (requeste.header("dima") == "sad") {
          let glek = [];
          rows.map((row, index) => {
            glek[index] = [];
            row.map((col) => (glek[index] = [col.value, ...glek[index]]));
          });
          responsee.json({ groups: glek });
        } else {
          responsee.render("groups", {
            title: "Groups",
            rows: rows,
            id: id
          });
        }
      }
    }
  );
  request.addParameter("IdFaculty", TYPES.Int, id);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Course", TYPES.Int, course);

  // Execute SQL statement
  connection.execSql(request);
}

function Delete(fakId, groupId, responsee, requeste) {
  console.log("Deleting '" + groupId + "' from Table Groups...");
  // DELETE FROM LABA2ZRPschema.Students
  // WHERE IdGroup = @IdGroup;
  request = new Request(
    `DELETE FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;
     DELETE FROM LABA2ZRPschema.Groups
     WHERE IdGroup = @IdGroup;
     SELECT IdFaculty, IdGroup, Name, Course FROM LABA2ZRPschema.Groups
     WHERE IdFaculty = @IdFaculty;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        if (requeste.header("dima") == "sad") {
          let glek = [];
          rows.map((row, index) => {
            glek[index] = [];
            row.map((col) => (glek[index] = [col.value, ...glek[index]]));
          });
          responsee.json({ groups: glek });
        } else {
          responsee.render("groups", {
            title: "Groups",
            rows: rows,
            id: fakId
          });
        }
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, groupId);
  request.addParameter("IdFaculty", TYPES.Int, fakId);

  // Execute SQL statement
  connection.execSql(request);
}

function Update(idFak, idGroup, name, course, responsee, requeste) {
  console.log("Updating group to '" + name + "' for '" + course + "'...");

  // Update the fak record requested
  request = new Request(
    `UPDATE LABA2ZRPschema.Groups
     SET Name=@Name,
         Course=@Course
     WHERE IdGroup = @IdGroup;
     SELECT IdFaculty, IdGroup, Name, Course FROM LABA2ZRPschema.Groups
     WHERE IdFaculty = @IdFaculty;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        if (requeste.header("dima") == "sad") {
          let glek = [];
          rows.map((row, index) => {
            glek[index] = [];
            row.map((col) => (glek[index] = [col.value, ...glek[index]]));
          });
          responsee.json({ groups: glek });
        } else {
          responsee.render("groups", {
            title: "Groups",
            rows: rows,
            id: idFak
          });
        }
      }
    }
  );
  request.addParameter("IdFaculty", TYPES.Int, idFak);
  request.addParameter("IdGroup", TYPES.Int, idGroup);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Course", TYPES.Int, course);

  // Execute SQL statement
  connection.execSql(request);
}

function GetGroups(idGroup, responsee) {
  console.log("Reading '" + idGroup + "' from Groups...");

  request = new Request(
    `SELECT IdFaculty, IdGroup, Name, Course FROM LABA2ZRPschema.Groups
    WHERE IdFaculty = (SELECT IdFaculty FROM LABA2ZRPschema.Groups
    WHERE IdGroup = @IdGroup)
    ORDER BY Name DESC;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
        responsee.render("groups", {
          title: "Groups",
          rows: rows,
          id: rows[0][0].value
        });
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, idGroup);

  // Execute SQL statement
  connection.execSql(request);
}

module.exports = { Get, Create, Delete, Update, GetGroups };
