import { useState, useRef } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import Dropdown from "@/Components/Dropdown";

import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";

export default function Dashboard({
    family_member,
    user_id,
    reqDoc,
    repGuest,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="SIR14 | Dasboard" />

            <BodyContent
                family_member={family_member}
                user_id={user_id}
                reqDoc={reqDoc}
                repGuest={repGuest}
            />
        </AuthenticatedLayout>
    );
}

function BodyContent({ family_member, user_id, reqDoc, repGuest }) {
    const [alert, setAlert] = useState(false);
    const [modal, setModal] = useState(0);
    const [idTarget, setIdTarget] = useState("");

    const { data, setData, put, post, get, processing, errors, reset } =
        useForm({
            link: "",
            response: "",
        });
    const user = usePage().props.auth.user;

    const alertActive = () => {
        setAlert(true);
    };
    const closeModal = () => {
        setAlert(false);
    };

    const submitModal = () => {
        put(route("document.update", idTarget), {
            onSuccess: () => {
                closeModal();
            },
        });
    };
    const confGuest = () => {
        put(route("report-guest.update", idTarget), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const prosesData = (event, idReq) => {
        event.preventDefault();
        const action =
            "https://script.google.com/macros/s/AKfycbx4QVXmKIeD8BGZdNrflpRqDWFheFNc5bxoDbCah_sRV-G6HQp9gr6sBiN2IdPijDz-Bw/exec";

        const data = reqDoc.filter((e) => {
            return e.id == idReq;
        });

        if (data.length > 0) {
            const formData = new URLSearchParams();

            data.forEach((item) => {
                for (const key in item) {
                    formData.append(key, item[key]);
                }
            });
            fetch(action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(() => {
                    put(route("document.update", idReq), {
                        onSuccess: () => {
                            setModal(1);
                            setAlert(true);
                        },
                    });
                })
                .catch((error) => {});
        }
    };

    return (
        <>
            <section>
                <div className="container relative flex flex-col  items-center justify-center mx-auto account mt-14 py-10 gap-10 ">
                    <div className="header text-5xl  flex flex-col justify-center items-center font-extrabold gap-2">
                        <span>Ruang Kerja Admin</span>
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
                    <div className="body row flex items-center  text-3xl text-center gap-10 ">
                        <div className="account flex flex-col gap-3 justify-center items-center text-xl shadow-lg pt-5 p-5 bg-white rounded-2xl w-56 h-56  shadow-[#9AD7F5]">
                            <img
                                src="/img/Stickman.png"
                                alt="profile"
                                className="w-36"
                            />
                            <span>{user.name}</span>
                        </div>
                        <div className="announcement flex flex-col gap-3 justify-center items-center text-xl shadow-lg  p-10 bg-white rounded-2xl w-56 h-56  shadow-[#9AD7F5]">
                            <a href={route("announcement.index")}>
                                <img src="/img/berita.png" alt="berita" />
                                <span>Pengumuman</span>
                            </a>
                        </div>
                        <div className="data flex flex-col gap-10 text-xl shadow-lg p-11 bg-white rounded-2xl w-56 h-56  shadow-[#9AD7F5]">
                            <a href={route("data.index")}>
                                <img src="/img/lapor.png" alt="profile" />
                                <span>Data Warga</span>
                            </a>
                        </div>
                        <div className="krtik flex flex-col gap-3 justify-center items-center text-xl shadow-lg  p-10 bg-white rounded-2xl w-56 h-56  shadow-[#9AD7F5]">
                            <a href={route("criticism.index")}>
                                <img src="/img/kritik.png" alt="kritik" />
                                <span>Saran & Kritik</span>
                            </a>
                        </div>
                        <div className="data flex flex-col gap-10 text-xl shadow-lg p-11 bg-white rounded-2xl w-56 h-56  shadow-[#9AD7F5]">
                            <a href={route("DataUser.index")}>
                                <img src="/img/user-icon.jpeg" alt="profile" />
                                <span>User</span>
                            </a>
                        </div>
                    </div>

                    <div className="request">
                        <div className="container flex flex-col gap-10 shadow-lg pt-10 p-16 bg-white rounded-2xl  shadow-[#9AD7F5] w-[64rem]">
                            <span className="text-3xl font-light">
                                Permintaan
                            </span>
                            <div className="item flex flex-col gap-3">
                                <span className="text-xl px-3">Surat</span>

                                {reqDoc.map((e, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex text-xl gap-10   justify-evenly items-center  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                        >
                                            <svg
                                                width="58"
                                                height="42"
                                                viewBox="0 0 58 42"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.5715 12.8569L29.1429 22.3569L42.7143 12.8569"
                                                    stroke="black"
                                                    stroke-width="2.58"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M2 34.5714V7.42857C2 4.43045 4.43045 2 7.42857 2H50.8571C53.8553 2 56.2857 4.43045 56.2857 7.42857V34.5714C56.2857 37.5696 53.8553 40 50.8571 40H7.42857C4.43045 40 2 37.5696 2 34.5714Z"
                                                    stroke="black"
                                                    stroke-width="2.58"
                                                />
                                            </svg>
                                            <span>{e.no_surat}</span>

                                            <span>{e.user_name}</span>
                                            <span>
                                                {new Date(
                                                    e.created_at
                                                ).toLocaleString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <div className="action">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <span className="flex gap-5 relative   px-10 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner">
                                                            <button type="button">
                                                                {e.response
                                                                    ? "Ditolak"
                                                                    : "Proses   "}
                                                            </button>
                                                        </span>
                                                    </Dropdown.Trigger>
                                                    {!e.response && (
                                                        <Dropdown.Content>
                                                            <a
                                                                className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                href="https://docs.google.com/spreadsheets/d/1nXKxnEJf8ebkg_MSZDa92yV8kqnCsasuWtHgC3N_3uE/edit?usp=sharing"
                                                                target="_blank"
                                                            >
                                                                Cek Data
                                                            </a>
                                                            {!e.status && (
                                                                <button
                                                                    className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        prosesData(
                                                                            event,
                                                                            e.id
                                                                        );
                                                                    }}
                                                                >
                                                                    Proses
                                                                </button>
                                                            )}

                                                            <button
                                                                className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={() => {
                                                                    alertActive();
                                                                    setIdTarget(
                                                                        e.id
                                                                    );
                                                                    setModal(2);
                                                                }}
                                                            >
                                                                Konfirmasi
                                                            </button>

                                                            <button
                                                                className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    setIdTarget(
                                                                        e.id
                                                                    );
                                                                    setModal(3);
                                                                    alertActive();
                                                                }}
                                                            >
                                                                tolak
                                                            </button>
                                                        </Dropdown.Content>
                                                    )}
                                                </Dropdown>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="reqGue item flex flex-col gap-3">
                                    <span className="text-xl px-3">Tamu</span>

                                    {repGuest.map((e, index) => {
                                        return (
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <div
                                                        key={index}
                                                        className="flex text-xl gap-10   justify-evenly items-center  action hover:bg-[#9AD7F5]/50 cursor-pointer bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                    >
                                                        <svg
                                                            width="57"
                                                            height="57"
                                                            viewBox="0 0 57 57"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M28.5 2C13.8644 2 2 13.8644 2 28.5C2 43.1354 13.8644 55 28.5 55C43.1354 55 55 43.1354 55 28.5C55 13.8644 43.1354 2 28.5 2Z"
                                                                stroke="black"
                                                                stroke-width="2.24"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M8.01814 45.3155C8.01814 45.3155 13.925 37.7744 28.5 37.7744C43.075 37.7744 48.9821 45.3155 48.9821 45.3155"
                                                                stroke="black"
                                                                stroke-width="2.24"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                            <path
                                                                d="M28.5 28.5006C32.8908 28.5006 36.45 24.9414 36.45 20.5506C36.45 16.1599 32.8908 12.6006 28.5 12.6006C24.1092 12.6006 20.55 16.1599 20.55 20.5506C20.55 24.9414 24.1092 28.5006 28.5 28.5006Z"
                                                                stroke="black"
                                                                stroke-width="2.24"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                        <span>
                                                            {e.user_name}
                                                        </span>
                                                        <span>{e.nama}</span>
                                                        <span>
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
                                                        <div className="action">
                                                            <Dropdown.Content>
                                                                {!e.status && (
                                                                    <button
                                                                        className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                        onClick={() => {
                                                                            alertActive();
                                                                            setIdTarget(
                                                                                e.id
                                                                            );
                                                                            setModal(
                                                                                4
                                                                            );
                                                                        }}
                                                                    >
                                                                        Konfirmasi
                                                                    </button>
                                                                )}
                                                            </Dropdown.Content>
                                                        </div>
                                                    </div>
                                                </Dropdown.Trigger>
                                            </Dropdown>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalAlert alert={alert} closeModal={closeModal}>
                    {modal == 1 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Data Berhasil Di Proses
                            </h2>

                            <div className="mt-6 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    Tutup
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                    {modal == 2 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Silakan masukan link documents
                            </h2>

                            <TextInput
                                id="link"
                                type="text"
                                name="link"
                                value={data.link}
                                className="mt-1 block w-full bg-[#9AD7F5]/50 shadow-inner"
                                autoComplete="bday"
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                            />

                            <div className="mt-6 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => {
                                        submitModal();
                                    }}
                                >
                                    Kirim
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                    {modal == 3 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Berikan Pesan Perbaikan!
                            </h2>

                            <TextInput
                                id="response"
                                type="text"
                                name="response"
                                value={data.response}
                                className="mt-1 block w-full bg-[#9AD7F5]/50 shadow-inner"
                                autoComplete="bday"
                                onChange={(e) =>
                                    setData("response", e.target.value)
                                }
                            />

                            <div className="mt-6 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => {
                                        submitModal();
                                    }}
                                >
                                    Kirim
                                </PrimaryButton>
                            </div>
                        </div>
                    )}

                    {modal == 4 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Berikan Pesan!
                            </h2>

                            <TextInput
                                id="response"
                                type="text"
                                name="response"
                                value={data.response}
                                className="mt-1 block w-full bg-[#9AD7F5]/50 shadow-inner"
                                autoComplete="bday"
                                onChange={(e) =>
                                    setData("response", e.target.value)
                                }
                            />

                            <div className="mt-6 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => {
                                        confGuest();
                                    }}
                                >
                                    Kirim
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </ModalAlert>
            </section>
        </>
    );
}
const ModalAlert = ({ alert, closeModal, children }) => {
    return (
        <Modal show={alert} onClose={closeModal}>
            {children}
        </Modal>
    );
};
