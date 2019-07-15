const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ed1f92a43baf4112b2940717d44abe65',
});

const handleApiCall = (req, res) => {
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => res.json(data))
.catch(err => res.json(err))
}

const imageHandle = (req, res, db) => {
	const { id } = req.body;
	
		db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(404).json('Cant Update'))
}

module.exports = {
	imageHandle: imageHandle,
	handleApiCall: handleApiCall
};