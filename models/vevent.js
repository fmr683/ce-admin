'use strict';

const Model = require("./model");
const ENV = (process.env.ENV || 'dev');

module.exports = class Message extends Model { 
    constructor() { 
        super(); 
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
    getById(data) {
        let dataValues = [data.id];
        return this.dbQuery('SELECT * FROM vevent ve INNER JOIN device d ON ve.device_id = d.device_id  WHERE id = ?', [dataValues]);
    }
}