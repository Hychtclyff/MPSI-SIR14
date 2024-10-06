import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import SelectInput from "@/Components/SelectInput";

export default function Main({ user }) {
    const [alert, setAlert] = useState(false);
    const {
        data,
        setData,
        post,
        get,
        delete: destroye,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        id: "",
        announcement: "",
        topic: "",
        path_img: "",
        role: "",
    });
    const [modal, setModal] = useState(0);
    const [idTarget, setIdTarget] = useState("");

    const alertActive = () => {
        setAlert(true);
    };
    const closeModal = () => {
        setAlert(false);

        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (modal == 2) {
            put(route("user.update", idTarget), {
                onSuccess: () => {
                    alertActive();
                },
                onError: (errors) => {
                    console.error("Validasi gagal:", errors);
                },
            });
        }
        if (modal == 3) {
            destroye(route("user.destroy", idTarget), {
                onSuccess: () => {
                    closeModal();
                    setModal(4);
                    alertActive();
                },
                onError: (errors) => {
                    console.error("Validasi gagal:", errors);
                },
            });
        }
    };

    return (
        <>
            <AuthenticatedLayout>
                <GuestLayout
                    className="lg:min-w-[70rem] lg:min-h-screen overflow-visible mt-20"
                    classContent="min-h-0"
                >
                    <Head title="Data Warga" />

                    <div className="container flex flex-col gap-y-10 px-16 ">
                        <header>
                            <div className="container relative text-center text-xl font-extrabold flex flex-col justify-center items-center gap-3 mt-10">
                                <button
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                    className="absolute top-0 left-0 font-light py-2 px-4 bg-[#9AD7F5]/50 hover:bg-[#9AD7F5]/25 transition shadow-inner rounded-2xl"
                                >
                                    Kembali
                                </button>
                                <span>User</span>
                            </div>
                        </header>
                        <main>
                            <div className="flex flex-col gap-3">
                                {user.map((e, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex text-xl gap-20    justify-evenly   action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                        >
                                            <div className="flex  ps-5 items-center  w-1/2 justify-start text-center  ">
                                                <span className="flex-2">
                                                    {index + 1}
                                                </span>
                                                <span className="flex-1">
                                                    {e.name}
                                                </span>
                                                <span className="flex1">
                                                    {e.role}
                                                </span>
                                            </div>
                                            <div className="action ">
                                                <div className="action text-blue-600 flex gap-3">
                                                    <button
                                                        type="button"
                                                        className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                        onClick={() => {
                                                            setIdTarget(e.id);
                                                            setModal(2);
                                                            alertActive();
                                                        }}
                                                    >
                                                        update
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                        onClick={() => {
                                                            setIdTarget(e.id);
                                                            setModal(3);
                                                            alertActive();
                                                        }}
                                                    >
                                                        hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </main>
                    </div>
                </GuestLayout>
            </AuthenticatedLayout>
            <Modal show={alert} onClose={closeModal}>
                {modal == 1 && (
                    <>
                        {" "}
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Berita Berhasil Di Tambahkan
                            </h2>

                            <div className="mt-6 flex justify-end gap-3">
                                <PrimaryButton onClick={closeModal}>
                                    close
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                )}
                {modal == 2 && (
                    <>
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Update Role
                            </h2>
                            <div className="flex flex-col justify-center">
                                {/* Jenis Kelamin */}
                                <div className="flex gap-10 justify-start my-2">
                                    <SelectInput
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    >
                                        <option value="">Piilih Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="rt">Rt</option>
                                        <option value="warga">Warga</option>
                                    </SelectInput>
                                </div>
                                <InputError
                                    message={errors.jenis_kelamin}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <PrimaryButton onClick={closeModal}>
                                    close
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={(e) => {
                                        put(route("user.update", idTarget), {
                                            onSuccess: () => {
                                                closeModal();
                                            },
                                        });
                                    }}
                                >
                                    Update
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                )}
                {modal == 3 && (
                    <>
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Apa data ingin dihapus?
                            </h2>

                            <div className="mt-6  flex justify-end gap-3">
                                <PrimaryButton onClick={closeModal}>
                                    close
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={(e) => {
                                        destroye(
                                            route(
                                                "user.destroy",
                                                idTarget
                                            ),
                                            {
                                                onSuccess: () => {
                                                    closeModal();
                                                },
                                            }
                                        );
                                    }}
                                >
                                    Hapus
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                )}
                {modal == 4 && (
                    <>
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Berita Berasil Di hapus
                            </h2>

                            <div className="mt-6 flex justify-end gap-3">
                                <PrimaryButton onClick={closeModal}>
                                    close
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}
