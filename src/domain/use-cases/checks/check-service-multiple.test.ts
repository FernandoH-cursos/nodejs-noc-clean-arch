import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";
describe("CheckService UseCase", () => {
  //* Mocks de logRepository, successCallback y errorCallback 
  const mockRepositories = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback
  );

  const [mockRepo1, mockRepo2, mockRepo3] = mockRepositories;

  beforeEach(() => {
    //* Limpiando mocks
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch return true", async () => {
    const wasOk = await checkServiceMultiple.execute("https://google.com");

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch return false", async () => {
    const wasOk = await checkServiceMultiple.execute("http://localhost:3000");

    expect(wasOk).toBe(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
