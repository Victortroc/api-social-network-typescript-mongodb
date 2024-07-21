import * as SessionController from "../SessionController";
import AuthUserService from "../../services/UserServices/AuthUserService";
import { SendRefreshToken } from "../../helpers/SendRefreshToken";
import { Request, Response } from "express";
import { getIO } from "../../libs/socket";

jest.mock("../../helpers/SendRefreshToken");
jest.mock("../../services/UserServices/AuthUserService");
jest.mock("../../libs/socket");

describe("Session Controller", () => {
  test("Should store session successfully", async () => {
    const mockAuthUserService = AuthUserService as jest.MockedFunction<typeof AuthUserService>;

    const mockSerializedUser = {
      id: "userId123",
      username: "testuser",
      email: "emailqualquer@gmail.com"
    };

    mockAuthUserService.mockResolvedValueOnce({
      token: "testToken",
      serializedUser: mockSerializedUser,
      refreshToken: "testRefreshToken"
    });

    const req = {
      body: {
        email: "emailqualquer@gmail.com",
        password: "123"
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any as Response;

    // Mock do getIO para evitar erro de inicialização do Socket.IO
    const mockIo = {
      emit: jest.fn()
    };
    (getIO as jest.Mock).mockReturnValue(mockIo);

    await SessionController.store(req, res);

    expect(mockAuthUserService).toHaveBeenCalledTimes(1);
    expect(mockAuthUserService).toHaveBeenCalledWith({
      email: req.body.email,
      password: req.body.password
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "testToken",
      user: mockSerializedUser
    });
    expect(mockIo.emit).toHaveBeenCalledWith(`user-${mockSerializedUser.id}-auth`, {
      action: "update",
      user: {
        id: mockSerializedUser.id,
        username: mockSerializedUser.username,
        email: mockSerializedUser.email,
      }
    });
  });
});
