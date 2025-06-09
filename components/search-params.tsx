import { parseAsFloat, createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const createPaginationParams = {
  page: parseAsFloat.withDefault(0),
  limit: parseAsFloat.withDefault(10),
};

export const loadPaginationParams = createLoader(createPaginationParams);
