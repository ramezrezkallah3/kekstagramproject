function handleFilteringData(filterType, data){
   if (filterType === "random"){
        const randomPhotos = [];
        const usedIndexes = new Set();

        while (randomPhotos.length < 10) {
            const randomIndex = Math.floor(Math.random() * data.length);
            if (!usedIndexes.has(randomIndex)) {
            randomPhotos.push(data[randomIndex]);
            usedIndexes.add(randomIndex);
            }
        }
        return randomPhotos;
    } else if (filterType === "discussed"){
        const sortedPhotos = data.sort((a, b) => b.comments.length - a.comments.length)
        return sortedPhotos
    }
}

export {handleFilteringData}