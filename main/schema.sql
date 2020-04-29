CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    project_name VARCHAR REFERENCES project(pname),
    user_id INT REFERENCES users(uid),
    task_owner VARCHAR REFERENCES users(username),
    taskname VARCHAR(255) UNIQUE,
    task_description VARCHAR(255),
    date_created DATE,
    date_end DATE,
    expected_duration INT,
    actual_duration INT,
    complexity_level INT
);

CREATE TABLE project (
    pid SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(uid),
    project_owner VARCHAR REFERENCES users(username),
    pname VARCHAR(255) UNIQUE,
    duration INT,
    date_created DATE,
    complete BOOLEAN
);

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    role VARCHAR(255)
);