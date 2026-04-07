import {Repository} from './repository/schema' // Adjust the path based on where Reposito
 const seedDbWithStates = async () => {
    await Repository.seedDbWithStates();
    }
seedDbWithStates()