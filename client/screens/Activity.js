import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Caption } from "react-native-paper";
import { useSelector } from "react-redux";

import ActivityItem from "../components/activity/ActivityItem";

const Activity = (props) => {
  const [activityItems, setActivityItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get user token
  const token = useSelector((state) => state.auth.token);

  // load listings function
  const loadActivityItems = async (page) => {
    if (page > totalPages) {
      return;
    }

    const response = {
      status: 200,
      data: {
        activityItems: [
          {
            id: 1,
            title: "Connection Request",
            text: "Josh has sent you a connection request",
          },
          {
            id: 2,
            title: "Hack@Brown",
            text:
              "You have a plan with Aubrey, Susan and Albert coming up soon",
          },
          {
            id: 3,
            title: "Accepted Request",
            text: "Aubrey has accepted your connection request",
          },
          {
            id: 4,
            title: "Memory with Aubrey",
            text: "Aubrey has created a memory with you",
          },
          {
            id: 5,
            title: "Zoom Dinner",
            text: "Susan has scheduled a plan with you",
          },
          {
            id: 6,
            title: "Post created",
            text: "Albert has shared a post with you",
          },
          { id: 7, title: "Reply", text: "Albert has replied to your post" },
          { id: 8, title: "Reply", text: "Susan has replied to your post" },
          { id: 9, title: "Reply", text: "Adam has replied to your post" },
          { id: 10, title: "Reply", text: "Albert has replied to your post" },
        ],
        totalPages: 5,
      },
    };

    /*
    const response = await axios.post(urls.server + "activity", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: page },
    });
    */

    if (response.status == 200) {
      if (page == 1) {
        setActivityItems(response.data.activityItems);
      } else {
        setActivityItems(posts.concat(response.data.activityItems));
      }
      setCurrentPage(page + 1);
      setTotalPages(response.data.totalPages);
    } else {
      // TODO: error catching
    }
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await loadActivityItems(1);
    setIsRefreshing(false);
  };

  // load latest listings when screen mounts
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await loadActivityItems(1);
      setIsLoading(false);
    };

    load();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ width: "100%" }}>
        <FlatList
          data={activityItems}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={() => {
            if (isLoading) {
              return <View></View>;
            }

            return currentPage > totalPages ? (
              <View style={{ alignItems: "center" }}>
                <Caption>No more items</Caption>
              </View>
            ) : (
              <ActivityIndicator style={{ paddingVertical: 5 }} />
            );
          }}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => {
            return <ActivityItem title={item.title} text={item.text} />;
          }}
          refreshing={isRefreshing}
          onRefresh={refresh}
          onEndReachedThreshold={0.5}
          onEndReached={loadActivityItems.bind(this, currentPage)}
        />
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20 },
});
