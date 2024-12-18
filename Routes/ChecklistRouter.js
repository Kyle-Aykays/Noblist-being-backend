const express = require('express');
const {
    createCustomChecklist,
    getChecklists,
    updateChecklist,
    deleteChecklistItem,
    toggleTaskCompletion,
    getLowPriorityItems,
    gethighPriorityItems,
    getmediumPriorityItems,
    getempthyPriorityItems,
    generateMorningReport
} = require('../Controllers/ChecklistController');

const router = express.Router();

// Routes
router.post('/create', createCustomChecklist); // Create a new checklist
router.post('/get', getChecklists); // Get checklists by user and type
router.post('/getlowpriority', getLowPriorityItems); // Get checklists by user and type
router.post('/gethighpriority', gethighPriorityItems); // Get checklists by user and type
router.post('/getmediumpriority', getmediumPriorityItems); // Get checklists by user and type
router.post('/getpriority', getempthyPriorityItems); // Get checklists by user and type

router.put('/update', updateChecklist); // Update an existing checklist
router.delete('/delete', deleteChecklistItem); // Delete a checklist
router.put('/toggle-completion', toggleTaskCompletion); // Add the new route
router.post('/morning-report', generateMorningReport);

module.exports = router;
