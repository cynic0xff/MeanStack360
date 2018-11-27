// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const Profile = require('../models/Profile');
const Team = require('../models/Team');

//routes
router.get('/profile', (req, res) => {
	
	//build the query
	
	//if the query has an age attribute that is null then the url is specifically calling for one
	//e.g, http://localhost:3000/api/profile?age=41
	//e.g, http://localhost:3000/api/profile?firstname=Tim
	let filters = req.query;
	if(req.query.age != null) {
		filters = {
			age: { $gt: req.query.age}
		};
	}

	//find profiles in the success block
	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'Profile',
			message: err.message
		});
	});
});

//NON-RESTful
//update the profile
router.get('/profile/update', (req, res) => {
	//api/profile/update?id=123&team=production
	const query = req.query;		//require: id, key=value
	const profileId = query.id;

	//avoid passing in any unnecessary to mongo by removing the id key/value from the query
	delete query.id;

	//update mongo passing in the profileId and the key/value query
	//use the {new:true} value as we want the record returned after it has been udpated.
	//mongo returns the record before the update is sent.
	Profile.findByIdAndUpdate(profileId, query, {new:true})
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

//remove profile
router.get('/profile/remove', (req, res) => {
	const query = req.query;

	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'Profile ' + query.id + ' successfully removed'
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

//return the sepecific profile id route http://localhost:3000/api/profile/5ba91223bfc9dcaabed1d4c7
router.get('/profile/:id', (req, res) => {
	//get the parameter id
	const id = req.params.id;

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Profile ID not found'
		});
	});
});

//post profile
router.post('/profile', (req, res) => {
	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

//get all teams
router.get('/team', (req, res) => {

	let filters = req.query;

	//handle any filters
	Team.find(filters)
	.then(teams => {
		res.json({
			confirmation: 'success',
			data: teams
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

//get team ID
router.get('/team/:id', (req, res) => {
	const id = req.params.id;

	Team.findById(id)
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Team ID not found'
		});
	});
});

//post team
router.post('/team', (req, res) => {
	Team.create(req.body)
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'Fail',
			message: err.message
		});
	});
});

module.exports = router;
