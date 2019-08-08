const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ed1f92a43baf4112b2940717d44abe65',
});

const handleApiCall = (req,res) => {
	app.models
		.predict("e466caa0619f444ab97497640cefc4dc", req.body.input)
		.then(data=> {
			res.json(data);
		})
		.catch(err=> res.status(400).json(err))

}

const imageHandle = (req, res, db) => {
	const { id } = req.body;
	
		db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(404).json('Cant Update'))
}

const historyHandle = (req, res, db) => {

	const {id, url, celeb} = req.body;
	db('history').insert({imageurl: imageLink, celebname: celeb})
	.catch(err=>console.log(err))

	db.select().from('history').where('id', '=', id)
	.then(result => res.json(result))
	.catch(err=> res.status(400).json('no search queries found'))
}


module.exports = {
	imageHandle: imageHandle,
	handleApiCall: handleApiCall,
	historyHandle: historyHandle
};



// create table history(id serial primary key, imageurl varchar not null, celebname varchar not null);