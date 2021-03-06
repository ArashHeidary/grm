import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  SectionList,
  TouchableHighlight
} from "react-native";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { FloatingAction } from "react-native-floating-action";
import Wallpaper from "../Components/Wallpaper";
import contactsStore from "../MobX/ContactsStore";
import Drawer from "react-native-drawer";
import ShortcutBar from "../Components/ShortcutBar";
import SideBar from "../Components/SideBar";
import { observer } from "mobx-react";
import Axios from "axios";

const requester = Axios.create({
  baseURL: "https://localhost:3000/api/contactlist"
});
let { width } = Dimensions.get("window");

@observer
class Contacts extends Component {
  static navigationOptions = ({ navigation }) => {
    let { params = {} } = navigation.state;
    return {
      headerTitle: params.serachExpanded ? (
        <TextInput
          style={{ fontSize: width / 20, marginLeft: "5%", width: "70%" }}
          placeholder="search..."
          onChangeText={text => {
            if (text.length > 0) {
              contactsStore.sectionsData = [];
              for (item of contactsStore.sections) {
                for (contacts of item.data) {
                  if (
                    contacts.name.toLowerCase().includes(text.toLowerCase())
                  ) {
                    let sectit = contactsStore.dataSource.find(secdat => {
                      return secdat.title === item.title;
                    });
                    if (sectit) {
                      sectit.data.push(contacts);
                    } else {
                      contactsStore.sectionsData = [
                        ...contactsStore.dataSource,
                        { title: item.title, data: [] }
                      ];
                      let sectit = contactsStore.dataSource.find(secdat => {
                        return secdat.title === item.title;
                      });
                      sectit.data.push(contacts);
                    }
                  }
                }
              }
              contactsStore.sectionsData = [...contactsStore.sectionsData];
            } else {
              contactsStore.sectionsData = contactsStore.dataSections;
            }
          }}
        />
      ) : (
        "Friends"
      ),
      headerStyle: { backgroundColor: "#2196f3" },
      headerTintColor: "#000",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      headerRight: (
        <View
          style={{
            flexDirection: "row-reverse",
            marginLeft: 8,
            alignItems: "center"
          }}
        >
          <TouchableHighlight
            style={params.serachExpanded ? { width: 0, height: 0 } : {}}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              source={require("../RES/notification.png")}
              style={
                params.serachExpanded
                  ? { width: 0, height: 0 }
                  : { width: 40, height: 40, resizeMode: "contain" }
              }
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.setParams({ serachExpanded: !params.serachExpanded });
            }}
          >
            <Image
              source={
                !params.serachExpanded
                  ? require("../RES/searchheader.png")
                  : require("../RES/close.png")
              }
              style={
                !params.serachExpanded
                  ? { width: 40, height: 40, resizeMode: "contain" }
                  : {
                      width: 30,
                      height: 30,
                      marginRight: 5,
                      resizeMode: "contain"
                    }
              }
            />
          </TouchableHighlight>
        </View>
      )
    };
  };
  actions = [
    {
      text: "Search and Add",
      color: "black",
      icon: require("../RES/search.png"),
      name: "search",
      position: 1
    }
  ];

  componentWillMount() {
    requester
      .get("/get", {
        params: {
          uniqueId: "_id"
        }
      })
      .then(response => {
        if (response.status === 200) {
          contactsStore.sections = response.data.contacts;
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
              width={contactsStore.isShortcutAvailable ? width / 8 : 0}
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
                width: contactsStore.isShortcutAvailable
                  ? (7 * width) / 8
                  : width,
                alignItems: "center"
              }}
            >
              <Wallpaper source={require("../RES/background.jpg")} />

              <SectionList
                style={{ width: "100%" }}
                sections={contactsStore.dataSource}
                renderItem={({ item }) => {
                  return (
                    <View style={{ alignItems: "center" }}>
                      <TouchableHighlight
                        style={{ width: "90%" }}
                        onPress={() =>
                          this.props.navigation.navigate("Profile", {
                            name: item.name,
                            image: item.image
                          })
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            source={item.image}
                            style={styles.profileImage}
                          />
                          <Text style={{ margin: width / 72 }}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  );
                }}
                renderSectionHeader={({ section: { title, data } }) => {
                  if (data.length)
                    return (
                      <View
                        style={{
                          borderTopWidth: width / 180,
                          borderRadius: 5,
                          width: "92%",
                          marginTop: "1%",
                          marginLeft: "4%",
                          alignItems: "center",
                          borderBottomWidth: width / 180
                        }}
                      >
                        <Text style={{ marginLeft: 5 }}>{title}</Text>
                      </View>
                    );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
          <FloatingAction
            visible={!contactsStore.expanded}
            listenKeyboard={true}
            actions={this.actions}
            color="black"
            onPressItem={name => {
              if (name === "search")
                this.props.navigation.navigate("SearchPage");
            }}
          />
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
  profileImage: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: width / 5.5,
    height: width / 5.5,
    backgroundColor: "#fff",
    borderRadius: 100,
    margin: "1%"
  },
  textStyle: {
    fontSize: width / 20,
    fontWeight: "bold",
    marginTop: "3%"
  },
  imageStyle: {
    width: (0.85 * width) / 8,
    height: (0.85 * width) / 8,
    resizeMode: "contain",
    margin: "3%"
  }
});

export default createStackNavigator({
  Contacts: {
    screen: Contacts
  }
});
