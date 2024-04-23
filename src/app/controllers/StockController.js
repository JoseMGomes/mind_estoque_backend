import * as Yup from "yup";
import Stock from "../models/Stock";

class StockController {
    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                description: Yup.string(),
                is_active: Yup.boolean(),
                is_stock_entry: Yup.boolean(),
                value: Yup.number(),
            });
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Falha na validação" });
            }
            const stock = await Stock.create(req.body);

            return res.status(200).json({ ...stock.dataValues });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "erro no servidor" });
        }
    }

    async findAll(req, res) {
        try {
            const stock = await Stock.findAll();
            return res.status(200).json(stock);
        } catch (err) {
            return res.status(500).json({ error: "erro no servidor" });
        }
    }

    async FindOne(req, res) {
        try {
            const stock = await Stock.findOne({ id: req.params.stockId });
            return res.status(200).json(stock);
        } catch (err) {
            return res.status(500).json({ error: "erro no servidor" });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                description: Yup.string(),
                is_active: Yup.boolean(),
                is_stock_entry: Yup.boolean(),
                value: Yup.number(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Erro de validação" });
            }
            const stock = await Stock.findByPk(req.params.stockId);
            const result = await stock.update(req.body);

            return res.json({ ...result.dataValues });
        } catch (err) {
            return res.status(500).json({ error: "erro no servidor" });
        }
    }

    async add_item(req, res) {
        try {
            const stock = await Stock.findByPk(req.params.stockId);

            if (!stock) {
                return res.status(400).json({ error: "Item não existe." });
            }

            const result = await stock.update({ quant: stock.quant + 1 });

            return res.status(200).json({ ...result.dataValues });
        } catch (err) {
            return res.status(500).json({ error: "erro no servidor" });
        }
    }

    async remove_item(req, res) {
        try {
            const stock = await Stock.findByPk(req.params.stockId);

            if (!stock) {
                return res.status(400).json({ error: "Item não existe." });
            }
            console.log(stock.quant);
            if (stock.quant - 1 < 0) {
                return res
                    .status(400)
                    .json({ error: "Não é possivel diminuir mais diminuir item" });
            }
            const result = await stock.update({ quant: stock.quant - 1 });

            return res.status(200).json({ ...result.dataValues });
        } catch (err) {
            return res.status(500).json({ error: "erro no servidor" });
        }
    }
}

export default new StockController();

