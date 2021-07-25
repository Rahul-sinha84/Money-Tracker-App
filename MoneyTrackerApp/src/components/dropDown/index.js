import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const index = ({
  title = '',
  dropdownItems = [],
  onSelection,
  isDisabled = false,
  disabledValue = 'Please Select...',
}) => {
  const onSelect = val => {
    onSelection(dropdownItems[val]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <ModalDropdown
        style={
          isDisabled
            ? [styles.dropdownStyle, {backgroundColor: '#777'}]
            : styles.dropdownStyle
        }
        textStyle={styles.titleStyle}
        dropdownStyle={styles.dropdownListStyle}
        dropdownTextStyle={styles.dropdownListTextStyle}
        dropdownTextHighlightStyle={styles.dropdownSelectedOption}
        onSelect={onSelect}
        disabled={isDisabled}
        defaultValue={disabledValue}
        options={dropdownItems}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    display: 'flex',
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dropdownStyle: {
    marginTop: 10,
    borderRadius: 10,
    padding: 8,
    borderWidth: 3,
    borderColor: '#f4f4f4',
    backgroundColor: '#2998ff',
  },
  titleStyle: {
    fontSize: 20,
    color: 'white',
  },
  dropdownListStyle: {
    borderRadius: 10,
    width: '50%',
  },
  dropdownListTextStyle: {
    fontSize: 20,
  },
  dropdownSelectedOption: {
    backgroundColor: '#55c57a',
    color: 'white',
  },
});
