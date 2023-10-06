
const Notification = ({message}) => {
    const success = {
        color: 'green',
        backgroundColor: 'lightgrey',
        fontSize: '15px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'

    }
    if (message === null) {
        return null
    }
    return(
      <div style={success}>
        {message}
      </div>
    )
}

export default Notification
