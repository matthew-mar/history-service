export class ActionService {
    constructor({ actionRepository }) {
        this.rep = actionRepository;
    }

    async create(shopId, plu, date, action) {
        return await this.rep.create(shopId, plu, date, action);
    }

    async paginateWithFilters(page, onPage, filter) {
        return await this.rep.paginateWithFilters(
            (page - 1) * onPage,
            onPage,
            filter
        );
    }

    async countWithFilters(filter) {
        return await this.rep.countWithFilters(filter);
    }
}
