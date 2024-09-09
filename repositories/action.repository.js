export class ActionRepository {
    constructor({ prismaClient }) {
        this.prisma = prismaClient;
    }

    async create(shopId, plu, date, action) {
        return await this.prisma.action.create({
            data: {
                shopId: shopId,
                plu: plu,
                date: Number(date),
                action: action,
            },
        });
    }

    async paginateWithFilters(skip, take, filter) {
        return await this.prisma.action.findMany({
            where: this.filterQuery(filter),
            skip: skip,
            take: take,
        });
    }

    async countWithFilters(filter) {
        return await this.prisma.action.count({
            where: this.filterQuery(filter),
        });
    }

    filterQuery(filter) {
        let query = {};

        if (filter.shopIds) {
            query["shopId"] = {
                in: filter.shopIds,
            };
        }
        if (filter.plus) {
            query["plu"] = {
                in: filter.plus,
            };
        }
        if (filter.date) {
            query["date"] = {
                gte: filter.date.from,
                lte: filter.date.to,
            };
        }
        if (filter.actions) {
            query["action"] = {
                in: filter.actions,
            };
        }

        return query;
    }
}
