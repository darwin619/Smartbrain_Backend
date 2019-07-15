const signInHandle = (req, res, db, bcrypt) => {

	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(404).json('Empty Fields');
	}
			
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.hashSync(password, data[0].hash);
		if(isValid) {
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => res.json(user[0]))
			.catch(err => res.status(404).json('Email not matched'))
		}
	})
	.catch(err => res.status(404).json('Wrong Password'))


}

module.exports = {
	signInHandle: signInHandle
};