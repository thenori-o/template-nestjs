import { SearchResult } from "../../domain/repository/repository-contracts";
import { PaginationOutputMapperDto } from "./pagination-output";

describe("PaginationOutputMapper Unit Tests", () => {
  it("should convert a searchResult in Output", () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'fake'
    });

    const output = PaginationOutputMapperDto.toOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    })
  });
});
