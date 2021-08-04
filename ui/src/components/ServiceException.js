export default class ServiceException extends Error {
    code;
    message;
    details;

    constructor(code, message, details) {
        super(details);
        this.code = code;
        this.message = message;
        this.details = details;
    }
}