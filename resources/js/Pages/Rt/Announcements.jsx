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

export default function Main({ announcementData }) {
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
        const newData = announcementData.find((e) => e.id == id);
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
                <GuestLayout className="lg:min-w-[50rem] lg:min-h-[40rem]  ">
                    <Head title="Surat Pengantar" />

                    <div className="container flex flex-col gap-y-10 px-16">
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
                                <span>Pengumuman</span>
                            </div>
                        </header>
                        <main>
                            <div className="container ">
                                <form onSubmit={submit}>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="topic"
                                                value="Topic"
                                            />
                                            <TextInput
                                                id="topic"
                                                type="text"
                                                name="topic"
                                                value={data.topic}
                                                isFocused={true}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "topic",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.topic}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="announcement"
                                                value="Announcement"
                                            />

                                            <textarea
                                                id="announcement"
                                                type="text"
                                                name="announcement"
                                                value={data.announcement}
                                                className="mt-1 block w-3/4  align-top   h-72 text-start  'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md  bg-[#9AD7F5]/50 shadow-inner "
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "announcement",
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                        <InputError
                                            message={errors.announcement}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        {!data.id ? (
                                            <PrimaryButton
                                                className="ms-4"
                                                disabled={processing}
                                                onClick={(e) => {
                                                    setModal(1);
                                                    submit(e);
                                                }}
                                            >
                                                Submit
                                            </PrimaryButton>
                                        ) : (
                                            <PrimaryButton
                                                className="ms-4"
                                                disabled={processing}
                                                onClick={(e) => {
                                                    setModal(2);
                                                    submit(e);
                                                }}
                                            >
                                                Edit
                                            </PrimaryButton>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
                </GuestLayout>

                <GuestLayout
                    className="lg:min-w-[70rem] lg:min-h-[40rem]  "
                    classContent="min-h-0"
                >
                    <Head title="Surat Pengantar" />

                    <div className="container flex flex-col gap-y-10 px-16">
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
                                <span>Pengumuman</span>
                            </div>
                        </header>
                        <main>
                            <div className="flex flex-col gap-3">
                                {announcementData.map((e, index) => {
                                    return (
                                        <Dropdown>
                                            <div
                                                key={index}
                                                className="flex text-xl gap-20    justify-evenly   action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                            >
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
                                                                Berita
                                                            </button>
                                                        </Dropdown.Trigger>
                                                        <button
                                                            type="button"
                                                            className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                updateAnnunce(
                                                                    event,
                                                                    e.id
                                                                );
                                                            }}
                                                        >
                                                            update
                                                        </button>
                                                        <button
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                setModal(3);
                                                                alertActive();
                                                                setIdTarget(
                                                                    e.id
                                                                );
                                                            }}
                                                            type="button"
                                                            className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                        >
                                                            Hapus
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
                                                            Pengumuman
                                                        </h3>
                                                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                                            Topic: {e.topic}
                                                        </p>
                                                    </div>
                                                    <div class="mt-6 border-t border-gray-100">
                                                        <dl class="divide-y divide-gray-100">
                                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        e.announcement
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
                                        submit(e);
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
