import Stock from "../models/Stock";

class FileController {
    async store(req, res) {
        try {
            const { filename: path } = req.file;
            const stock = await Stock.findByPk(req.params.stockId);
            if (!stock) {
                return res.status(400).json({ error: "Esse item não existe" });
            }

            const result = await stock.update({ image_path: path });
            return res.status(200).json({
                sucess: true,
                result,
            });
        } catch (err) {
            return res.status(500).json({
                sucess: false,
            });
        }
    }
}

export default new FileController();

