const { datastore } = require('../config/index');

const kind = 'activity-item';
const ENTIRES_PER_PAGE = 10;

// users contains all user ids that activity item should show up for. post_id optional
exports.create = async ({title, text, users, postId}) => {
  // The Cloud Datastore key for the new entity
  const aiKey = datastore.key(kind);

  // Prepares the new entity
  const ai = {
    key: aiKey,
    data: {
      title,
      text,
      users,
      postId,
      timestamp: (new Date()).toJSON()
    },
  };

  // Saves the entity
  await datastore.save(ai);
  return aiKey.id;
}

// filters on userId, up to pages*ENTIRES_PER_PAGE entries, sorted by timestamp
exports.list = async ({userId, pages}) => {
  const query = datastore
    .createQuery(kind)
    .filter('users', '=', datastore.int(userId))
    .order('timestamp', { descending: true })
    .limit(ENTIRES_PER_PAGE * pages);
  const [items] = await datastore.runQuery(query);
  return {activityItems: items, totalPages: Math.ceil(items.length / ENTIRES_PER_PAGE)};
}