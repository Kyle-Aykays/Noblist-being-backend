const Checklist = require('../Models/Checklist');

// Create a New Checklist

// Create or Add Custom Task to Existing Checklist
const createCustomChecklist = async (req, res) => {
    try {
        const { userId, checklistType, customItems } = req.body;

        // Validate the request body
        if (!userId || !checklistType || !customItems || customItems.length === 0) {
            return res.status(400).json({
                message: 'User ID, checklist type, and at least one custom item are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if(!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Add custom items to the existing checklist's items array
        checklist.items.push(...customItems);

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Custom checklist items added successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error adding custom checklist items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Get Checklists by User and Type
const getChecklists = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        const checklists = await Checklist.find({ user: userId, checklistType });
        if (checklists.length === 0) {
            return res.status(404).json({
                message: 'No checklists found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Checklists retrieved successfully',
            success: true,
            data: checklists,
        });
    } catch (err) {
        console.error('Error retrieving checklists:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Update a Checklist
const updateChecklist = async (req, res) => {
    try {
        const { userId, checklistType, taskName, updates } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskName || !updates) {
            return res.status(400).json({
                message: 'User ID, checklist type, task name, and updates are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Find the task by its name and apply updates
        const taskIndex = checklist.items.findIndex(item => item.name === taskName);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Ensure that the name is not being overwritten
        const updatedTask = {
            name: checklist.items[taskIndex].name,  // Keep the existing name
            ...checklist.items[taskIndex],          // Preserve other properties
            ...updates                             // Apply updates
        };

        // Update the task in the checklist
        checklist.items[taskIndex] = updatedTask;

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Checklist item updated successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error updating checklist:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

// const deleteChecklistItem = async (req, res) => {
//     try {
//         const { userId, checklistType, taskName } = req.body;

//         // Validate the input data
//         if (!userId || !checklistType || !taskName) {
//             return res.status(400).json({
//                 message: 'User ID, checklist type, and task name are required',
//                 success: false,
//             });
//         }

//         // Find the checklist for the user and checklistType
//         const checklist = await Checklist.findOne({ user: userId, checklistType });

//         if (!checklist) {
//             return res.status(404).json({
//                 message: 'Checklist not found for this user and checklist type',
//                 success: false,
//             });
//         }

//         // Remove the task from the items array
//         const updatedItems = checklist.items.filter(item => item.name !== taskName);

//         // If no tasks are left after filtering, you might choose to delete the checklist altogether
//         if (updatedItems.length === checklist.items.length) {
//             return res.status(404).json({
//                 message: 'Task not found in the checklist',
//                 success: false,
//             });
//         }

//         // Update the checklist's items array
//         checklist.items = updatedItems;

//         // Save the updated checklist
//         await checklist.save();

//         res.status(200).json({
//             message: 'Checklist item deleted successfully',
//             success: true,
//             data: checklist,
//         });
//     } catch (err) {
//         console.error('Error deleting checklist item:', err);
//         res.status(500).json({
//             message: 'Internal Server Error',
//             success: false,
//         });
//     }
// };


const deleteChecklistItem = async (req, res) => {
    try {
        const { userId, checklistType, taskId } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskId) {
            return res.status(400).json({
                message: 'User ID, checklist type, and task ID are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Remove the task from the items array by ID
        const updatedItems = checklist.items.filter(item => item._id.toString() !== taskId);

        // If no tasks are removed (i.e., task not found), return an error
        if (updatedItems.length === checklist.items.length) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Update the checklist's items array
        checklist.items = updatedItems;

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Checklist item deleted successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error deleting checklist item:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



const rescheduleMissedTasks = async (userId, checklistType) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            console.log(`No checklist found for user ${userId} and type ${checklistType}`);
            return;
        }

        const missedTasks = checklist.items.filter(
            (item) => !item.completed && item.priority === 'high'
        );

        if (missedTasks.length > 0) {
            const rescheduledTasks = missedTasks.map((task) => ({
                ...task.toObject(),
                completed: false,
                rescheduledFrom: today,
            }));

            checklist.items.push(...rescheduledTasks);
            await checklist.save();

            console.log(
                `Rescheduled ${rescheduledTasks.length} tasks for user ${userId} in checklist type ${checklistType}`
            );
        } else {
            console.log(`No high-priority tasks to reschedule for user ${userId}`);
        }
    } catch (err) {
        console.error('Error in rescheduling missed tasks:', err);
    }
};





module.exports = {
    createCustomChecklist ,
    getChecklists,
    updateChecklist,
    deleteChecklistItem,
    rescheduleMissedTasks
};
