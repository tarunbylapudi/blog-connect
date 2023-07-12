const User = require("../model/User");
const { register } = require("../controller/blog");

jest.mock("../model/User");

describe("register", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a user and return a token", async () => {
    const mockUser = {
      getSignedJwtToken: jest.fn().mockReturnValueOnce("token123"),
    };

    jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: "token123",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("should call next with an error if registration fails", async () => {
    const error = new Error("Registration failed");
    jest.spyOn(User, "create").mockRejectedValueOnce(error);

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
