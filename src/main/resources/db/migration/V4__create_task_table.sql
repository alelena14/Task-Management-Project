CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    deadline TIMESTAMP,
    assigned_user_id BIGINT,
    creator_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT fk_assigned_user
        FOREIGN KEY (assigned_user_id)
        REFERENCES users(id),

    CONSTRAINT fk_creator
        FOREIGN KEY (creator_id)
        REFERENCES users(id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
);