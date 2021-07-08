import db from '../db/index.js';

export default {
    addDonate,
    listDonates
}


async function addDonate(donate) {
    return await db('donates').insert(donate, ['id'])
} 

async function listDonates() {
    return await db('donates')
}