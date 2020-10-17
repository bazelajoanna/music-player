import React, {useEffect} from 'react';
import "../../scss/components/Notification.scss";

const Notification = ({notification, close}) => {
    useEffect(() => {
        if(!notification) return;

        const closeNotification = () => {
            setTimeout(() => {
                close()
            }, 2500)
        };

        closeNotification();

        return () => {
            clearTimeout(closeNotification)
        }
    }, [notification]);

    if (!notification) return null;

    return (
        <div className="notification">
            {notification}
        </div>
    )
};

export default Notification
