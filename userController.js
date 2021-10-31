const db = require("./database.json");
const fs = require("fs");

exports.getAllUsers = (req, res) => {
  res.send({ length: db.users.length, users: db.users });
};

exports.getUserById = (req, res) => {
  const user = db.users.find((el) => el.id === req.params.id);

  if (user) res.send(user);
  else res.status(404).send("User with the given ID does not exist");
};

exports.createUser = (req, res) => {
  const data = req.body;

  const newId = parseInt(1e10 + Math.random() * 9e10);

  let newUser = {
    id: newId.toString(),
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  };

  Object.keys(newUser).forEach((key) => {
    if (key !== "id") newUser[key] = data[key] ? data[key] : newUser[key];
  });

  db.users.push(newUser);
  fs.writeFileSync("./database.json", JSON.stringify(db));

  res.send(newUser);
};

exports.updateUser = (req, res) => {
  const id = req.params.id;

  const index = db.users.findIndex((el) => el.id === id);

  if (index >= 0) {
    Object.keys(db.users[index]).forEach((key) => {
      if (key !== "id")
        db.users[index][key] = req.body[key]
          ? req.body[key]
          : db.users[index][key];
    });

    fs.writeFileSync("./database.json", JSON.stringify(db));

    res.send(db.users[index]);
  } else res.status(404).send("User with the given ID does not exist");
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  const index = db.users.findIndex((el) => el.id === id);

  if (index >= 0) {
    db.users.splice(index, 1);

    fs.writeFileSync("./database.json", JSON.stringify(db));

    res.status(204).send("User deleted succesfully");
  } else {
    res.status(404).send("User with the given ID does not exist");
  }
};
