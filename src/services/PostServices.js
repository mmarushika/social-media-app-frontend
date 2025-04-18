
export async function getData(url) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
       }
    });
    const body = await res.json();
    console.log("fetch", body);
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
    console.log(url);
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

export async function updateData(url, user, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

export function uploadPostImage(file) {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file, file.name);
    fetch(`http://localhost:8000/upload/posts`, {
        method: 'POST',
        body: formData
    });
}
export function uploadProfileImage(file) {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file, file.name);
    fetch(`http://localhost:8000/upload/profiles`, {
        method: 'POST',
        body: formData
    });
}

export async function getImageUrl(filepath) {
    console.log(filepath);
    /*const url = fetch(`http://localhost:8000/image?filepath=${filepath}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob));
    console.log(url);*/
    const res = await fetch(`http://localhost:8000/image?filepath=${filepath}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
}


