export const baseUrl = "http://localhost:4000";

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post",
    },
    login: {
        url: "api/user/login",
        method: "post",
    },
    forgot_password: {
        url: "api/user/forgot-password",
        method: "put",
    },
    forgot_password_otp_verification: {
        url: "api/user/verify-forgot-password-otp",
        method: "put",
    },
    resetPassword: {
        url: "api/user/reset-password",
        method: "put",
    },
    refreshToken: {
        url: "api/user/refresh-token",
        method: "post",
    },
    userDetails: {
        url: "api/user/user-details",
        method: "get",
    },
    logout: {
        url: "api/user/logout",
        method: "get",
    },
    uploadAvatar: {
        url: "api/user/upload-avatar",
        method: "put",
    },
};
export default SummaryApi;
