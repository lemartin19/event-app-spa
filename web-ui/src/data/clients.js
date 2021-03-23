'use es6';

const apiBase = 'http://localhost:4000/api/v1';

export const getUserPhotoPath = (userId) => `${apiBase}/photo/${userId}`;
