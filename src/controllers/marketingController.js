const marketingService = require('../services/marketingService');
const customerService = require('../services/customerService');

const Coach = require('../models/CoachSchema');

const getAllCoachDetails = async (req, res) => {
    try {
        const coach = await marketingService.getAllCoach();

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
            });
        }

        res.json(coach);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const getCoachDetails = async (req, res) => {
    try {
        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
            });
        }

        res.json(coach);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const registerCoach = async (req, res) => {
    try {
        const coachData = req.body;

        if (req.file) {
            coachData.file = req.file.coach.path;
        }
        const coach = new Coach(coachData);

        await coach.save();

        // const customerId = req.cookies['shuttle-token'];
        // const customer = await customerService.getCustomerById(customerId);

        // if (!customer) {
        //     return res.status(404).json({
        //         type: 'user-not-found',
        //         message: 'User not found',
        //     });
        // }

        // customer.coachId = coach.id;
        // await customer.save();

        return res.status(200).json({
            message: 'Successfully registered new coach!',
            coach: coach,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: 'unable-to-register-coach',
            message: err.message,
        });
    }
};

const updateRating = async (req, res) => {
    try {
        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
                message: 'Coach not found',
            });
        }

        const updatedCoach = await marketingService.updateRating(req, req.body);

        res.status(200).json({
            message: 'success',
            rating: updatedCoach.rating,
            numOfRating: updatedCoach.numOfRating,
        });

        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};
const updateCoach = async (req, res) => {
    try {
        const {
            coachName,
            level,
            targetAge,
            qualification,
            experience,
            archivement,
            timeslot,
            location,
            state,
            area,
            feePerSession,
            contact,
        } = req.body;

        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
                message: 'Coach not found',
            });
        }

        coach.coachName = coachName;
        coach.level = level;
        coach.targetAge = targetAge;
        coach.qualification = qualification;
        coach.experience = experience;
        coach.archivement = archivement;
        coach.timeslot = timeslot;
        coach.location = location;
        coach.state = state;
        coach.area = area;
        coach.feePerSession = feePerSession;
        coach.contact = contact;

        if (req.file) {
            coach.file = req.file.path;
        }

        await coach.save();

        res.status(200).json({
            message: 'success',
            data: coach,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

// const updateCoach = async (req, res) => {
//     try {
//         // const customerId = req.cookies['shuttle-token'];
//         // const customer = await customerService.getCustomerById(customerId);
//         // const profileCoachId = req.params.coachId; // Get the coachId of the coach profile being edited
//         const coach = await marketingService.getCoachByID(req);

//         if (!coach) {
//             return res.status(404).json({
//                 type: 'coach-not-found',
//                 message: 'Coach not found',
//             });
//         }

//         // if (customer.coachId !== profileCoachId) {
//         //     return res.status(403).json({
//         //         type: 'forbidden',
//         //         message: 'You are not authorized to edit this coach profile',
//         //     });
//         // }

//         const updatedCoach = await marketingService.updateCoach(req, req.body);

//         res.json(updatedCoach);
//     } catch (error) {
//         console.error(error, 'coachnot updated');
//         res.status(500).json({ type: 'internal-server-error', message: error.message });
//     }
// };

module.exports = { getAllCoachDetails, getCoachDetails, registerCoach, updateCoach, updateRating };
