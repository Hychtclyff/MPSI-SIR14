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

export default function Main({ civils }) {
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
        if (modal == 1) {
            post(route("announcement.store"), {
                onSuccess: () => {
                    alertActive();
                },
                onError: (errors) => {
                    console.error("Validasi gagal:", errors);
                },
            });
        }
        if (modal == 2) {
            put(route("announcement.update", idTarget), {
                onSuccess: () => {
                    alertActive();
                },
                onError: (errors) => {
                    console.error("Validasi gagal:", errors);
                },
            });
        }
        if (modal == 3) {
            destroye(route("announcement.destroy", idTarget), {
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

    const updateAnnunce = (e, id) => {
        // e.preventDefault();
        setIdTarget(id);
        const newData = data.find((e) => e.id == id);
        if (!newData) {
            return;
        }

        setData({
            announcement: newData.announcement,
            topic: newData.topic,

            id: newData.id,
        });
    };

    return (
        <>
            <AuthenticatedLayout>
                <GuestLayout
                    className="lg:min-w-[70rem] lg:min-h-screen overflow-visible "
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
                                <span>Data Warga</span>
                            </div>
                        </header>
                        <main>
                            <div className="flex flex-col gap-3">
                                {civils.map((e, index) => {
                                    return (
                                        <Dropdown key={index}>
                                            <div className="flex text-xl gap-20    justify-evenly   action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner">
                                                <div className="flex  ps-5 items-center  w-1/2 justify-start text-center  ">
                                                    <span className="flex-2">
                                                        {index + 1}
                                                    </span>
                                                    <span className="flex-1">
                                                        {e.topic}
                                                    </span>
                                                    <span className="flex1">
                                                        {new Date(
                                                            e.created_at
                                                        ).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="action ">
                                                    <div className="action text-blue-600 flex gap-3">
                                                        <Dropdown.Trigger>
                                                            <button
                                                                type="button"
                                                                className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                            >
                                                                Cek
                                                            </button>
                                                        </Dropdown.Trigger>
                                                        <button
                                                            type="button"
                                                            className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                            onClick={() => {
                                                                get(
                                                                    route(
                                                                        "profile-edit",
                                                                        e.id
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                            onClick={() => {
                                                                setIdTarget(
                                                                    e.id
                                                                );
                                                                setModal(3);
                                                                alertActive();
                                                            }}
                                                        >
                                                            hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <Dropdown.Content
                                                className="w-full"
                                                contentClasses=" bg-white p-2 px-5  "
                                            >
                                                <div>
                                                    <div class="px-4 sm:px-0">
                                                        <h3 class="text-base font-semibold leading-7 text-gray-900">
                                                            Informasi Warga
                                                        </h3>
                                                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                                            Data Diri Warga
                                                        </p>
                                                    </div>
                                                    <div class="mt-6 border-t border-gray-100">
                                                        <dl class="divide-y divide-gray-100">
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Nama
                                                                </dt>
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {e.nama}
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    NIK
                                                                </dt>
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {e.nik}
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Tempat,
                                                                    Tanggal
                                                                    Lahir
                                                                </dt>
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.tempat_lahir
                                                                    }
                                                                    , {""}
                                                                    {
                                                                        e.tanggal_lahir
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Jenis
                                                                    Kelamin
                                                                </dt>
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.jenis_kelamin
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    status
                                                                </dt>
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.status_perkawinan
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Kewarganegaraan
                                                                </dt>
                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.kewarganegaraan
                                                                    }
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Agama
                                                                </dt>
                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    {e.agama}
                                                                </dd>
                                                            </div>
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                                                    Pekerjaan
                                                                </dt>
                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.pekerjaan
                                                                    }
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
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
                                Berita Berasil Di Perbaharui
                            </h2>

                            <div className="mt-6 flex justify-end gap-3">
                                <PrimaryButton onClick={closeModal}>
                                    close
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
                                                "data-warga.destroy",
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
