import Editsvg from "@/Components/EditButtonSvg";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";
import { useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Dashboard({ data }) {
    return (
        <AuthenticatedLayout>
            <Head title="SIR14 | Dasboard" />

            <BodyContent familyData={data} />
        </AuthenticatedLayout>
    );
}

function BodyContent({ familyData }) {
    const [alert, setAlert] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        pp: "",
        nama: familyData.nama,
        tempat_lahir: familyData.tempat_lahir,
        tanggal_lahir: familyData.tanggal_lahir,
        jenis_kelamin: familyData.jenis_kelamin,
        status_perkawinan: familyData.status_perkawinan,
        nik: familyData.nik,
        kewarganegaraan: familyData.kewarganegaraan,
        agama: familyData.agama,
        pekerjaan: familyData.pekerjaan,
        status_dalam_keluarga: familyData.status_dalam_keluarga,
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
        post(route("edit-member.update", familyData.id), {
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
            <section>
                <div className="container relative flex flex-col  items-center justify-center mx-auto account mt-14 py-10 gap-10 ">
                <button
                        onClick={() => {
                            window.history.back();
                        }}
                        className="absolute top-44 left-20 py-2 px-4 bg-[#9AD7F5]/50 hover:bg-[#9AD7F5]/25 transition shadow-inner rounded-2xl"
                    >
                        Kembali
                    </button>
                    <div className="header text-5xl  flex flex-col justify-center items-center font-extrabold gap-2">
                        <span>Edit Profile</span>
                        <svg
                            width="249"
                            height="12"
                            viewBox="0 0 249 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_i_120_130)">
                                <path
                                    d="M22.5 0.311035L248.5 11.811H0L22.5 0.311035Z"
                                    fill="#9AD7F5"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_i_120_130"
                                    x="0"
                                    y="0.311035"
                                    width="248.5"
                                    height="15.5"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="arithmetic"
                                        k2="-1"
                                        k3="1"
                                    />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="shape"
                                        result="effect1_innerShadow_120_130"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    <div className="container mx-auto py-20 shadow-[#9AD7F5] shadow-lg bg-white rounded-xl">
                        <form id="my-form" method="POST" onSubmit={submit}>
                            <div className=" flex justify-evenly  ">
                                <div className=" w-1/4 flex flex-col p-3 gap-3 just items-center ">
                                    <img src="/img/stickman.png" alt="" />
                                    <div className="flex gap-10 justify-center my-2">
                                        <TextInput
                                            id="pp"
                                            type="file"
                                            name="pp"
                                            value={data.pp}
                                            className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("pp", e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.nama}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="container w-1/2">
                                    <div className="flex flex-col justify-center">
                                        {/* No. KTP / KK */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="nik"
                                                value="NIK"
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
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        {/* Tempat & Tanggal Lahir */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center text-center w-1/4 text-lg"
                                                htmlFor="ttl"
                                                value="Tanggal Lahir"
                                            />
                                            <TextInput
                                                id="ttl"
                                                type="date"
                                                name="ttl"
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

                                    <div className="flex flex-col justify-center">
                                        {/* Status Perkawinan */}
                                        <div className="flex gap-10 justify-start my-2">
                                            <InputLabel
                                                className="flex items-center justify-center w-1/4 text-lg"
                                                htmlFor="status_perkawinan"
                                                value="Status Perkawinan"
                                            />
                                            <SelectInput
                                                id="status_perkawinan"
                                                name="status_perkawinan"
                                                value={data.status_perkawinan}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "status_perkawinan",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Kawin">
                                                    Kawin
                                                </option>
                                                <option value="Belum Kawin">
                                                    Belum Kawin
                                                </option>
                                                <option value="Cerai Hidup">
                                                    Cerai Hidup
                                                </option>
                                                <option value="Cerai Mati">
                                                    Cerai Mati
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
                                                htmlFor="family_status"
                                                value="Status Dalam Keluarga"
                                            />
                                            <SelectInput
                                                id="family_status"
                                                name="family_status"
                                                value={data.family_status}
                                                className="mt-1 block w-3/4 bg-[#9AD7F5]/50 shadow-inner"
                                                onChange={(e) =>
                                                    setData(
                                                        "family_status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Istri">
                                                    Istri
                                                </option>
                                                <option value=" Anak">
                                                    Anak
                                                </option>
                                                <option value="Suami">
                                                    Suami
                                                </option>
                                                <option value="Lainya">
                                                    lainya
                                                </option>
                                            </SelectInput>
                                        </div>
                                        <InputError
                                            message={errors.ktp_kk}
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

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
