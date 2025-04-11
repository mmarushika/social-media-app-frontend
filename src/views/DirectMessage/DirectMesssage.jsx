import "./DirectMessage.css";

import DMList from "./DMList/DMLIst";
import DMWindow from "./DMWindow/DMWIndow";

function DirectMessage({sender}) {
    return (
        <div className="view direct-message">
            <DMList sender={sender}></DMList>
            <DMWindow sender={sender} receiver="Bob"></DMWindow>
        </div>
    );
}
export default DirectMessage;
//<DMList sender={sender}></DMList>