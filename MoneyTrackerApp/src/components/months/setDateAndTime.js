import React, {useState} from 'react';
import {View, Button, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default ({prevDate, returnDate}) => {
  const [date, setDate] = useState(prevDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    returnDate(currentDate);
  };
  const returnCurrentDate = () => {
    var validDate = String(date)
      .split(' ')
      .map((val, ind) => {
        if (ind < 4) {
          return val;
        }
      });
    var reqArr = validDate.splice(0, 4);
    reqArr[0] = `${reqArr[0]},`;
    const str = reqArr.join(' ');
    return str;
  };
  return (
    <View>
      <View>
        <Button
          style={styles.btnStyle}
          onPress={() => setShow(!show)}
          title={returnCurrentDate()}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: 60,
    backgroundColor: 'red',
    width: 20,
  },
});
