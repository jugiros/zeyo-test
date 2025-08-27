const db = require('../database/db');
const BlockchainSimulator = require('../utils/blockchain');

class ProcesoRepository {
  async findAll() {
    const res = await db.query('SELECT * FROM procesos_de_negocio ORDER BY paso ASC');
    return res.rows;
  }

  async findByPaso(paso) {
    const res = await db.query('SELECT * FROM procesos_de_negocio WHERE paso = $1', [paso]);
    return res.rows[0];
  }

  async getLastHash() {
    const res = await db.query('SELECT hash_actual FROM procesos_de_negocio ORDER BY id DESC LIMIT 1');
    return res.rows[0]?.hash_actual || null;
  }

  async create(nombre, descripcion, paso) {
    const previousHash = await this.getLastHash();
    const data = { nombre, descripcion, paso };
    const currentHash = previousHash 
      ? BlockchainSimulator.generateHash(data, previousHash)
      : BlockchainSimulator.createGenesisHash();

    const initialHistory = [{
      fecha: new Date().toISOString(),
      accion: 'creacion',
      hash: currentHash
    }];

    const res = await db.query(
      'INSERT INTO procesos_de_negocio (nombre, descripcion, paso, historial_cambios, hash_anterior, hash_actual) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, paso, JSON.stringify(initialHistory), previousHash, currentHash]
    );
    return res.rows[0];
  }

  async update(id, updateData) {
    const existing = await db.query('SELECT * FROM procesos_de_negocio WHERE id = $1', [id]);
    if (!existing.rows[0]) throw new Error('Proceso no encontrado');

    const previousHash = existing.rows[0].hash_actual;
    const currentHash = BlockchainSimulator.generateHash(updateData, previousHash);
    
    const currentHistory = JSON.parse(existing.rows[0].historial_cambios || '[]');
    currentHistory.push({
      fecha: new Date().toISOString(),
      accion: 'actualizacion',
      cambios: updateData,
      hash: currentHash
    });

    const { nombre, descripcion } = updateData;
    const res = await db.query(
      'UPDATE procesos_de_negocio SET nombre = $1, descripcion = $2, historial_cambios = $3, hash_anterior = $4, hash_actual = $5, fecha_modificacion = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [nombre, descripcion, JSON.stringify(currentHistory), previousHash, currentHash, id]
    );
    return res.rows[0];
  }
}

module.exports = new ProcesoRepository();