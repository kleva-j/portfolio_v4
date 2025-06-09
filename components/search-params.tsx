import { parseAsInteger, createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const createPaginationParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(4),
};

export const loadPaginationParams = createLoader(createPaginationParams);
