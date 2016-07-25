import { Meteor } from 'meteor/meteor';
import { Messages } from '../api/messages.js';

Meteor.startup(() => {
  // code to run on server at startup
    if(Meteor.isServer){
        console.log("Meteor.isServer", Meteor.isServer);
    }
});
