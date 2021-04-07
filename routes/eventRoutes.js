var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const imageMid=require('../controllers/imageMiddleware');
const validImg=require('../controllers/validation');
const { getAllEventManagers,
     createEvents,
      getAllEvents,
       getEventById,
       getOnlyMyStudents,
        getAllStudents,
        deleteEvents,
        deleteEventManagers, 
        changeStatus} = require('../controllers/events');

const { isSignedIn, isAdmin, isAuthenticated,isEventManager } = require("../controllers/auth");
const { getUserById, getUser } = require("../controllers/user");

//params
router.param("userId", getUserById);
//routes
router.get('/getuser/:userId',isSignedIn,isAuthenticated,getUser);
router.get('/alleventManagers/:userId',isSignedIn,isAuthenticated,isAdmin ,getAllEventManagers);//done
router.get('/getEvents/:userId',isSignedIn,isAuthenticated ,getAllEvents);//done
router.get('/getEvent/:id/:userId',isSignedIn,isAuthenticated ,getEventById);//done
router.get('/allstudents/:userId' ,isSignedIn,isAuthenticated,isAdmin ,getAllStudents);//done
router.get('/getonlymyStudents/:userId/',isSignedIn,isAuthenticated,isEventManager,getOnlyMyStudents);//done
router.post('/addEvent/:userId', isSignedIn,isAuthenticated,isAdmin,createEvents);//done
router.delete('/deleteEvent/:id/:userId',isSignedIn,isAuthenticated,isAdmin,deleteEvents); //done
router.put('/changeStatus/:EventId/:userId',isSignedIn,isAuthenticated,isAdmin,changeStatus);
router.delete('/deleteEventManagers/:id/:userId',isSignedIn,isAuthenticated,isAdmin ,deleteEventManagers);//done
module.exports = router;