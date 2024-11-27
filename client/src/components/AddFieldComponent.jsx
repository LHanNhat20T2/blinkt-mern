import { IoClose } from "react-icons/io5";
const AddFieldComponent = ({ close, value, onChange, submit }) => {
    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 bg-opacity-70">
            <div className="w-full max-w-md p-4 bg-white rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Add Field</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <input
                    placeholder="Enter field name"
                    className="w-full p-2 my-3 border rounded outline-none bg-blue-50 focus-within:border-primary-100"
                    value={value}
                    onChange={onChange}
                />
                <button
                    onClick={submit}
                    className="block px-4 py-2 mx-auto rounded hover:bg-primary-100 bg-primary-200 w-fit"
                >
                    Add Field
                </button>
            </div>
        </section>
    );
};
export default AddFieldComponent;
