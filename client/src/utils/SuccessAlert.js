import Swal from "sweetalert2";
const successAlert = (title) => {
    const alert = Swal.fire({
        icon: "success",
        title: title,
        color: "#fff",
    });
    return alert;
};

export default successAlert;
