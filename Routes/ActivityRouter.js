const express = require('express');
const {
    createActivity,
    getActivityItems,
    updateActivityItem,
    deleteActivityItem,
} = require('../Controllers/ActivityController');

const router = express.Router();

router.post('/create', createActivity); // Create an activity
router.post('/get', getActivityItems); // Get activities
router.put('/update', updateActivityItem); // Update an activity
router.delete('/delete', deleteActivityItem); // Delete an activity

module.exports = router;
