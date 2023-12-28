import { useLog } from "../../lib/log";
import { MockResponse } from "../../model/entities/MockResponse";
import { MockResponseRepository } from "../../model/repositories/mock-response.repository";
import { MockRepository } from "../../model/repositories/mock.repository";

const log = useLog({
  dirname: __dirname,
  filename: __filename,
});

export class MockResponseService {
  constructor(
    private readonly mockResponseRepository: MockResponseRepository,
  ) {}

  getByUserId(userId: string) {
    return this.mockResponseRepository.getByUserId(userId);
  }

  getById(userId: string, mockResponseId: string) {
    return this.mockResponseRepository.getById(userId, mockResponseId);
  }

  deleteById(userId: string, mockResponseId: string) {
    return this.mockResponseRepository.deleteById(userId, mockResponseId);
  }

  editResponse(
    userId: string,
    mockResponseId: string,
    mockResponse: Partial<MockResponse>,
  ) {
    return this.mockResponseRepository.editById(
      userId,
      mockResponseId,
      mockResponse,
    );
  }

  async createResponse(
    userId: string,
    mockId: string,
    mockResponse: Omit<
      MockResponse,
      "id" | "createdAt" | "updatedAt" | "mockId" | "mock" | "sequenceIndex"
    >,
  ) {
    const createdMock = await this.mockResponseRepository.create(
      userId,
      mockId,
      mockResponse,
    );

    return createdMock;
  }

  async createResponses(
    userId: string,
    mockId: string,
    mockResponse: Omit<
      MockResponse,
      "id" | "createdAt" | "updatedAt" | "mockId" | "mock" | "sequenceIndex"
    >[],
  ) {
    const createdMock = await this.mockResponseRepository.createMany(
      userId,
      mockId,
      mockResponse,
    );

    return createdMock;
  }
}
