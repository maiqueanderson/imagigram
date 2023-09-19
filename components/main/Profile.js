import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Avatar, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { doc, collection, query, getDocs, getDoc, setDoc, deleteDoc } from "firebase/firestore";

import { db }  from '../../database/firebaseConfig';

import { fetchUserFollowing } from '../../redux/actions'

const Profile = ({ currentUser, following, posts, route, fetchUserFollowing }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { uid } = route.params;

  following && console.log('following: ', uid, following, following.includes(uid))

  useEffect(() => {
    if (uid && uid === currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts)
    } else {
      fetchUser()
      fetchUserPosts();
    }
     //toda vez que uid sofrer uma alteração ele vai executar o useEffect novamente
  }, [uid])
  
//aqui é para saber quem o usuario esta seguindo ou não.
  useEffect(() => {
    if (following && following.includes(uid)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, 
  [following])


  const fetchUser = () => {
    const docRef = doc(db, "users", uid);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          setUser({ ...data, uid })
        } else {
          console.log('Action Fetch User: User does not exists')
        }
      });
  }

  const fetchUserPosts = async () => {
    const postsRef = collection(db, "posts")

    const queryPosts = query(collection(postsRef, uid, 'userPosts'));
    const querySnapshot = await getDocs(queryPosts);

    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    setUserPosts(posts)
  }

  const handleFollow = async () => {
    const followingRef = collection(db, "following")
    await setDoc(doc(followingRef, currentUser.uid, 'userFollowing', uid), {})
    fetchUserFollowing();
  }

  const handleUnFollow = async () => {
    await deleteDoc(doc(db, "following", currentUser.uid, 'userFollowing', uid));
    fetchUserFollowing();
  }

  if (!user) return <View />;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
      {/* aqui é para fazer o avatar do usuario */}
        <Card>
          <Card.Title
            title={user?.name}
            subtitle={user?.email}
            left={(props) => (
              <Avatar.Image
                size={24}
                {...props}
                source={
                  user?.avatar ||
                  'https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg'
                }
              />
            )}
          />

<Card.Content>
            <Card.Actions>
              {uid && uid !== currentUser.uid && (
                <>
                  {!isFollowing && (
                    <Button
                      icon='account-multiple-plus-outline'
                      onPress={handleFollow}
                    >
                      Follow
                    </Button>
                  )}
                  {isFollowing && (
                    <Button
                      icon='account-multiple-remove-outline'
                      onPress={handleUnFollow}
                    >
                      Unfollow
                    </Button>
                  )}
                </>
              )}
            </Card.Actions>
          </Card.Content>

        </Card>
      </View>
      <View style={styles.gallery}>
      {/* aqui é onde é feita a listagem dos posts do usuario */}
      {/* o flatlist é uma forma facil de fazer uma lista com colunas e linhas para dispositivos moveis */}
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.images}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    margin: 20,
  },
  gallery: {
    flex: 1,
  },
  images: {
    flex: 1 / 3,
    height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
})

//aqui é para pegar informações do usuario
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
});

const mapDispatchToProps = { fetchUserFollowing }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);