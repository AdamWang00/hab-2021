import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Caption } from "react-native-paper";
import { useSelector } from "react-redux";
import Post from "../components/posts/Post";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get user token
  const token = useSelector((state) => state.auth.token);

  // load listings function
  const loadPosts = async (page) => {
    if (page > totalPages) {
      return;
    }

    const post = {
      type: "post",
      user_name: "name",
      user_image_url:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      text:
        "this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text",
      users: [{ name: "person A" }, { name: "Person B" }],
      numReplies: 5,
    };

    const response = {
      status: 200,
      data: {
        posts: [
          { id: 1, ...post },
          { id: 2, ...post },
          { id: 3, ...post },
          { id: 4, ...post },
          { id: 5, ...post },
          { id: 6, ...post },
          { id: 7, ...post },
          { id: 8, ...post },
          { id: 9, ...post },
          { id: 10, ...post },
        ],
        totalPages: 5,
      },
    };

    /* TODO: CONNECT TO BACKEND
    await axios.get(urls.server + "listings", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: page },
    });
    */

    if (response.status == 200) {
      if (page == 1) {
        setPosts(response.data.posts);
      } else {
        setPosts(posts.concat(response.data.posts));
      }
      setCurrentPage(page + 1);
      setTotalPages(response.data.totalPages);
    } else {
      // TODO: error catching
    }
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await loadPosts(1);
    setIsRefreshing(false);
  };

  // load latest listings when screen mounts
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await loadPosts(1);
      setIsLoading(false);
    };

    load();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ width: "100%" }}>
        <FlatList
          data={posts}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={() => {
            if (isLoading) {
              return <View></View>;
            }

            return currentPage > totalPages ? (
              <View style={{ alignItems: "center" }}>
                <Caption>No more posts</Caption>
              </View>
            ) : (
              <ActivityIndicator style={{ paddingVertical: 5 }} />
            );
          }}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => {
            return <Post post={item} />;
          }}
          refreshing={isRefreshing}
          onRefresh={refresh}
          onEndReachedThreshold={0.5}
          onEndReached={loadPosts.bind(this, currentPage)}
        />
      </View>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20 },
});
