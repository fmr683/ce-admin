'use strict';

const Model = require("./model");
const ENV = (process.env.ENV || 'dev');
const moment = require('moment')

module.exports = class VEventImage extends Model { 
    constructor() { 
        super(); 
    } 

    create(data) {

        let dataValues = [data.event_id, data.image];
        return this.dbQuery('INSERT INTO vevent_images (event_id, image) VALUES ( ?, ?)', dataValues);
    }

    /*
        @param:
        Return select all result from table
    */
    getAll() {
        return this.dbQuery('SELECT id, device_no, created_at FROM vevent ve INNER JOIN device d ON ve.device_id = d.device_id ');
    }

  
    /*
        @param:
            Data {Object} : id
        Return select result from table respect to the id
    */
    getEventId(data) {
        let dataValues = [data.id];
        return this.dbQuery('SELECT * FROM vevent_images  WHERE event_id = ?', [dataValues]);
    }
}