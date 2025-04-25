import "./DMHeader.css";

import User from "../../../../components/User/User";

function DMHeader({name}) {
    return (
        <div className="dm-header">
            <User currentUser={name} username={name} mode="static" />
        </div>
    );
}
export default DMHeader;