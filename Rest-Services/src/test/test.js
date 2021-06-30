const app = require('../../server');
const request = require('supertest');

jest.setTimeout(18000);

//Conference

test('Add conference', async () => {
    await request(app).post('/conference/create').send({
        title: "Test title",
        date: "Test title",
        time: "Test title",
        description: "Test description",
        location: "Test location",
        speakers: [{index:"1",speaker:"Test Speaker"}, {url: "test url"}],
        ticket_price: "1500",
        tracks: "Test Tracks",
        g_url: "Test Url",
        g_speaker: "g_speaker",
        status: "p",
        post_status: "1",
        notify: "-1",

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get All conference', async () => {
    await request(app).get('/conference/').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get specific conference', async () => {
    await request(app).get('/conference/60d6222ffa796931745ae464').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Update specific conference', async () => {
    await request(app).patch('/conference/60d88ba5641e7e31040ebeb6').send({
        title: "Test title",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Update conference post_status', async () => {
    await request(app).patch('/conference/post/60d88ba5641e7e31040ebeb6').send({
        post_status: "1",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Delete specific conference', async () => {
    await request(app).patch('/conference/60d96d61a17e3f2440918f4f').send({
        title: "Test title",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get conference with post_status 1', async () => {
    await request(app).get('/conference/post/conference').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get all workshops related to the posted conference', async () => {
    await request(app).get('/conference/workshop/60d96d61a17e3f2440918f4f').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//Posts

// test('Add Post', async () => {
//     await request(app).post('/post/create').send({
//         title: "Test title",
//         user_id: "Test user_id",
//         type: "Test type",
//         pdf_url: "Test pdf_url",
//         status: "pending",
//         payment_status: "pending",
//         notify: "-1",
//
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })
//
// test('Get All Posts', async () => {
//     await request(app).get('/post/').send({
//
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })
//
// test('Get specific Posts', async () => {
//     await request(app).get('/post/60db6b1b1a9d1625786d6fa0').send({
//
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })
//
// test('Update specific Posts', async () => {
//     await request(app).patch('/post/update/60d82df48508293f642b797f').send({
//         title: "Test title 2",
//         type: "Test type 2",
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })
//
// test('Delete specific Posts', async () => {
//     await request(app).delete('/post/delete/60db6b1b1a9d1625786d6fa0').send({
//
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })