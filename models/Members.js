import db from '../db/index.js';

export default {
    register
}

async function register(member) {
    return await db('members').insert(member, ['id'])
}