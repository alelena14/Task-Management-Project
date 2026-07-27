CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    owner_id BIGSERIAL,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,

    CONSTRAINT fk_project_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
);

CREATE TABLE project_members (
    project_id BIGSERIAL NOT NULL,
    user_id BIGSERIAL NOT NULL,

    PRIMARY KEY (project_id, user_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id),

    CONSTRAINT fk_member
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);