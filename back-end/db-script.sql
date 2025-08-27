-- Database: zeyo-test

-- DROP DATABASE IF EXISTS "zeyo-test";

CREATE
DATABASE "zeyo-test"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Latin America.1252'
    LC_CTYPE = 'Spanish_Latin America.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Crear la tabla para los procesos de negocio
CREATE TABLE procesos_de_negocio
(
    id                 SERIAL PRIMARY KEY,
    nombre             VARCHAR(255) NOT NULL,
    descripcion        TEXT,
    paso               INTEGER      NOT NULL UNIQUE,
    historial_cambios  JSONB,
    hash_anterior      VARCHAR(64),
    hash_actual        VARCHAR(64) NOT NULL,
    fecha_creacion     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear un índice para la columna 'paso'
CREATE INDEX idx_paso ON procesos_de_negocio (paso);

