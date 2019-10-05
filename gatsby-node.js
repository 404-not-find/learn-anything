// const slugify = require('./src/utils/slugify');
// function slugify(string) {
//     const slug = string
//         .toLowerCase()
//         .normalize('NFD')
//         .replace(/[\u0300-\u036F]/g, '')
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/(^-|-$)+/g, '');

//     return `${slug}`.replace(/\/\/+/g, '/');
// }

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      data {
        topics {
          id
          name
        }
      }
    }
  `)

  // TODO: handle errors :(

  const topics = result.data.data.topics

  topics.forEach(topic => {
    createPage({
      path: `/topic/${topic.name}/`,
      component: require.resolve("./src/templates/topic.js"),
      context: {
        id: topic.id,
      },
    })
  })
}
