const express = require('express');
const authMiddleware= require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware')
const {getAllUser, getAllContact, delteUserById,getUserById,updateUserById,deleteContactById} = require('../controllers/admin-controller');
const router= express.Router();

router.route('/user').get(authMiddleware,adminMiddleware,getAllUser);
router.route('/user/:id').get(authMiddleware,adminMiddleware,getUserById);
//update single user route
router.route('/user/update/:id').patch(authMiddleware,adminMiddleware,updateUserById);

router.route('/user/delete/:id').delete(authMiddleware,adminMiddleware,delteUserById);


router.route('/contact').get(authMiddleware,adminMiddleware,getAllContact);
//deleting single contact 
router.route('/contact/delete/:cid').delete(authMiddleware,adminMiddleware,deleteContactById);

module.exports = router;