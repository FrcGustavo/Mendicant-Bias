const PostsMock = [{
  _id: '5e96251f25ceb018ee079bf7',
  title: 'Post de prueba para poder hacer test',
  description: 'El post es para poder hacer pruebas unitarias',
  cover: 'my-imagen',
  slug: 'post-de-prueba-para-poder-hacer-test',
  posts: 'Este es mi primer post## Este es un subtituloEsto esta echo conr markdown```jsconst n = 1```',
  createdAt: '2020-04-14T21:03:27.505+00:00',
  updatedAt: '2020-04-14T21:03:27.505+00:00',
}];

async function findAll() {
  return PostsMock;
}

async function create(post) {
  if (post) {
    return PostsMock[0];
  }
  return {};
}

async function findBySlug(slug) {
  if (slug) {
    return PostsMock[0];
  }
  return {};
}

async function update(slug, post) {
  if (slug && post) return PostsMock[0];
  return {};
}

async function destroy(slug) {
  if (slug) {
    const postDeleted = PostsMock.find((post) => post.slug === slug);
    return postDeleted;
  }
  return {};
}

module.exports = {
  PostsMock,
  PostsServiceMock: {
    findAll,
    create,
    findBySlug,
    update,
    destroy,
  },
};
