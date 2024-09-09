import { paginate } from "../controllers/details.js"
import { actionPaginateFilterOptions } from "../schemas/paginate-filter.schema.js"

export const router = async (app, options, done) => {
    app.get("/actions", {schema: actionPaginateFilterOptions.schema}, paginate);
    done();
};
