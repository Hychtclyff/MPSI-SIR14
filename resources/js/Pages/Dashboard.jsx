import Dropdown from "@/Components/Dropdown";
import Editsvg from "@/Components/EditButtonSvg";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

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
    const Guest = repGuest.filter((e) => {
        return !e.cek_out;
    });
    const user = usePage().props.auth.user;
    const [alert, setAlert] = useState(false);
    const [modal, setModal] = useState(0);

    const { get, delete: destroy, put } = useForm();
    const [idTarget, setIdTarget] = useState("");

    const alertActive = () => {
        setAlert(true);
    };
    const closeModal = () => {
        setAlert(false);
    };
    return (
        <>
            <section>
                <div className="container relative flex flex-col  items-center justify-center mx-auto account mt-14 py-10 gap-10 ">
                    <div className="header text-5xl  flex flex-col justify-center items-center font-extrabold gap-2">
                        <span>Account</span>
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
                    <div className="body flex items-center  text-3xl text-center gap-10 ">
                        <div className="account flex flex-col gap-10 shadow-lg pt-10 p-16 bg-white rounded-2xl  shadow-[#9AD7F5]">
                            <img src="/img/Stickman.png" alt="profile" />
                            <div className="flex gap-10  justify-evenly items-center text-center text-2xl action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner">
                                <span>{user.name}</span>
                            </div>
                        </div>
                        <div className="member flex font-light  flex-col gap-5 shadow-lg pt-10 pb-5 px-10 bg-white rounded-2xl h-[30rem] min-w-[36rem]   shadow-[#9AD7F5]  ">
                            <span>Anggota</span>
                            <ul className="flex flex-col gap-3 text-3xl overflow-y-auto h-full   ">
                                {family_member.map((e, index) => {
                                    return (
                                        <li key={index}>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="flex gap-5 relative   px-10 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner">
                                                        <button type="button">
                                                            {e.nama}
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "profile-detail",
                                                            e.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "profile-edit",
                                                            e.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="flex gap-5  hover:bg-[#9AD7F5]/50 cursor-pointer transition px-10 justify-between items-center  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner">
                                <span>tambah</span>
                                <a href={route("new-member.index", user_id)}>
                                    <svg
                                        width="56"
                                        height="56"
                                        viewBox="0 0 56 56"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g filter="url(#filter0_di_287_322)">
                                            <circle
                                                cx="28"
                                                cy="24"
                                                r="24"
                                                fill="white"
                                            />
                                        </g>
                                        <path
                                            d="M13 25H28M28 25H43M28 25V10M28 25V40"
                                            stroke="black"
                                            stroke-width="5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <defs>
                                            <filter
                                                id="filter0_di_287_322"
                                                x="0"
                                                y="0"
                                                width="56"
                                                height="56"
                                                filterUnits="userSpaceOnUse"
                                                color-interpolation-filters="sRGB"
                                            >
                                                <feFlood
                                                    flood-opacity="0"
                                                    result="BackgroundImageFix"
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
                                                    operator="out"
                                                />
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                                />
                                                <feBlend
                                                    mode="normal"
                                                    in2="BackgroundImageFix"
                                                    result="effect1_dropShadow_287_322"
                                                />
                                                <feBlend
                                                    mode="normal"
                                                    in="SourceGraphic"
                                                    in2="effect1_dropShadow_287_322"
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
                                                    result="effect2_innerShadow_287_322"
                                                />
                                            </filter>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="request">
                        <div className="container flex flex-col gap-10 shadow-lg pt-10 p-16 px-8 bg-white rounded-2xl  shadow-[#9AD7F5] w-[64rem]">
                            <span className="text-3xl font-light">
                                Status Pengajuan
                            </span>
                            <div className="item flex flex-col gap-3 ">
                                <span className="text-xl px-3">Surat</span>
                                {reqDoc.map((e, index) => {
                                    return (
                                        <Dropdown>
                                            <div
                                                key={index}
                                                className="flex  text-xl gap-20    justify-evenly text-center items-center  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
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
                                                <span>Surat Pengantar</span>
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
                                                    {e.response ||
                                                    e.response != null ? (
                                                        <>
                                                            <div className="action text-blue-600 flex gap-3">
                                                                <Dropdown.Trigger>
                                                                    <button
                                                                        type="button"
                                                                        className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                                    >
                                                                        pesan
                                                                    </button>
                                                                </Dropdown.Trigger>
                                                                <button
                                                                    onClick={() => {
                                                                        get(
                                                                            route(
                                                                                "surat-pengantar-edit",
                                                                                e.id
                                                                            )
                                                                        );
                                                                    }}
                                                                    type="button"
                                                                    className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setModal(
                                                                            1
                                                                        );
                                                                        setIdTarget(
                                                                            e.id
                                                                        );
                                                                        alertActive();
                                                                    }}
                                                                    type="button"
                                                                    className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : e.link ? (
                                                        <>
                                                            <a
                                                                href={e.link}
                                                                target="_blank"
                                                            >
                                                                <svg
                                                                    width="56"
                                                                    height="56"
                                                                    viewBox="0 0 56 56"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g filter="url(#filter0_di_120_267)">
                                                                        <circle
                                                                            cx="28"
                                                                            cy="24"
                                                                            r="24"
                                                                            fill="white"
                                                                        />
                                                                    </g>
                                                                    <path
                                                                        d="M43.2 12L9 25.5L21.6 27.3M43.2 12L38.7 39L21.6 27.3M43.2 12L21.6 27.3M21.6 27.3V37.2L27.4478 31.3012"
                                                                        stroke="black"
                                                                        stroke-width="1.69"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                    <defs>
                                                                        <filter
                                                                            id="filter0_di_120_267"
                                                                            x="0"
                                                                            y="0"
                                                                            width="56"
                                                                            height="56"
                                                                            filterUnits="userSpaceOnUse"
                                                                            color-interpolation-filters="sRGB"
                                                                        >
                                                                            <feFlood
                                                                                flood-opacity="0"
                                                                                result="BackgroundImageFix"
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
                                                                                operator="out"
                                                                            />
                                                                            <feColorMatrix
                                                                                type="matrix"
                                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                                                            />
                                                                            <feBlend
                                                                                mode="normal"
                                                                                in2="BackgroundImageFix"
                                                                                result="effect1_dropShadow_120_267"
                                                                            />
                                                                            <feBlend
                                                                                mode="normal"
                                                                                in="SourceGraphic"
                                                                                in2="effect1_dropShadow_120_267"
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
                                                                                result="effect2_innerShadow_120_267"
                                                                            />
                                                                        </filter>
                                                                    </defs>
                                                                </svg>
                                                            </a>
                                                        </>
                                                    ) : (
                                                        "proses"
                                                    )}
                                                </div>
                                            </div>
                                            <Dropdown.Content
                                                className="w-full"
                                                contentClasses=" bg-white  p-2 px-5  "
                                            >
                                                <div>
                                                    <div class="px-4 sm:px-0">
                                                        <h3 class="text-base font-semibold leading-7 text-gray-900">
                                                            Pesan Dari RT
                                                        </h3>
                                                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                                            {e.response}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    );
                                })}
                                <span className="text-xl px-3">Tamu</span>
                                {Guest.map((e, index) => {
                                    return (
                                        <Dropdown>
                                            <div
                                                key={index}
                                                className="flex text-xl gap-24    justify-evenly items-center  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
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

                                                <span>{e.nama}</span>
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
                                                    {!e.response ? (
                                                        <>
                                                            <div className="action text-blue-600">
                                                                <span>
                                                                    {" "}
                                                                    proses
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="action text-blue-600 flex gap-3">
                                                            <Dropdown.Trigger>
                                                                <button
                                                                    type="button"
                                                                    className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                                >
                                                                    pesan
                                                                </button>
                                                            </Dropdown.Trigger>

                                                            <button
                                                                onClick={() => {
                                                                    setModal(2);
                                                                    setIdTarget(
                                                                        e.id
                                                                    );

                                                                    alertActive();
                                                                }}
                                                                type="button"
                                                                className="flex gap-5   px-5 justify-between items-center hover:bg-[#9AD7F5]/50 cursor-pointer transition  action bg-[#9AD7F5]/25 rounded-xl py-2 shadow-inner"
                                                            >
                                                                Lapor
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Dropdown.Content
                                                className="w-full"
                                                contentClasses=" bg-white p-2 px-5  "
                                            >
                                                <div>
                                                    <div class="px-4 sm:px-0">
                                                        <h3 class="text-base font-semibold leading-7 text-gray-900">
                                                            Terimakasih Telah
                                                            Melaporkan Tamu
                                                        </h3>
                                                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                                            {e.response}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalAlert alert={alert} closeModal={closeModal}>
                    {modal == 1 && (
                        <>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Apakah Yakin Akan Di Hapus?
                                </h2>

                                <div className="mt-6 flex justify-end gap-2">
                                    <PrimaryButton
                                        onClick={() => {
                                            destroy(
                                                route(
                                                    "surat-pengantar.destroy",
                                                    idTarget
                                                )
                                            );
                                            closeModal();
                                        }}
                                    >
                                        Ya
                                    </PrimaryButton>
                                </div>
                            </div>
                        </>
                    )}
                    {modal == 2 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Konfirmasi Kepulangan Tamu
                            </h2>

                            <div className="mt-6 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => {
                                        put(
                                            route(
                                                "report-guest.cekOut",
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
                                    Konfirmasi
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    Tidak
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
