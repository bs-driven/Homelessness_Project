export const getSavedShelterIds = () => {
    const SavedShelterIds = localStorage.getItem('saved_shelters')
      ? JSON.parse(localStorage.getItem('saved_shelters'))
      : [];
  
    return SavedShelterIds;
  };

  export const saveShelterIds = (shelterArr) => {
    if (shelterArr.length) {
      localStorage.setItem('saved_shelters', JSON.stringify(shelterArr));
    } else {
      localStorage.removeItem('saved_shelters');
    }
  };

  export const removeShelterId = (shelterId) => {
    const savedShelterIds = localStorage.getItem('saved_shelters')
      ? JSON.parse(localStorage.getItem('saved_shelters'))
      : null;
  
    if (!savedShelterIds) {
      return false;
    }

    const updatedSavedShelterIds = savedShelterIds?.filter((savedShelterId) => savedShelterId !== shelterId);
  localStorage.setItem('saved_shelters', JSON.stringify(updatedSavedShelterIds));

  return true;
};