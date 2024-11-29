async function submitFormData(url, formData) {
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return response.json();
}
