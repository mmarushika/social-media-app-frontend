
export async function getMessageHistory(sender, receiver) {
    const res = await fetch(`http://localhost:8000/messages?sender=${sender}&receiver=${receiver}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
       }
    });
    const body = await res.json();
    return body;
    /*let requestOptions = {
        'content-type': 'application/json',
         method: 'GET',
         redirect: 'follow'
       };
     const data = fetch(url, requestOptions)
       .then(response => response.json());
       return data;*/
}

export async function addMessage(data) {
    console.log(data);
    const res = await fetch("http://localhost:8000/send", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}



