CREATE TABLE parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    tier VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compatibility_rules (
    id SERIAL PRIMARY KEY,
    part_a_type VARCHAR(50) NOT NULL,
    part_b_type VARCHAR(50) NOT NULL,
    compatibility_condition TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE builds (
    id SERIAL PRIMARY KEY,
    budget NUMERIC(10, 2) NOT NULL,
    use_case VARCHAR(100),
    build_details JSONB,
    total_price NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
