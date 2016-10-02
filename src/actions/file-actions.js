export const UPDATE_FILE = 'update-file';

export function updateFile(data) {
  return {
    type: UPDATE_FILE,
    data,
  };
}

