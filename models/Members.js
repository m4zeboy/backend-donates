import db from '../db/index.js';

export default {
    register,
    findById,
    findByMembername
}

async function register(member) {
    return await db('members').insert(member, ['id'])
}

async function findById(id) {

}

async function findByMembername(name) {
    return await db('members').where({ name }).first()
}