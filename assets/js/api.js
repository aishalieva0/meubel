window.getProducts = async function () {
    try {
        const response = await fetch('../products.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
