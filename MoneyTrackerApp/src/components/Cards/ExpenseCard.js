import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ExpenseCard = () => {
    return (
        <TouchableOpacity style={styles.parent}>
            <View style={styles.leftPart}>
                <Text style={styles.mainText}>Title</Text>
                <Text style={styles.primaryText}>Exp Type</Text>
            </View>
            <View style={styles.rightPart}>
                <Text style={styles.primaryText}>Amount: ₹25</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ExpenseCard

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 2,
        paddingHorizontal: 15,
        borderRadius: 4,
        borderColor: 'red',
        borderWidth: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftPart: {

    },
    rightPart: {

    },
    primaryText: {
        fontSize: 15        
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
