import React from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Thumbnail, Text, View, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import colors from "../../config/colors";

const ViewUserModal = ({ modalVisible, setModalVisible, itemUser }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon active name="close-circle" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Grid>
            <Col style={{ width: "30%" }}>
              <Thumbnail
                source={{
                  uri:
                    itemUser.profile_picture ||
                    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
                }}
              />
            </Col>
            <Col>
              {itemUser.first_name && itemUser.last_name && (
                <Text>{itemUser.first_name + " " + itemUser.last_name}</Text>
              )}
              <Text note>{itemUser.email}</Text>
            </Col>
          </Grid>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  closeIcon: {
    color: colors.secondary,
  },
  closeIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  profileText: {
    textAlign: "center",
  },
});

export default ViewUserModal;
