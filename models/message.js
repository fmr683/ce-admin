'use strict';

const Model = require("./model");
const jwt = require('jsonwebtoken');
const config = require('config');
const ENV = (process.env.ENV || 'dev');

module.exports = class Message extends Model { 
    constructor() { 
        super(); 
    } 

    /*
        @param:
            Data {Object} : seller_id, buyer_id, message
        Return db insertion status
    */
    createMessage(data) {
        let dataValues = [data.seller_id, data.buyer_id, data.message];
        return this.dbQuery('INSERT INTO messages (seller_id, buyer_id, message) VALUES ( ? , ? , ?)', dataValues);
    }

    /*
        @param:
            Data {Object} : seller_id, offset
        Return Select data from message table along with buyer information
    */
    getAllSellerMessages(data) {
        let dataValues = [data.seller_id, data.seller_id, data.offset];
        return this.dbQuery('SELECT (SELECT SUBSTRING(m2.message,1,50) FROM messages m2 WHERE m2.seller_id = ? AND m2.buyer_id = m.buyer_id ORDER BY m2.id DESC LIMIT 1) AS message, fname, buyer_id FROM messages m JOIN users u ON buyer_id = u.id WHERE seller_id = ? GROUP BY buyer_id ORDER BY m.id DESC  LIMIT 10 OFFSET ? ', dataValues);
    }

    /*
        @param:
            Data {Object} : seller_id
        Return select message count from buyer
    */
    getAllSellerMessagesCount(data) {
        let dataValues = [data.seller_id];
        return this.dbQuery('SELECT m.id AS count FROM messages m JOIN users u ON buyer_id = u.id WHERE seller_id = ? GROUP BY buyer_id ', dataValues);
    }

    /*
        @param:
            Data {Object} : seller_id, buyer_id, offset
        Return Select data from message table along with buyer information
    */
    getDetailMessage(data) {
        let dataValues = [data.seller_id, data.buyer_id, data.offset];
        return this.dbQuery('SELECT m.message, fname FROM messages m JOIN users u ON buyer_id = u.id WHERE seller_id = ? AND buyer_id = ? ORDER BY m.id DESC LIMIT 10 OFFSET ? ', dataValues);
    }

    /*
        @param:
            Data {Object} : seller_id
        Return select message count from buyer
    */
    getDetailMessageCount(data) {
        let dataValues = [data.seller_id, data.buyer_id];
        return this.dbQuery('SELECT COUNT(m.id) AS count FROM messages m JOIN users u ON buyer_id = u.id WHERE seller_id = ? AND buyer_id = ? ', dataValues);
    }
  
    /*
        @param:
            Data {Object} : buyer_id, offset
        Return Select data from message table along with seller information
    */
    getAllBuyerMessages(data) {
        let dataValues = [data.buyer_id, data.buyer_id, data.offset];
        return this.dbQuery('SELECT (SELECT SUBSTRING(m2.message,1,50) FROM messages m2 WHERE m2.buyer_id = ? AND m2.seller_id = m.seller_id ORDER BY m2.id DESC LIMIT 1) AS message, fname, seller_id FROM messages m JOIN users u ON seller_id = u.id WHERE buyer_id = ? GROUP BY seller_id ORDER BY m.id DESC  LIMIT 10 OFFSET ? ', dataValues);
    }

    /*
        @param:
            Data {Object} : seller_id
        Return select message count from buyer
    */
    getAllBuyerMessagesCount(data) {
        let dataValues = [data.buyer_id];
        return this.dbQuery('SELECT COUNT(m.id) AS count FROM messages m JOIN users u ON seller_id = u.id WHERE buyer_id = ? GROUP BY seller_id ', dataValues);
    }

    
 }