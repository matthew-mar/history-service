export class ActionPaginatedResponse {
    constructor(actions, page, onPage, totalPages) {
        this.actions = actions;
        this.page = page;
        this.onPage = onPage;
        this.totalPages = totalPages;
    }

    get json() {
        return {
            items: this.actions,
            page: this.page,
            onPage: this.onPage,
            totalPages: this.totalPages,
            previous: this.page > 1 ? this.page - 1 : null,
            next: this.page < this.totalPages ? this.page + 1 : null,
        };
    }
}
