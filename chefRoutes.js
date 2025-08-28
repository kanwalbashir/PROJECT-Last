const express = require('express');
const router = express.Router();
const chefController = require('../controller/chefController');
const upload = require('../middleware/uploadMiddleware');

// Public route: get chefs
router.get('/', chefController.getChefs);

// Admin routes
router.post('/', upload.single('image'), chefController.createChef); 
router.put('/:id', chefController.updateChef);
router.delete('/:id', chefController.deleteChef);
router.get('/', chefController.getChefs); 


module.exports = router;