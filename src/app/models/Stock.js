import Sequelize, { Model } from "sequelize";

class Stock extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                image_path: Sequelize.STRING,
                description: Sequelize.STRING,
                is_active: Sequelize.BOOLEAN,
                is_stock_entry: Sequelize.BOOLEAN,
                quant: Sequelize.INTEGER,
                value: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Stock;

