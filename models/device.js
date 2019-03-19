'use strict';

const Model = require("./model");
const ENV = (process.env.ENV || 'dev');
const moment = require('moment')

module.exports = class Device extends Model { 
    constructor() { 
        super(); 
    } 


     /*
        @param:
            Data {Object} : seller_id, buyer_id, message
        Return db insertion status
    */
    create(data) {

        let now = moment();
        let dataValues = [data.device_id, data.lat, data.lng, data.speed, data.event_type, now.format()];
        return this.dbQuery('INSERT INTO vevent (device_id, lat, lng, speed, event_type, created_at) VALUES ( ? , ? , ?, ?, ?, ?)', dataValues);
    }

    /*
        @param:
        Return select all result from table
    */
    getAll() {
        return this.dbQuery('SELECT * FROM device ');
    }

  
    /*
        @param:
            Data {Object} : id
        Return select result from table respect to the id
    */
    getById(data) {
        let dataValues = [data.device_id];
        return this.dbQuery('SELECT device_id, device_no, status FROM device WHERE device_id = ?', [dataValues]);
    }
}