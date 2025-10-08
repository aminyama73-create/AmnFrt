const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('Nad_db.db',(err) => {
  if (err) console.error('Error opening database:', err.message);
  else console.log('Connected to SQLite database.');
});


app.post('/insert', (req, res) => {
    const { name, year, boxno, seq, cont_cnt, cont_detl, file_state } = req.body;
    const sql = `INSERT INTO student (name, year, boxno, seq, cont_cnt, cont_detl, file_state) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, year, boxno, seq, cont_cnt, cont_detl, file_state], function(err) {
        if (err) { 
					console.error('db insert error',err.message); 
					res.status(500).json({ error: err.essage});
					return;
				}
				console.log('inserted ID:' ,this.lastID);
        res.json({ id: this.lastID });
    });
});


app.get('/query', (req, res) => {
    let sql = `SELECT * FROM student`;
    if (req.query.name) {
        sql += ` WHERE name LIKE ?`;
        db.all(sql, [`%${req.query.name}%`], (err, rows) => {
            if (err) res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        db.all(sql, [], (err, rows) => {
            if (err) res.status(400).send(err.message);
            else res.send(rows);
        });
    }
});

//UPDATE
app.put('/update/:id', (req, res) => {
	const { name, year, boxno, seq, cont_cnt, cont_detl, file_state } = req.body;
  const { id } = req.params;
  const sql = `UPDATE student SET name=?, year=?, boxno=?, seq=?, cont_cnt=?, cont_detl=?, file_state=? WHERE id=?`;
  db.run(sql, [name, year, boxno, seq, cont_cnt, cont_detl, file_state, id], function (err) {
    if (err)
		{ 
			console.error('update error',err.message); 	
			return res.status(500).json({ error: err.message });
    }
		console.log('deleted ID:' ,this.lastID);
		res.json({ updated: this.changes });
  });
});

//DELETE
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM student WHERE id=?`, [id], function (err) {
    if (err) {
		console.error('Delete error',err.message); 	
		return res.status(500).json({ error: err.message });
		}
		console.log('deleted ID:' ,this.lastID);
    res.json({ deleted: this.changes });
  });
});



app.listen(3000, () => console.log("Server running on port 3000"));