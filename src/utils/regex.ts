export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
export const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]+$/;
export const phoneRegex = /^(?:\+[1-9]\d{7,14}|(?=(?:\D*\d){7,15}\D*$)[0-9\s\-()]+)$/;
