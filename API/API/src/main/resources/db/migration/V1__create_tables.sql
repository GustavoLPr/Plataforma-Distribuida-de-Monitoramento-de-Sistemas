CREATE TABLE maquinas (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
ip VARCHAR(45),
criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE metricas (
id SERIAL PRIMARY KEY,
maquina_id INT NOT NULL,
cpu_percent DECIMAL(5,2) NOT NULL,
memoria_percent DECIMAL(5,2) NOT NULL,
disco_percent DECIMAL(5,2) NOT NULL,
coletado_em TIMESTAMP DEFAULT NOW(),
CONSTRAINT fk_maquina
FOREIGN KEY (maquina_id)
REFERENCES maquinas(id)
ON DELETE CASCADE
);

CREATE INDEX idx_metricas_maquina_data
ON metricas (maquina_id, coletado_em DESC);