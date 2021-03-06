import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  FlatList,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Image,
  Text
} from "react-native";
import { HeaderBackButton, createStackNavigator } from "react-navigation";
import SideBar from "../Components/SideBar";
import notificationStore from "../MobX/NotificationStore";
import { observer } from "mobx-react";
import Drawer from "react-native-drawer";
import ShortcutBar from "../Components/ShortcutBar";
import Wallpaper from "../Components/Wallpaper";
import Axios from "axios";
let { width, height } = Dimensions.get("window");

const requester = Axios.create({
  baseURL: "https://localhost:3000/api/Notifications"
});

@observer
class Notifications extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Notifications",
      headerStyle: { backgroundColor: "#2196f3" },
      headerTintColor: "#000",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    };
  };
  state = {
    heightOfResponding: new Animated.Value(height / 2.8),
    heightOfWaiting: new Animated.Value(height / 2.8)
  };

  toggleResponding() {
    let initialValue = notificationStore.respondExpanded ? height / 2.8 : 0,
      finalValue = notificationStore.respondExpanded ? 0 : height / 2.8;

    notificationStore.respondExpanded = !notificationStore.respondExpanded;
    this.state.heightOfResponding.setValue(initialValue);
    Animated.timing(this.state.heightOfResponding, {
      toValue: finalValue,
      duration: 400
    }).start();
  }

  toggleWaiting() {
    let initialValue = notificationStore.waitingExpanded ? height / 2.8 : 0,
      finalValue = notificationStore.waitingExpanded ? 0 : height / 2.8;

    notificationStore.waitingExpanded = !notificationStore.waitingExpanded;
    this.state.heightOfWaiting.setValue(initialValue);
    Animated.timing(this.state.heightOfWaiting, {
      toValue: finalValue,
      duration: 400
    }).start();
  }

  componentWillMount() {
    requester
      .get("/get", {
        params: {
          uniqueId: "_id"
        }
      })
      .then(response => {
        if (response.status === 200) {
          notificationStore.responsingList = response.data.responsingList;
          notificationStore.waitingList = response.data.waitingList;
        }
      });
  }

  navigationToMyProfile() {
    this._drawer.close();
    this.props.navigation.navigate("MyProfile");
  }
  navigationToMainPage() {
    this._drawer.close();
    this.props.navigation.navigate("MainPage");
  }
  navigationToShop() {
    this._drawer.close();
    this.props.navigation.navigate("Shop");
  }
  navigationToContacts() {
    this._drawer.close();
    this.props.navigation.navigate("Contacts");
  }
  navigationToSetting() {
    this._drawer.close();
    this.props.navigation.navigate("Setting");
  }
  navigationToAbout() {
    this._drawer.close();
    this.props.navigation.navigate("About");
  }
  navigationToSearch() {
    this._drawer.close();
    this.props.navigation.navigate("SearchPage");
  }
  collapseDrawer() {
    this._drawer.close();
  }

  toggle() {
    this._drawer.open();
  }

  render() {
    return (
      <Drawer
        ref={c => (this._drawer = c)}
        type="overlay"
        elevation={2}
        openDrawerOffset={0.15}
        panOpenMask={0.95}
        captureGestures={true}
        negotiatePan={true}
        panThreshold={0.3}
        panCloseMask={0.2}
        tweenEasing="linear"
        tweenDuration={500}
        tapToClose={true}
        content={
          <SideBar
            imageStyle={styles.imageStyle}
            goToMyProfile={this.navigationToMyProfile.bind(this)}
            goToMessages={this.navigationToMainPage.bind(this)}
            goToContacts={this.navigationToContacts.bind(this)}
            goToSearch={this.navigationToSearch.bind(this)}
            goToShop={this.navigationToShop.bind(this)}
            goToSetting={this.navigationToSetting.bind(this)}
            goToAbout={this.navigationToAbout.bind(this)}
            collapser={this.collapseDrawer.bind(this)}
          />
        }
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <ShortcutBar
              width={notificationStore.isShortcutAvailable ? width / 8 : 0}
              toggle={this.toggle.bind(this)}
              imageStyle={styles.imageStyle}
              navigationToMyProfile={this.navigationToMyProfile.bind(this)}
              navigationToMainPage={this.navigationToMainPage.bind(this)}
              navigationToContacts={this.navigationToContacts.bind(this)}
              navigationToShop={this.navigationToShop.bind(this)}
              navigationToSetting={this.navigationToSetting.bind(this)}
              navigationToAbout={this.navigationToAbout.bind(this)}
            />
            <View
              style={{
                width: notificationStore.isShortcutAvailable
                  ? (7 * width) / 8
                  : width,
                flex: 1
              }}
            >
              <Wallpaper source={require("../RES/background.jpg")} />
              <View style={{ alignItems: "center" }}>
                <View style={styles.styleHeader}>
                  <TouchableHighlight
                    onPress={this.toggleResponding.bind(this)}
                  >
                    <Text
                      style={{
                        fontSize: width / 26
                      }}
                    >
                      People, who sent you a friend request
                    </Text>
                  </TouchableHighlight>
                </View>
                <Animated.View
                  style={{
                    height: this.state.heightOfResponding,
                    width: "100%"
                  }}
                >
                  <ScrollView>
                    <FlatList
                      style={styles.listStyle}
                      data={notificationStore.responsingList}
                      renderItem={({ item }) => {
                        return (
                          <TouchableHighlight
                            onPress={() =>
                              this.props.navigation.navigate("Profile", {
                                name: item.key,
                                image: item.image
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                margin: "1%"
                              }}
                            >
                              <Image
                                source={item.image}
                                style={styles.profileImage}
                              />
                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  marginLeft: "2%",
                                  flex: 1
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: width / 22.5,
                                    fontWeight: "bold"
                                  }}
                                >
                                  {item.key}
                                </Text>
                              </View>
                            </View>
                          </TouchableHighlight>
                        );
                      }}
                    />
                  </ScrollView>
                </Animated.View>
                <View style={styles.styleHeader}>
                  <TouchableHighlight onPress={this.toggleWaiting.bind(this)}>
                    <Text
                      style={{
                        fontSize: width / 26
                      }}
                    >
                      People, you sent them a friend request
                    </Text>
                  </TouchableHighlight>
                </View>
                <Animated.View
                  style={{
                    height: this.state.heightOfWaiting,
                    width: "100%"
                  }}
                >
                  <ScrollView>
                    <FlatList
                      style={styles.listStyle}
                      data={notificationStore.waitingList}
                      renderItem={({ item }) => {
                        return (
                          <TouchableHighlight
                            onPress={() =>
                              this.props.navigation.navigate("Profile", {
                                name: item.key,
                                image: item.image
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                margin: "1%"
                              }}
                            >
                              <Image
                                source={item.image}
                                style={styles.profileImage}
                              />
                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  marginLeft: "2%",
                                  flex: 1
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: width / 22.5,
                                    fontWeight: "bold"
                                  }}
                                >
                                  {item.key}
                                </Text>
                              </View>
                            </View>
                          </TouchableHighlight>
                        );
                      }}
                    />
                  </ScrollView>
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: width / 20,
    fontWeight: "bold",
    marginTop: "3%"
  },
  styleHeader: {
    borderWidth: width / 360,
    borderRadius: 5,
    marginTop: "2%",
    width: "90%",
    alignItems: "center",
    marginBottom: "3%"
  },
  profileImage: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: width / 10,
    height: width / 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    margin: "1%"
  },
  imageStyle: {
    width: (0.85 * width) / 8,
    height: (0.85 * width) / 8,
    resizeMode: "contain",
    margin: "3%"
  },
  listStyle: {
    width: "85%",
    marginBottom: "3%",
    marginLeft: "7.5%"
  }
});

export default createStackNavigator({
  Notifications: {
    screen: Notifications
  }
});
