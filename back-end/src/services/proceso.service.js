const procesoRepository = require('../repositories/proceso.repository');

class ProcesoService {
  async getProcesos() {
    return procesoRepository.findAll();
  }

  async createProceso(procesoData) {
    const { nombre, descripcion, paso } = procesoData;
    if (!nombre || !paso) {
      throw new Error('Nombre y paso son campos requeridos.');
    }
    const existingProceso = await procesoRepository.findByPaso(paso);
    if (existingProceso) {
      throw new Error('Ya existe un proceso con este número de paso.');
    }
    return procesoRepository.create(nombre, descripcion, paso);
  }

  async updateProceso(id, procesoData) {
    const { nombre, descripcion } = procesoData;
    if (!nombre) {
      throw new Error('Nombre es campo requerido.');
    }
    return procesoRepository.update(id, { nombre, descripcion });
  }
}

module.exports = new ProcesoService();