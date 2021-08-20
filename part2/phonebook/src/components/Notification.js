import React from 'react'

const Notification = ({ message}) => {
    if (message === null) {
        return null
    }

    return (
    <div className={message.includes('[ERROR]') ? "error" : "notif"}>
        {message}
    </div>
    )
}

export default Notification