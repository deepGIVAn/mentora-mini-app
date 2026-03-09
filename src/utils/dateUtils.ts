export const calculateAge = (dobString: string): string => {
  if (!dobString) return 'N/A';
  
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return 'N/A';
  
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age >= 0 ? `${age} years` : 'N/A';
};

export const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  const [year, month, day] = dateString.split('-').map(Number);
  
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
