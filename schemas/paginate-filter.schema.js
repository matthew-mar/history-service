import { ActionType } from "@prisma/client";

const fiveYearsMilliseconds = 365 * 24 * 60 * 60 * 1000 * 5;

const yearsAgo = () => {
    return Date.now() - fiveYearsMilliseconds;
}

const yearsAhead = () => {
    return Date.now() + fiveYearsMilliseconds;
}

export const actionPaginateFilterOptions = {
    schema: {
        querystring: {
            type: "object",
            properties: {
                page: {
                    type: "integer",
                    minimum: 1,
                    default: 1,
                },
                onPage: {
                    type: "integer",
                    minimum: 1,
                    default: 3,
                    maximum: 50,
                },
                plus: {
                    type: "array",
                    items: {
                        type: "integer",
                    },
                },
                shopIds: {
                    type: "array",
                    items: {
                        type: "integer",
                    },
                },
                actions: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: [
                            ActionType.ProductCreated,
                            ActionType.StockLevelCreated,
                            ActionType.StockLevelDecreased,
                            ActionType.StockLevelIncreased,
                        ],
                    },
                },
                "date.from": {
                    type: "integer",
                    minimum: yearsAgo(),
                    default: yearsAgo(),
                },
                "date.to": {
                    type: "integer",
                    maximum: yearsAhead(),
                    default: yearsAhead(),
                },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                },
                                plu: {
                                    type: "integer",
                                },
                                shopId: {
                                    type: "integer",
                                    nullable: true,
                                },
                                action: {
                                    type: "string",
                                },
                            },
                        },
                    },
                    page: {
                        type: "integer",
                    },
                    totalPages: {
                        type: "integer",
                    },
                    onPage: {
                        type: "integer",
                    },
                    previous: {
                        type: "number",
                        nullable: true,
                    },
                    next: {
                        type: "number",
                        nullable: true,
                    },
                },
            }
        }
    }
}
