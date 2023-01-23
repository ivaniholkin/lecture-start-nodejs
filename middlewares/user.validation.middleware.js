import { USER } from '../models/user.js';
import { userService } from '../services/userService.js';
import { getUserAgent } from '../utils/userAgent.js';

const GMAIL_REGEXP = new RegExp(/^([a-zA-Z0-9_\-\.]+)@(gmail+)\.(com)$/, 'g');
const PHONE_REGEXP = new RegExp(
    /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/,
    'g'
);

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for USER entity during creation
    try {
        let userAgent = getUserAgent(
            req.headers['user-agent'],
            'PostmanRuntime/7.30.0',
            req
        );
        userService.checkKeyInModel(USER, userAgent);
        const { firstName, lastName, email, phoneNumber, password } = userAgent;
        console.log('firstName', firstName);
        if (!firstName) {
            throw new Error(`Validation failed. First name is empty`);
        }
        if (!lastName) {
            throw new Error(`Validation failed. Last name is empty`);
        }
        if (!phoneNumber) {
            throw new Error(`validation failed. Phone number is empty`);
        }
        if (!PHONE_REGEXP.test(phoneNumber)) {
            throw new Error(`validation failed. Phone number is incorrect `);
        }
        if (!email) {
            throw new Error(`validation failed. Email is empty`);
        }
        if (!GMAIL_REGEXP.test(email)) {
            throw new Error(`validation failed. Email is incorrect`);
        }
        if (!password) {
            throw new Error(`validation failed. Password is empty`);
        }
        if (password.length < 3) {
            throw new Error(`validation failed. Password is too short`);
        }

        const user = {
            firstName: userService.trimAndLowercaseData(firstName),
            lastName: userService.trimAndLowercaseData(lastName),
            email,
            phoneNumber,
            password,
        };
        return (req.body = user);
    } catch ({ message }) {
        req.body = {
            error: true,
            message,
        };
        return req.body;
    } finally {
        next();
    }
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    try {
        let userAgent = getUserAgent(
            req.headers['user-agent'],
            'PostmanRuntime/7.30.0',
            req
        );
        const { firstName, lastName, email, phoneNumber, password } = userAgent;
        console.log(firstName);
        if (!firstName && !lastName && !email && !phoneNumber && !password) {
            throw new Error(
                `Validation failed. At least one field from the model must be present`
            );
        } else {
            userService.checkKeyInModel(USER, userAgent);
            if (email && !GMAIL_REGEXP.test(email)) {
                throw new Error(`validation failed. Email is incorrect`);
            }
            if (phoneNumber && !PHONE_REGEXP.test(phoneNumber)) {
                throw new Error(
                    `validation failed. Phone number is incorrect `
                );
            }
            if (password && password.length < 3) {
                throw new Error(`validation failed. Password is too short`);
            }
            const user = {
                ...userAgent,
            };
            return (req.body = user);
        }
    } catch ({ message }) {
        req.body = {
            error: true,
            message,
        };
        return req.body;
    } finally {
        next();
    }
};

export { createUserValid, updateUserValid };