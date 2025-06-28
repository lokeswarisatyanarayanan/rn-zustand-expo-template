import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { usePost } from '../hook';

const PostDetailScreen = (): React.JSX.Element => {
  const { id } = useLocalSearchParams();
  const { selectedPost, fetchPostById, isLoading } = usePost();

  useEffect(() => {
    if (typeof id === 'string') {
      fetchPostById(id);
    }
  }, [id]);

  if (isLoading || !selectedPost) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading post...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postContainer}>
          {/* Post Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.postId}>Post #{selectedPost.id}</Text>
            {selectedPost.userId && (
              <Text style={styles.authorText}>By User {selectedPost.userId}</Text>
            )}
          </View>

          {/* Post Title */}
          <Text style={styles.postTitle}>{selectedPost.title}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Post Body */}
          <View style={styles.bodyContainer}>
            <Text style={styles.postBody}>{selectedPost.body}</Text>
          </View>

          {/* Post Footer */}
          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Post ID</Text>
              <Text style={styles.footerValue}>{selectedPost.id}</Text>
            </View>
            {selectedPost.userId && (
              <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Author ID</Text>
                <Text style={styles.footerValue}>{selectedPost.userId}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  authorText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  postTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 36,
    marginBottom: 20,
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 24,
  },
  bodyContainer: {
    marginBottom: 32,
  },
  postBody: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 26,
    textAlign: 'justify',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default PostDetailScreen;
