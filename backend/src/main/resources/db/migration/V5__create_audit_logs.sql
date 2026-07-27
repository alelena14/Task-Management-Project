CREATE TABLE audit_logs (

    id BIGSERIAL PRIMARY KEY,

    action VARCHAR(100) NOT NULL,

    entity_type VARCHAR(100) NOT NULL,

    entity_id BIGINT,

    user_email VARCHAR(255),

    timestamp TIMESTAMP NOT NULL
);