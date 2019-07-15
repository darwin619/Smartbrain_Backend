 const registerHandle = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if(!email || !name || !password) {
		return res.status(404).json('Empty Fields');
	}
	const hash = bcrypt.hashSync("bacon");

	db.transaction(trx => {
		trx.insert({
				hash: hash,
				email: email
		})
	.into('login')
	.returning('email')
	.then(loginEmail => {

		return trx('users')
		.returning('*')
		.insert({
	  
		       email: loginEmail[0],
		       name: name,
		       joined: new Date()

	})
	.then(userRow => res.json(userRow[0]))

	})
	.then(trx.commit)
	.catch(trx.rollback)
	})
	.catch(err => res.status(404).json('Cant register user'))
}

module.exports = {
	registerHandle: registerHandle
};