import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";

import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function SuratPengantar() {
    const [alert, setAlert] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        email: "",
        asal: "",
        hanphone: "",
        jenis_kelamin: "",
    });

    const alertActive = () => {
        setAlert(true);
    };
    const closeModal = () => {
        setAlert(false);

        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("lapor"), {
            onSuccess: () => {
                alertActive();
                form.reset();
            },
            onError: (errors) => {
                console.error("Validasi gagal:", errors);
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Laporkan kunjungan tamu Anda dalam waktu 1 x 24 jam.
                        Pastikan data tamu lengkap dan benar untuk keperluan
                        verifikasi
                    </h2>
                }
            >
                <GuestLayout className="lg:min-w-[50rem] lg:min-h-[40rem] mb-2">
                    <Head title="Lapor 1 x 24 Jam" />

                    <div className="container flex flex-col gap-y-24 px-16">
                        <header>
                            <div className="container relative text-center text-xl font-extrabold flex flex-col justify-center items-center gap-3 mt-10">
                                <button
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                    className="absolute top-0 left-0 font-light 0 py-2 px-4 bg-[#9AD7F5]/50 hover:bg-[#9AD7F5]/25 transition shadow-inner rounded-2xl"
                                >
                                    Kembali
                                </button>
                                <span>Surat Pengantar</span>
                            </div>
                        </header>
                        <main>
                            <div className="container pb-20">
                                <form
                                    id="my-form"
                                    method="POST"
                                    onSubmit={submit}
                                >
                                    <div className="flex flex-col justify-center ">
                                        {/* Nama */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="nama"
                                                value="Nama"
                                            />
                                            <TextInput
                                                id="nama"
                                                type="text"
                                                name="nama"
                                                value={data.nama}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.nama}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center ">
                                        {/* Nama */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="asal"
                                                value="Asal"
                                            />
                                            <TextInput
                                                id="asal"
                                                type="text"
                                                name="asal"
                                                value={data.asal}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "asal",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.asal}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Tempat & Tanggal Lahir */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center text-center w-1/4 text-lg"
                                                htmlFor="handphone"
                                                value="NO. Handpone"
                                            />
                                            <TextInput
                                                id="handphone"
                                                type="text"
                                                name="handphone"
                                                value={data.handphone}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="bday"
                                                onChange={(e) =>
                                                    setData(
                                                        "handphone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.handphone}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Jenis Kelamin */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="jenis_kelamin"
                                                value="Jenis Kelamin"
                                            />
                                            <SelectInput
                                                id="jenis_kelamin"
                                                name="jenis_kelamin"
                                                value={data.jenis_kelamin}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "jenis_kelamin",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>Jenis Kelamin</option>
                                                <option value="Laki-laki">
                                                    Laki-laki
                                                </option>
                                                <option value="Perempuan">
                                                    Perempuan
                                                </option>
                                            </SelectInput>
                                        </div>
                                        <InputError
                                            message={errors.jenis_kelamin}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            <Modal show={alert} onClose={closeModal}>
                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Laporan Anda telah diterima.
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Laporan Anda akan diproses dalam waktu
                                        1x24 jam. Konfirmasi akan segera
                                        dilakukan oleh ketua RT
                                    </p>

                                    <div className="mt-6 flex justify-end">
                                        <PrimaryButton onClick={closeModal}>
                                            Oke
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </Modal>
                        </main>
                    </div>
                </GuestLayout>
            </AuthenticatedLayout>
        </>
    );
}
