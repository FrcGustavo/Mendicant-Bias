const AdminMock = [{
  _id: '5e950ed8ddf46e37866321ea',
  firstName: 'Francisco Gustavo',
  lastName: 'Hidalgo López',
  username: 'FrcGustavo',
  cover: '/',
  email: 'gus@mail.com',
  password: 'my-password',
  createdAt: '2020-04-14T01:16:08.276+00:00',
  updatedAt: '2020-04-14T01:16:08.276+00:00',
}];

async function create(admin) {
  if (admin) return AdminMock[0];
  return {};
}

async function update(admin, adminId) {
  if (admin && adminId) return AdminMock[0];
  return {};
}

async function findById(adminId) {
  if (adminId) return AdminMock[0];
  return {};
}

module.exports = {
  AdminMock,
  AdminServiceMock: {
    create,
    update,
    findById,
  },
};
