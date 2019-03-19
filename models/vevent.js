'use strict';

const Model = require("./model");
const ENV = (process.env.ENV || 'dev');
const moment = require('moment')

module.exports = class VEvent extends Model { 
    constructor() { 
        super(); 
    } 

    create(data) {

        let dataValues = [data.device_id, data.lat, data.lng, data.speed, data.event_type, new Date().toISOString().slice(0, 19).replace('T', ' ')];
        return this.dbQuery('INSERT INTO vevent (device_id, lat, lng, speed, event_type, created_at) VALUES ( ? , ? , ?, ?, ?, ?)', dataValues);
    }

    /*
        @param:
        Return select all result from table
    */
    getAll() {
        return this.dbQuery('SELECT id, device_no, created_at FROM vevent ve INNER JOIN device d ON ve.device_id = d.device_id ORDER BY id DESC');
    }

  
    /*
        @param:
            Data {Object} : id
        Return select result from table respect to the id
    */
    getById(data) {
        let dataValues = [data.id];
        return this.dbQuery('SELECT * FROM vevent ve INNER JOIN device d ON ve.device_id = d.device_id WHERE ve.id = ?', [dataValues]);
    }
}