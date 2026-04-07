import {Repository} from './repository/schema.ts' // Adjust the path based on where Reposito
 const seedDbWithStates = async () => {
    await Repository.seedDbWithStates();
    }
seedDbWithStates()