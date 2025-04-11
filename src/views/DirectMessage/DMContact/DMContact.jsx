import "./DMContact.css";

function DMContact({contact, onClick}){
    return (
        <div className="dm-contact" onClick={() => onClick(contact)}>
            <h1>{contact}</h1>
        </div>
    );
}
export default DMContact;