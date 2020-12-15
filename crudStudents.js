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

function Get(idGroup, responsee, requeste) {
  console.log("Reading rows from the Table Students...");
  request1 = new Request(
    `SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
      WHERE IdGroup = @IdGroup
      ORDER BY IdStudent DESC;`,
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
          responsee.json({ students: glek });
        } else {
          responsee.render("students", {
            title: "Students",
            rows: rows,
            id: idGroup
          });
        }
      }
    }
  );
  request1.addParameter("IdGroup", TYPES.Int, idGroup);
  var result1 = "";
  request1.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result1 += column.value + " ";
      }
    });
    console.log(result1);
    result1 = "";
  });

  // Execute SQL statement
  connection.execSql(request1);
}

function Create(idGroup, name, email, phone, responsee, requeste) {
  console.log("Inserting '" + name + "' into Students Table...");

  request = new Request(
    `INSERT INTO LABA2ZRPschema.Students (Name, Email, Phone, IdGroup) VALUES (@Name, @Email, @Phone, @IdGroup);
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
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
          responsee.json({ students: glek });
        } else {
          responsee.render("students", {
            title: "Students",
            rows: rows,
            id: idGroup
          });
        }
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, idGroup);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Email", TYPES.NVarChar, email);
  request.addParameter("Phone", TYPES.NVarChar, phone);

  // Execute SQL statement
  connection.execSql(request);
}

function Delete(groupId, studentId, responsee, requeste) {
  console.log("Deleting '" + studentId + "' from Table Students...");
  request = new Request(
    `DELETE FROM LABA2ZRPschema.Students
     WHERE IdStudent = @IdStudent;
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
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
          responsee.json({ students: glek });
        } else {
          responsee.render("students", {
            title: "Students",
            rows: rows,
            id: groupId
          });
        }
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, groupId);
  request.addParameter("IdStudent", TYPES.Int, studentId);

  // Execute SQL statement
  connection.execSql(request);
}

function Update(idGroup, idStudent, name, email, phone, responsee, requeste) {
  console.log("Updating student to '" + name + "'...");

  // Update the student record requested
  request = new Request(
    `UPDATE LABA2ZRPschema.Students
     SET Name=@Name,
         Email=@Email,
         Phone=@Phone
     WHERE IdStudent = @IdStudent;
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
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
          responsee.json({ students: glek });
        } else {
          responsee.render("students", {
            title: "Students",
            rows: rows,
            id: idGroup
          });
        }
      }
    }
  );
  request.addParameter("IdStudent", TYPES.Int, idStudent);
  request.addParameter("IdGroup", TYPES.Int, idGroup);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Email", TYPES.NVarChar, email);
  request.addParameter("Phone", TYPES.NVarChar, phone);

  // Execute SQL statement
  connection.execSql(request);
}

module.exports = { Get, Create, Delete, Update }; //, Update
