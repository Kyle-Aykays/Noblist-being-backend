const Activity = require('../Models/Activity'); // Assuming Activity model is in Models folder

const createActivity = async (req, res) => {
    try {
        const { userId, date, name, time, context, feeling } = req.body;

        if (!userId || !name || !time) {
            return res.status(400).json({
                message: 'User ID, activity name, and time are required',
                success: false,
            });
        }

        // Normalize the activity date
        const activityDate = new Date(date || new Date());
        activityDate.setHours(0, 0, 0, 0);

        // Validate and parse the time field
        const activityTime = new Date(time);
        if (isNaN(activityTime.getTime())) {
            return res.status(400).json({
                message: 'Invalid time format. Please provide a valid ISO 8601 date string.',
                success: false,
            });
        }

        // Find the existing activity document for the user and date
        let activityLog = await Activity.findOne({ user: userId, date: activityDate });

        if (!activityLog) {
            activityLog = new Activity({
                user: userId,
                date: activityDate,
                activities: [],
            });
        }

        // Add the new activity
        activityLog.activities.push({ name, time: activityTime, context, feeling });

        await activityLog.save();

        res.status(201).json({
            message: 'Activity created successfully',
            success: true,
            data: activityLog,
        });
    } catch (err) {
        console.error('Error creating activity:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};




// const createActivity = async (req, res) => {
//     try {
//         const { userId, date, name, time, context, feeling } = req.body;

//         if (!userId || !name || !time) {
//             return res.status(400).json({
//                 message: 'User ID, activity name, and time are required',
//                 success: false,
//             });
//         }

//         // Normalize the date to the start of the day
//         const activityDate = new Date(date || new Date());
//         activityDate.setHours(0, 0, 0, 0);

//         // Find the existing activity document for the user and date
//         let activityLog = await Activity.findOne({ user: userId, date: activityDate });

//         if (!activityLog) {
//             // Create a new activity log if none exists for the date
//             activityLog = new Activity({
//                 user: userId,
//                 date: activityDate,
//                 activities: [],
//             });
//         }

//         // Add the new activity to the activities array
//         activityLog.activities.push({ name, time, context, feeling });

//         // Save the updated or newly created document
//         await activityLog.save();

//         res.status(201).json({
//             message: 'Activity created successfully',
//             success: true,
//             data: activityLog,
//         });
//     } catch (err) {
//         console.error('Error creating activity:', err);
//         res.status(500).json({
//             message: 'Internal Server Error',
//             success: false,
//         });
//     }
// };


// Get activities for a user
const getActivityItems = async (req, res) => {
    try {
        const { userId, date } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false,
            });
        }

        const query = { user: userId };
        if (date) {
            const normalizedDate = new Date(date);
            normalizedDate.setHours(0, 0, 0, 0);
            query.date = normalizedDate;
        }

        const activityLogs = await Activity.find(query);

        if (!activityLogs || activityLogs.length === 0) {
            return res.status(404).json({
                message: 'No activity logs found',
                success: false,
            });
        }

        const allActivities = activityLogs.flatMap((log) => log.activities);

        res.status(200).json({
            message: 'Activity items retrieved successfully',
            success: true,
            data: allActivities,
        });
    } catch (err) {
        console.error('Error fetching activity items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



// Update an activity
const updateActivityItem = async (req, res) => {
    try {
        const { userId, date, activityId, context, feeling } = req.body;

        if (!userId || !date || !activityId) {
            return res.status(400).json({
                message: 'User ID, date, and activity ID are required',
                success: false,
            });
        }

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        // Find the document for the user and date
        const activityLog = await Activity.findOne({ user: userId, date: normalizedDate });

        if (!activityLog) {
            return res.status(404).json({
                message: 'Activity log not found',
                success: false,
            });
        }

        // Find the activity item by ID
        const activityItem = activityLog.activities.id(activityId);

        if (!activityItem) {
            return res.status(404).json({
                message: 'Activity item not found',
                success: false,
            });
        }

        // Update only the allowed fields
        if (context !== undefined) activityItem.context = context;
        if (feeling !== undefined) activityItem.feeling = feeling;

        // Save the updated document
        await activityLog.save();

        res.status(200).json({
            message: 'Activity item updated successfully',
            success: true,
            data: activityLog,
        });
    } catch (err) {
        console.error('Error updating activity item:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Delete an activity
const deleteActivityItem = async (req, res) => {
    try {
        const { userId, date, activityId } = req.body;

        if (!userId || !date || !activityId) {
            return res.status(400).json({
                message: 'User ID, date, and activity ID are required',
                success: false,
            });
        }

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        // Find the document for the user and date
        const activityLog = await Activity.findOne({ user: userId, date: normalizedDate });

        if (!activityLog) {
            return res.status(404).json({
                message: 'Activity log not found',
                success: false,
            });
        }

        // Filter out the activity item to be deleted
        const updatedActivities = activityLog.activities.filter(
            (activity) => activity._id.toString() !== activityId
        );

        if (updatedActivities.length === activityLog.activities.length) {
            return res.status(404).json({
                message: 'Activity item not found',
                success: false,
            });
        }

        activityLog.activities = updatedActivities;

        // Save the updated document
        await activityLog.save();

        res.status(200).json({
            message: 'Activity item deleted successfully',
            success: true,
            data: activityLog,
        });
    } catch (err) {
        console.error('Error deleting activity item:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



module.exports = {
    createActivity,
    getActivityItems,
    updateActivityItem,
    deleteActivityItem,
};
