const { datastore } = require('../config/index');

const kind = 'post';
const ENTIRES_PER_PAGE = 3;

exports.read = async ({postId}) => {
  const postKey = datastore.key([kind, datastore.int(postId)]);
  const [post] = await datastore.get(postKey);
  return post;
}

// filters on each user id in users, up to pages*ENTIRES_PER_PAGE entries, sorted by timestamp
exports.list = async ({users, pages}) => {
  const query = datastore.createQuery(kind);
  users.forEach(u => {
    query.filter('users', '=', datastore.int(u));
  });
  query.order('timestamp', { descending: true })
    .limit(ENTIRES_PER_PAGE * pages);
  const [posts] = await datastore.runQuery(query);
  return {posts, totalPages: Math.ceil(posts.length / ENTIRES_PER_PAGE)};
}

exports.create = async ({type, userId, userName, userImageUrl, text, imageUrl, usersAdded}) => {
  // The Cloud Datastore key for the new entity
  const postKey = datastore.key(kind);

  // Prepares the new entity
  const post = {
    key: postKey,
    data: {
      postId: postKey.id,
      type,
      userId,
      userName,
      userImageUrl,
      text,
      imageUrl,
      users: usersAdded.map(u => datastore.int(u.id)),
      usersDetailed: usersAdded,
      replies: [],
      timestamp: (new Date()).toJSON()
    },
  };

  // Saves the entity
  await datastore.save(post);
  return postKey.id;
}

exports.update = async ({postId, type}) => {
  const postKey = datastore.key([kind, datastore.int(postId)]);
  const [post] = await datastore.get(postKey);
  post.type = type;
  post.timestamp = (new Date()).toJSON();
  await datastore.update(post);
}

exports.reply = async ({postId, userId, text}) => {
  const postKey = datastore.key([kind, datastore.int(postId)]);
  const [post] = await datastore.get(postKey);
  post.replies.push({
    userId,
    text
  });
  await datastore.update(post);
}

// (async () => {
//   await exports.create({type: "post", userId: "4790583889494016", userName: "Aubrey", userImageUrl: "url", text: "Enjoyed watching Tenet with the crew!", imageUrl: "iu", usersAdded: [{id: "5738709764800512", name: "John"}, {id: "5139943911325696", name: "Susan"}, {id: "4790583889494016", name: "Aubrey"}, {id: "6206230007644160", name: "Albert"}]})

//   exports.list({users: ["5738709764800512"], pages: 1}).then(console.log);
// })();