﻿function customLoginTest(emailAddress, password) {	if (emailAddress === "admin") {		return false;	}		var sessionRef = currentSession(); // Get session.	//May need permission to read User class for new session.	sessionRef.promoteWith('Administrator');		var myUser = ds.User({email:emailAddress});	if (myUser === null) {		return false;	} else {		//we will handle login		if (myUser.validatePassword(password)) {			var theGroups = [];						switch (myUser.role) {				case "Administrator":				theGroups = ['Administrator'];				break;				case "Manager":				theGroups = ['Manager'];				break;				default:				theGroups = ['Employee'];				break;			}						var connectTime = new Date();			return {				ID: myUser.id,				name: myUser.email, //myUser.login,				fullName: myUser.fullName, 				belongsTo: theGroups,				storage: {time: connectTime}			}					} else {					return {error: 1024, errorMessage: "invalid login"};		}			}		currentSession().unPromote();}