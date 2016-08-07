import { Mongo } from 'meteor/mongo';

Messages = new Mongo.Collection('messages');
Game = new Mongo.Collection('game');
Players = new Mongo.Collection('players');