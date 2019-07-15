const profileHandle = (req, res, db) => {
	const { id } = req.params;
	
	db.select('*').from('users').where({id})
	 .then(user => {
	 	if(user.length){
	 	res.json(user[0])
	 }
	 else {
	 	res.status(404).json('User not found')
	 }
	 })

}

module.exports = {
	profileHandle: profileHandle
};