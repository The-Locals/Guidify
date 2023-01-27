const router = require('express').Router();
const TravelGuideManager = require('../db_managers/TravelGuideManager');

router.use((err, req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.send({
            statusCode: 403,
        });
    }
});

router.get('/', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        console.log('No id included in the request body');
        res.send({
            travelGuide: null,
        });
    }
    try {
        const travelGuide = await TravelGuideManager.getTravelGuideById(id);
        res.send({
            travelGuide: travelGuide,
        });
    } catch (err) {
        console.log(err);
        res.send({
            travelGuide: null,
        });
    }
})

router.get('/byLocation', async (req, res) => {
    const placeId = req.query.placeId;
    if (!placeId) {
        console.log('No location id included in the request body');
        res.send({
            travelGuides: [],
        });
    }

    try {
        const travelGuides = await TravelGuideManager.getTravelGuidesByPlaceId(placeId);
        res.send({
            travelGuides: travelGuides,
        });
    } catch (err) {
        console.log(err);
        res.send({
            travelGuides: [],
        });
    }
});

router.get('/byUser', async (req, res) => {
    const userId = req.session.user._id;
    if (!userId) {
        console.log('No user id provided');
        res.send({
            travelGuides: [],
        });
    }

    try {
        const travelGuides = await TravelGuideManager.getTravelGuidesByUser(userId);
        res.send({
            travelGuides: travelGuides,
        });
    } catch (err) {
        console.log(err);
        res.send({
            travelGuides: [],
        });
    }
});

// Get pending TravelGuide applications
router.get('/applications', async (req, res) => {
    const travelGuidesRequests = await TravelGuideManager.getTravelGuideRequests();
    res.send({
        travelGuidesRequests: travelGuidesRequests,
    })
});

// Action towards an existing TravelGuide application.
router.post('/applicationAction', async (req, res) => {
    // the variable approve must be a boolean value. if true, it means that
    // the request will be approved. otherwise it will be rejected.
    const approve = req.body.approve;
    const requestId = req.body.requestId;

    if (approve) {
        await TravelGuideManager.createTravelGuideFromRequest(requestId);
    } else {
        await TravelGuideManager.removeTravelGuideRequest(requestId);
    }
});

module.exports = router;