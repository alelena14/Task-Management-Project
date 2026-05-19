package com.example.taskmanagement.audit.entity;

public enum AuditAction {

    LOGIN,
    REGISTER,

    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    ADD_MEMBER,

    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,

    ACCESS_DENIED,
    VALIDATION_ERROR,
    SYSTEM_ERROR

}