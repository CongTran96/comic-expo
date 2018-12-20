const data = async (uri) => {
    try {
        let response = await fetch(uri);
        return response.text();
    } catch(error) {
        alert(error);
    }
}

export default data;