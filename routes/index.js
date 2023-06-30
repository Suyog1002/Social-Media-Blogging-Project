const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const profile=require('../controllers/pratice_controller');
console.log('Router loaded');

router.get('/',homeController.home);
router.get('/practice',profile.practice);
router.use('/users',require('./users'));

// for any futher routes,access from here
//router,use('/routerName',require('/routerfile'));
module.exports=router;
