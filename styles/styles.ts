import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  body: {
    flex: 1,
    marginTop: 200, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  //pg vendas
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },

});

export default styles;