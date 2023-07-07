export interface ChangePassword {
    email: string | undefined;
    currentPassword: string | undefined;
    newPassword: string | undefined;
    confirmPassword: string | undefined;
}