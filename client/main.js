import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Messages } from '../api/messages';
import './main.html';
import { Accounts } from 'meteor/accounts-base';

// register user without password
// Accounts.ui.config({
//    passwordSignupFields:'USERNAME_ONLY',
// });


// restore game data into user