"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./repository/schema"); // Adjust the path based on where Reposito
const seedDbWithStates = async () => {
    await schema_1.Repository.seedDbWithStates();
};
seedDbWithStates();
//# sourceMappingURL=seed.js.map