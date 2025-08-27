const procesoService = require('../services/proceso.service');

class ProcesoController {
  async getProcesos(req, res) {
    try {
      const procesos = await procesoService.getProcesos();
      res.json({ success: true, data: procesos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createProceso(req, res) {
    try {
      const newProceso = await procesoService.createProceso(req.body);
      res.status(201).json({ success: true, data: newProceso });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async updateProceso(req, res) {
    try {
      const updatedProceso = await procesoService.updateProceso(req.params.id, req.body);
      res.json({ success: true, data: updatedProceso });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new ProcesoController();