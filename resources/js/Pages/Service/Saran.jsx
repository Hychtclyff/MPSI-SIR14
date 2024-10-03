import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Saran() {
    const [alert, setAlert] = useState(false);
    const { data, setData, post, get, processing, errors, reset } = useForm({
        saran_kritik: "",
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

        post(route("saran-kritik"), {
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
                        Kami selalu berusaha untuk memberikan pelayanan terbaik
                        kepada pelanggan. Untuk itu, kami sangat menghargai jika
                        Anda bersedia memberikan kritik dan saran yang membangun
                        melalui formulir ini. Masukan Anda akan sangat berarti
                        bagi kami dalam upaya perbaikan terus-menerus
                    </h2>
                }
            >
                <GuestLayout className="lg:min-w-[50rem] lg:min-h-[40rem] mb-28">
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
                                <span>Saran & Kritik</span>
                            </div>
                        </header>
                        <main>
                            <div className="container ">
                                <form onSubmit={submit}>
                                    <div className="flex flex-col justify-center ">
                                        {/* saran & Kritik */}

                                        <textarea
                                            id="saran_kritik"
                                            type="text"
                                            name="saran_kritik"
                                            value={data.saran_kritik}
                                            className=" align-top w-full h-96 text-start  'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md  bg-[#9AD7F5]/50 shadow-inner "
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "saran_kritik",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
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
                                        Saran/Kritik Anda telah dikirim.
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Terimakasih telah memberikan
                                        saran/kritik,
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Apakah ingin menampahkan saran/kritik
                                        lagi?
                                    </p>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <PrimaryButton
                                            onClick={() => {
                                                get(route("welcome"));
                                            }}
                                        >
                                            Tidak
                                        </PrimaryButton>
                                        <PrimaryButton onClick={closeModal}>
                                            Ya
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
