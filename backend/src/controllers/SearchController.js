const dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs} = Request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxdistance: 10000, 
            }
        });

        return response.json({ devs })
    }
}