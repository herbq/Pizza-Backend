import express from "express";
import { createNewMachine, updateMachine } from "./services/machine.utils";
import { createTable, insertSQL } from "./services/mysql.utils";
import { createNewRecord } from "./services/record.utils";
import { authUser, createNewUser, deleteUser, userExists } from "./services/user.utils";

const app = express();
var cors = require('cors');

app.use(cors())
app.use(express.json());

app.use('/user', require('./routes/user.route'))
app.use('/food', require('./routes/food.route'))
app.use('/machine', require('./routes/machine.route'))
app.use('/record', require('./routes/record.route'))

const test = async () => {
  // console.log(await userExists(null, `iherbqwi@gmail.com`))
  // console.log(await createNewUser(`user5`, `user5@gmail.com`, `passwd`))
  // console.log(await authUser(`omar`, `omar123`))
  // createTable(`machines`, `id int NOT NULL AUTO_INCREMENT, name varchar(255), status varchar(255), max_stock varchar(255), max_rows varchar(255), stock varchar(255), temperature varchar(255), available varchar(255), location varchar(255), reason varchar(255), token varchar(255), owner varchar(255), PRIMARY KEY (id)`)
  // createTable(`records`, `id int NOT NULL AUTO_INCREMENT, machine_id varchar(255), food_id varchar(255), actual_price varchar(255), selling_price varchar(255), time varchar(255), PRIMARY KEY (id)`)
  // createTable(`food`, `id int NOT NULL AUTO_INCREMENT, name varchar(255), img varchar(255), actual_price varchar(255), selling_price varchar(255), user varchar(255), PRIMARY KEY (id)`)
  // createNewUser(`user`, `user@gmail.com`, `passwd`)
  // deleteUser(`user`)
  // createNewMachine(`Pizza Machine V3000`, 100, 4, `Palestine, Hebron, Ein Sara`, `QWRA-GSQT-HASW-HFAY`)
}
// insertSQL(`users`, `username, email, password`, `'omar', 'iherbqwi@gmail.com', 'omar123'`)
// updateMachine(`qwewe`, { name: `hey`, max_stock: 2, hey: 1 });


test();


// createTable(`users`, `id int NOT NULL AUTO_INCREMENT, username varchar(255), email varchar(255), password varchar(255), PRIMARY KEY (id)`)


const port = process.env.PORT || 8000;

app.listen(port);