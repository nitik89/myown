var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');


const { getAllEventManagers,
     createEvents,
      getAllEvents,
       getEventById,
       getOnlyMyStudents,
        getAllStudents,
        deleteEvents,
        deleteEventManagers } = require('../controllers/events');

const { isSignedIn, isAdmin, isAuthenticated,isEventManager } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
//routes
router.get('/alleventManagers/:userId',isSignedIn,isAuthenticated,isAdmin ,getAllEventManagers);//done
router.get('/getEvents/:userId',isSignedIn,isAuthenticated ,getAllEvents);//done
router.get('/getEvent/:id/:userId',isSignedIn,isAuthenticated ,getEventById);//done
router.get('/allstudents/:userId' ,isSignedIn,isAuthenticated,isAdmin ,getAllStudents);//done
router.get('/getonlymyStudents/:userId/',isSignedIn,isAuthenticated,isEventManager,getOnlyMyStudents);//done
router.post('/addEvent/:userId', isSignedIn,isAuthenticated,isAdmin,createEvents);//done
router.delete('/deleteEvent/:id/:userId',isSignedIn,isAuthenticated,isAdmin,deleteEvents); //done
router.delete('/deleteEventManagers/:id/:userId',isSignedIn,isAuthenticated,isAdmin ,deleteEventManagers);//done
module.exports = router;