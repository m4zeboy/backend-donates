import db from '../db/index.js';

export default {
    addDonate,
    listDonates,
    listDonatesByMonth
}


async function addDonate(donate) {
    return await db('donates').insert(donate, ['id'])
} 

async function listDonates() {
    return await db('donates')
}

async function listDonatesByMonth(month) {
    const allDonates = await listDonates();
    const formatedDonates = allDonates.map(donate => {
        const [day, month, year] = donate.date.split('/')
        donate.date = [day, month, year]
        return donate
    })
    const donatesFindedByMonth = formatedDonates.filter(donate => donate.date[1] === month).map(donate => {
        donate.date = `${donate.date[0]}/${donate.date[1]}/${donate.date[2]}`
        return donate
    })
    return donatesFindedByMonth
}