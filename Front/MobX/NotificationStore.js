import { observable } from "mobx";

class NotificationStore {
  @observable
  respondExpanded;
  @observable
  waitingExpanded = true;
  @observable
  isShortcutAvailable = true;
  @observable
  responsingList = [
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
  waitingList = [
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

const notificationStore = new NotificationStore();

export default notificationStore;
