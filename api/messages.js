import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');
export const Game = new Mongo.Collection('game');