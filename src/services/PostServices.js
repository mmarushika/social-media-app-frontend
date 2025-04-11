
export async function getData(url) {
    const res = await fetch(url, {
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

export async function addData(url, data) {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}


export function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    fetch("http://localhost:8000/upload", {
        method: 'POST',
        body: formData
    });
}

export function getImageUrl(filepath) {
    //const filepath = '/Users/marushikamanohar/Programming/Fullstack/mongo-test/images/posts/IMG_5003.jpeg';
    const url = fetch(`http://localhost:8000/image?filepath=${filepath}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob));
    return url;
}


