import { StyleSheet } from 'react-native';

const stylesListas = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    headerback: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 180,
      backgroundColor: '#929090',
      borderRadius: 16,
    },
    header: {
      position: 'absolute',
      top: 0, 
      left: 0, 
      right: 0, 
      height: 160,
      backgroundColor: '#A2D8E3',
      borderRadius: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    icon: {
      width: 170,
      height: 170,
      resizeMode: 'contain',
      alignSelf: 'flex-start',
    },
    successMessage: {
      fontSize: 16,
      color: 'green',
      marginTop: 10,
    },
    body: {
      flex: 1,
      marginTop: 200, 
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableHeaderText: {
      fontSize: 12,
      fontWeight: 'bold' ,
      flex: 1,
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
    },
    trash: {
      textAlign: 'right',
      color: 'grey',
    },
  });

export default stylesListas;