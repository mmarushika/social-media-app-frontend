import "./DMHeader.css";

function DMHeader(prop) {
    return (
        <div className="dm-header">
            <h1>{prop.name}</h1>
        </div>
    );
}
export default DMHeader;