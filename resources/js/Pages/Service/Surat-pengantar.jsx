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

export default function SuratPengantar({ documents }) {
    const [alert, setAlert] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        email: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        status_pernikahan: "",
        nik: "",
        kewarganegaraan: "",
        agama: "",
        pekerjaan: "",
        alamat: "",
        keperluan: "",
        no_surat: `RT/01/RW/03/${new Date().getFullYear()}/${
            documents.length + 1
        }`,
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
        post(route("surat-pengantar"), {
            onSuccess: () => {
                alertActive();
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
                        Formulir ini diperlukan untuk meproses permohonan anda
                    </h2>
                }
            >
                <GuestLayout className="lg:min-w-[50rem] lg:min-h-[40rem] mb-28">
                    <Head title="Surat Pengantar" />

                    <div className="container flex flex-col gap-y-24 px-16">
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
                                <span>Surat Pengantar</span>
                            </div>
                        </header>
                        <main>
                            <div className="container pb-20">
                                <form
                                    id="my-form"
                                    // method="POST"
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
                                        {/* email */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="email"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center ">
                                        {/* tempatlahir */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="tempat_lahir"
                                                value="Tempat Lahir"
                                            />
                                            <TextInput
                                                id="tempat_lahir"
                                                type="text"
                                                name="tempat_lahir"
                                                value={data.tempat_lahir}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="tempat_lahir"
                                                onChange={(e) =>
                                                    setData(
                                                        "tempat_lahir",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.tempat_lahir}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        {/* Tempat & Tanggal Lahir */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center text-center w-1/4 text-lg"
                                                htmlFor="tanggal_lahir"
                                                value="Tanggal Lahir"
                                            />
                                            <TextInput
                                                id="tanggal_lahir"
                                                type="date"
                                                name="tanggal_lahir"
                                                value={data.tanggal_lahir}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                autoComplete="bday"
                                                onChange={(e) =>
                                                    setData(
                                                        "tanggal_lahir",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.tanggal_lahir}
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
                                                <option value="">
                                                    Pilih Jenis Kelamin
                                                </option>
                                                <option value="Laki-Laki">
                                                    Laki-Laki
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

                                    <div className="flex flex-col justify-center">
                                        {/* Status Perkawinan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="status_pernikahan"
                                                value="Status Perkawinan"
                                            />
                                            <SelectInput
                                                id="status_pernikahan"
                                                name="status_pernikahan"
                                                value={data.status_pernikahan}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "status_pernikahan",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">status</option>
                                                <option value="Menikah">
                                                    Menikah
                                                </option>
                                                <option value="Belum Menikah">
                                                    Belum Menikah
                                                </option>
                                                <option value="Cerai Hidup">
                                                    Cerai
                                                </option>
                                            </SelectInput>
                                        </div>
                                        <InputError
                                            message={errors.status_perkawinan}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* No. KTP / KK */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="nik"
                                                value="nik"
                                            />
                                            <TextInput
                                                id="nik"
                                                type="text"
                                                name="nik"
                                                value={data.nik}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "nik",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.nik}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Kewarganegaraan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="kewarganegaraan"
                                                value="Kewarganegaraan"
                                            />
                                            <TextInput
                                                id="kewarganegaraan"
                                                type="text"
                                                name="kewarganegaraan"
                                                value={data.kewarganegaraan}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "kewarganegaraan",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.kewarganegaraan}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Agama */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="agama"
                                                value="Agama"
                                            />
                                            <TextInput
                                                id="agama"
                                                type="text"
                                                name="agama"
                                                value={data.agama}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "agama",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.agama}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Pekerjaan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="pekerjaan"
                                                value="Pekerjaan"
                                            />
                                            <TextInput
                                                id="pekerjaan"
                                                type="text"
                                                name="pekerjaan"
                                                value={data.pekerjaan}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "pekerjaan",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.pekerjaan}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Alamat */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="alamat"
                                                value="Alamat"
                                            />
                                            <TextInput
                                                id="alamat"
                                                type="text"
                                                name="alamat"
                                                value={data.alamat}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.alamat}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Keperluan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="keperluan"
                                                value="Keperluan"
                                            />
                                            <TextInput
                                                id="keperluan"
                                                type="text"
                                                name="keperluan"
                                                value={data.keperluan}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "keperluan",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.keperluan}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        {/* Keperluan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <TextInput
                                                id="no_surat"
                                                type="hidden"
                                                name="no_surat"
                                                value={data.no_surat}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "no_surat",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
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
                                        Permintaan Anda telah dikirim.
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Silakan cek email Anda secara berkala
                                        untuk informasi lebih lanjut.
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
