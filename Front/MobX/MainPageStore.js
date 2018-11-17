import { observable } from "mobx";

class MainPageStore {
  @observable
  expanded = false;
  @observable
  collapseText = "";
  @observable
  myProfileText = "";
  @observable
  messagesText = "";
  @observable
  contactsText = "";
  @observable
  shopText = "";
  @observable
  settingText = "";
  @observable
  aboutText = "";
  @observable
  collapseIcon = require("../RES/expand1.png");
  @observable
  myProfileIcon = require("../RES/profile1.png");
  @observable
  messagesIcon = require("../RES/message1.png");
  @observable
  contactsIcon = require("../RES/contacts1.png");
  @observable
  shopIcon = require("../RES/shop1.png");
  @observable
  settingIcon = require("../RES/setting1.png");
  @observable
  aboutIcon = require("../RES/about1.png");
  @observable
  longClickItemName = "";
  @observable
  longClickItemImage;
  @observable
  isModalLongClick = false;
  @observable
  flatList = [
    {
      key: "Devin",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jackson",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "James",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Joel",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "John",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jillian",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jimmy",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Julie",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    }
  ];
  @observable
  flatListData = [
    {
      key: "Devin",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jackson",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "James",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Joel",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "John",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jillian",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Jimmy",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    },
    {
      key: "Julie",
      image: require("../RES/sampleprofileimage.jpg"),
      lastMessage: "The last Message",
      date: "16:05"
    }
  ];
}

const mainPageStore = new MainPageStore();

export default mainPageStore;
