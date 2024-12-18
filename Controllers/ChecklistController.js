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

const getLowPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'low');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


const gethighPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'high');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



const getmediumPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'medium');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};




const getempthyPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority == "");

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
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

        const checklists = await Checklist.find({ user: userId, checklistType, priority: 'low' });
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
            (item) => !item.completed && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low') &&
            !item.rescheduledFrom
        );

        if (missedTasks.length > 0) {
            const rescheduledTasks = missedTasks.map((task) => {
                const newTask = task.toObject();
                delete newTask._id; // Remove the original _id to let Mongoose generate a new one
                return {
                    ...newTask,
                    completed: false,
                    rescheduledFrom: today,
                };
            });

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


// const rescheduleMissedTasks = async (userId, checklistType) => {
//     try {
//         const today = new Date().toISOString().split('T')[0];
//         const checklist = await Checklist.findOne({ user: userId, checklistType });

//         if (!checklist) {
//             console.log(`No checklist found for user ${userId} and type ${checklistType}`);
//             return;
//         }

//         const missedTasks = checklist.items.filter(
//             (item) => !item.completed && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low')
//         );

//         if (missedTasks.length > 0) {
//             const rescheduledTasks = missedTasks.map((task) => ({
//                 ...task.toObject(),
//                 completed: false,
//                 rescheduledFrom: today,
//             }));

//             checklist.items.push(...rescheduledTasks);
//             await checklist.save();

//             console.log(
//                 `Rescheduled ${rescheduledTasks.length} tasks for user ${userId} in checklist type ${checklistType}`
//             );
//         } else {
//             console.log(`No high-priority tasks to reschedule for user ${userId}`);
//         }
//     } catch (err) {
//         console.error('Error in rescheduling missed tasks:', err);
//     }
// };


const toggleTaskCompletion = async (req, res) => {
    try {
        const { userId, checklistType, taskId, isCompleted } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskId || isCompleted === undefined) {
            return res.status(400).json({
                message: 'User ID, checklist type, task ID, and isCompleted status are required',
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

        // Find the task by ID
        const task = checklist.items.id(taskId);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Update the is_completed field
        task.completed = isCompleted;

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Task completion status updated successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error updating task completion status:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



const generateMorningReport = async (req, res) => {
    try {
        // console.log("Hi i am running")
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: "User ID and checklist type are required",
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType: "Morning" });

        if (!checklist) {
            return res.status(404).json({
                message: "No checklist found for the morning report.",
                success: false,
            });
        }

        // Aggregate data for stats
        const totalTasks = checklist.items.length;

        const completedTasks = checklist.items.filter((task) => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        // Group tasks by priority and status
        const priorityStats = {
            high: checklist.items.filter((task) => task.priority === "high" && task.completed).length,
            medium: checklist.items.filter((task) => task.priority === "medium" && task.completed).length,
            low: checklist.items.filter((task) => task.priority === "low" && task.completed).length,
        };

        const completionPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);

        // Prepare the response
        res.status(200).json({
            message: "Morning report generated successfully",
            success: true,
            data: {
                totalTasks,
                completedTasks,
                pendingTasks,
                completionPercentage,
                priorityStats,
            },
        });
    } catch (err) {
        Console.log("The report API ran")
        console.error("Error generating morning report:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};



module.exports = {
    createCustomChecklist ,
    getChecklists,
    updateChecklist,
    deleteChecklistItem,
    rescheduleMissedTasks,
    toggleTaskCompletion,
    getLowPriorityItems,
    gethighPriorityItems,
    getmediumPriorityItems,
    getempthyPriorityItems,
    generateMorningReport
};
