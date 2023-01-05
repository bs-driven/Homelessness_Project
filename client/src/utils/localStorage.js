export const getSavedHomeIds = () => {
    const SavedHomeIds = localStorage.getItem('saved_homes')
      ? JSON.parse(localStorage.getItem('saved_homess'))
      : [];
  
    return SavedHomeIds;
  };

  export const saveHomeIds = (homeArr) => {
    if (homeArr.length) {
      localStorage.setItem('saved_homes', JSON.stringify(homeArr));
    } else {
      localStorage.removeItem('saved_homes');
    }
  };

  export const removeHomeId = (homeId) => {
    const savedHomeIds = localStorage.getItem('saved_homes')
      ? JSON.parse(localStorage.getItem('saved_homes'))
      : null;
  
    if (!savedHomeIds) {
      return false;
    }

    const updatedSavedHomeIds = savedHomeIds?.filter((savedHomeId) => savedHomeId !== homeId);
  localStorage.setItem('saved_trails', JSON.stringify(updatedSavedHomeIds));

  return true;
};