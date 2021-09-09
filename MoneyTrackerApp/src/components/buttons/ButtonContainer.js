import React from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from '../../axios/server';

const ButtonContainer = ({
  content,
  toNavigate = null,
  whereToNavigate,
  params,
  toDelete = false,
}) => {
  const deleteMonth = async () => {
    await axios
      .post('/', {
        query: `
        mutation {
          removeMonth(_id:"${params}") {
            ...on MonthExp {
              _id
              totalAmount
            }
              ...on errMessage {
                msg
              }
            }
        }
      `,
      })
      .then(response => {
        if (response.data.data.msg) {
          return Alert.alert('Something went wrong, please try again later !!');
        }
        toNavigate.navigate(whereToNavigate);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Something went wrong, please try again later !!');
      });
  };
  const onPress = () => {
    if (!toDelete) {
      return toNavigate !== null
        ? toNavigate.navigate(whereToNavigate, {id: params})
        : null;
    }
    Alert.alert(
      'Delete Month?',
      'All the corresponding Expenses and Months data will be deleted !!',
      [
        {
          text: 'Yes',
          onPress: deleteMonth,
        },
        {
          text: 'No',
        },
      ],
    );
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.parent}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonContainer;

const styles = StyleSheet.create({
  parent: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
