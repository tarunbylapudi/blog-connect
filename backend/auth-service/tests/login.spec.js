const User = require("../model/User");
const { login } = require("../controller/blog");
const ErrorResponse = require("../utils/ErrorResponse");


    // Tests that a valid email and password returns a token
    it('test_valid_email_and_password', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, token: expect.any(String) });
    },10000);

    // Tests that an error is thrown when email is missing
    it('test_missing_email', async () => {
        const req = {
            body: {
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        expect(next.mock.calls[0][0].statusCode).toBe(400);
        expect(next.mock.calls[0][0].message).toBe('Please provide an email and a password');
    });

    // Tests that an error is thrown when password is missing
    it('test_missing_password', async () => {
        const req = {
            body: {
                email: 'test@test.com'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        expect(next.mock.calls[0][0].statusCode).toBe(400);
        expect(next.mock.calls[0][0].message).toBe('Please provide an email and a password');
    });

    // Tests that an error is thrown when email is unregistered
    it('test_unregistered_email', async () => {
        const req = {
            body: {
                email: 'unregistered@test.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        expect(next.mock.calls[0][0].statusCode).toBe(400);
        expect(next.mock.calls[0][0].message).toBe('unregistered User');
    });

    // Tests that an error is thrown when password is invalid
    it('test_invalid_password', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: 'invalidpassword'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        expect(next.mock.calls[0][0].statusCode).toBe(400);
        expect(next.mock.calls[0][0].message).toBe('invalid credentials');
    });

    // Tests that errors are passed to next middleware with status code and message
    it('test_error_handling', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const errorMessage = 'Test Error';
        const error =  new ErrorResponse(errorMessage, 500);
        User.findOne = jest.fn().mockRejectedValue(error);

        await login(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });