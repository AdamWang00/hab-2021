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
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
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
            return <ActivityItem />;
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
