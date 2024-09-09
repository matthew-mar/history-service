import { resolve } from "../provider.js";
import { ActionPaginatedResponse } from "../responses/action-paginated.response.js";

export const paginate = async (request, reply) => {
    let page = request.query.page;
    let onPage = request.query.onPage;
    let filters = {
        plus: request.query.plus ?? null,
        shopIds: request.query.shopIds ?? null,
        actions: request.query.actions ?? null,
        date: {
            from: request.query["date.from"],
            to: request.query["date.to"],
        },
    };

    let actionService = resolve("actionService");

    let totalCount = await actionService.countWithFilters(filters);
    let pagesCount = Math.ceil(totalCount / onPage);
    if (pagesCount > 0 && page > pagesCount) {
        reply.status(400).send({
            error: "failed get actions",
            detail: `page ${page} can't be greater than total pages count: ${pagesCount}`,
        });
    }

    if (filters.date["from"] > filters.date["to"]) {
        reply.status(400).send({
            error: "failed get actions",
            detail: `from data (${filters.date["from"]}) can't be greater than to data (${filters.date["to"]})`,
        });
    }

    let actions = await actionService.paginateWithFilters(page, onPage, filters);

    return new ActionPaginatedResponse(
        actions,
        page,
        onPage,
        pagesCount
    ).json;
};
