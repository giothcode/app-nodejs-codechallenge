import { BaseRequest } from "../../lib";
import { IGetTransactionsOptions, ITransactionsResponse } from "./interfaces";

class TransactionsBaseAPI {
  private request: BaseRequest;

  constructor() {
    this.request = new BaseRequest("TransactionService");
  }

  /**
   * Retrieves transactions based on the provided query options.
   *
   * @param {IGetTransactionsOptions} query - The query options for retrieving transactions. Includes parameters like filters, pagination, etc.
   * @returns {Promise<ITransactionsResponse | null>} A promise that resolves to the transactions response object or null in case of an error.
   * @throws {Error} Catches and logs any error encountered during the request.
   * @async
   */
  async getTransactions(
    query: IGetTransactionsOptions
  ): Promise<ITransactionsResponse | null> {
    try {
      const { data } = await this.request.send({
        path: "/api/v1/transactions",
        method: "GET",
        params: query,
      });

      return data || null;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}

export const TransactionsAPI = new TransactionsBaseAPI();
