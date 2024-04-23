import Sequelize  from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database';
import Stock from '../app/models/Stock';

const models = [User, Stock];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
    }
}

export default new Database();
