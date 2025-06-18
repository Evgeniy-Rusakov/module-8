document.addEventListener('DOMContentLoaded', () => {
    const loadImagesButton = document.getElementById('loadImages');
    const imageContainer = document.getElementById('imageContainer');
    const loader = document.getElementById('loader');

    loadImagesButton.addEventListener('click', async (event) => {
        event.preventDefault();
        loader.style.display = 'block';
        imageContainer.innerHTML = ''; // Очистка контейнера перед загрузкой новых изображений

        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.statusText);
            }
            const data = await response.json();
            const images = data.message;

            if (images.length === 0) {
                throw new Error('Нет изображений для отображения');
            }

            images.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Собака';
                imgElement.className = 'gallery__image';
                imageContainer.appendChild(imgElement);
            });
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
            alert('Произошла ошибка при загрузке изображений: ' + error.message);
        } finally {
            loader.style.display = 'none';
        }
    });
});
