import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Wallpaper from "./Wallpaper";

export default class ModalOneButton extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visibility}
        onRequestClose={() => {
          this.props.invisibleFunction();
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          {this.props.children}
          <View style={styles.modalView}>
            <Wallpaper source={require("../RES/modalbackground.jpg")} />
            <Text style={styles.modalHeader}>{this.props.headerTitle}</Text>
            <Text style={styles.modalBody}>{this.props.body}</Text>
            <View
              style={{
                marginTop: "10%",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  this.props.buttonFunction();
                }}
                style={styles.modalTouchable}
              >
                <Text style={styles.modalButton}>{this.props.buttonText}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalHeader: {
    marginTop: "3%",
    color: "white",
    marginBottom: "5%",
    fontWeight: "bold",
    fontSize: 20
  },
  modalBody: {
    color: "white",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
    textAlign: "center"
  },
  modalTouchable: {
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 5,
    padding: "1%",
    marginBottom: "7%"
  },
  modalView: {
    borderWidth: 1.5,
    alignItems: "center",
    width: "85%"
  },
  modalButton: {
    color: "white",
    fontWeight: "bold",
    paddingRight: "5%",
    paddingLeft: "5%"
  }
});
