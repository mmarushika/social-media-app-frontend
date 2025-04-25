import "./Message.css";

function Message({type, content, timestamp}) {
    console.log(timestamp);
    console.log(JSON.stringify(new Date()));
    return (
        <div className={type + " message"}>
            <div className="message-content">
                {content}
            </div>
            <div className="message-timestamp">
                {format(timestamp)}
            </div>
        </div>

    )
}

export default Message;

function getDayName(dayIndex) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
}

function getMonthName(monthIndex) {
    let months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
}

function getMonthDayCount(monthIndex) {
    let monthDayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthDayCounts[monthIndex];
}

function format(timestamp) {
    let date = new Date(JSON.parse(timestamp));
    return `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
}
