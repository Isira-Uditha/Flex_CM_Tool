const app = require('../../server');
const request = require('supertest');

jest.setTimeout(18000);

//Conference - Editor
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

test('Add new Research paper submission', async () => {
    await request(app).post('/post/create').send({
        title: "Test title",
        user_id: "60dc60e57bc05438989c9e7b",
        type: "Test type",
        pdf_url: "Test pdf_url",
        status: "pending",
        payment_status: "pending",
        notify: "-1",

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get All Research paper submissions', async () => {
    await request(app).get('/post/').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get specific Research paper submission', async () => {
    await request(app).get('/post/60dc61497bc05438989c9e83').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Update specific Research paper submission', async () => {
    await request(app).patch('/post/update/60dc7f98f62f713760de7b8e').send({
        title: "Test title updated",
        type: "Test type updated",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Delete specific Research paper submission', async () => {
    await request(app).delete('/post/delete/60dc8022ba3df4647cd92a23').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get Research paper for a particular user', async () => {
    await request(app).get('/post/user/60dc60e57bc05438989c9e7b').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//Workshops

test('Add new workshop submission', async () => {
    await request(app).post('/workshop/create').send({
        title: "Test title",
        description: "Test Description",
        date: "2021-06-30",
        time: "08:30 AM",
        notes: "Test Note",
        conductor_id: "60d966570b53945d70a0d8fe",
        conference_id: "60dc5c4711c8d115407f63f5",
        status: "pending",
        notify: "0"

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get All Workshop submissions', async () => {
    await request(app).get('/workshop/').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get specific Workshop submission', async () => {
    await request(app).get('/workshop/60d97c006d9ab95b7c2be4be').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Update specific Workshop submission', async () => {
    await request(app).patch('/workshop/update/60dc8437f5f07a161cf58e48').send({
        title: "Test title updated",
        description: "Test description updated",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Delete specific Workshop submission', async () => {
    await request(app).delete('/workshop/delete/60dc85947a34eb3f606bfd04').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get Workshops for a particular user', async () => {
    await request(app).get('/workshop/user/60d966570b53945d70a0d8fe').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//Stripe Payment Gateway

test('Stripe Payment gateway testing', async () => {
    await request(app).get('/payment/').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//Authorized user handling part by the admin

test('Add Authorized Users By Admin', async () => {
    await request(app).post('/adminMainUser/CreateMainUser').send({
        name: "Test name",
        email: "test@test.com",
        password: "test",
        contact: "0713456789",
        address: "Test Address",
        organization: "Test organization",
        role: "Editor",

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get all user', async () => {
    await request(app).get('/adminMainUser/').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get specific user', async () => {
    await request(app).get('/adminMainUser/getUser/60d4cd80a259cb4b1078b265').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Update Authorized specific user', async () => {
    await request(app).patch('/adminMainUser/updateUser/60d4cd80a259cb4b1078b265').send({
        name: "Test name 2",
        email: "test2@test.com",
        password: "test2",
        contact: "0713456782",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Delete Authorized specific user', async () => {
    await request(app).get('/adminMainUser/60d4cd80a259cb4b1078b265').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//Admin Summary Section
test('Get Count of Approved Conferences', async () => {
    await request(app).get('/admin/admin/amountApprovedConference').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get Count of Rejected Conferences', async () => {
    await request(app).get('/admin/admin/amountRejectedConference').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Get Count of Approved Researches', async () => {
    await request(app).get('/admin/amountApprovesResearches').send({

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//Conference handling part by the admin
test('Approve Conference', async () => {
    await request(app).patch('/admin/approveConference/60dc5c4711c8d115407f63f5').send({
        status:"A"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})




