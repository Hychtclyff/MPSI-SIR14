<?php

namespace App\Http\Controllers;

use App\Models\FamilyMember;
use App\Http\Requests\StoreFamilyMemberRequest;
use App\Http\Requests\UpdateFamilyMemberRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FamilyMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($user_id)
    {


        return Inertia::render('Profile/NewMember', ['user_id' => $user_id]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data untuk anggota keluarga


        $validatedData = $request->validate([
            'nik' => 'required|string|size:16|unique:family_members,nik',  // NIK harus 16 karakter, dan unik di tabel family_members
            'nama' => 'required|string|max:255',                           // Nama tidak boleh kosong, maksimal 255 karakter
            'tempat_lahir' => 'required|string|max:255',                   // Tempat Lahir wajib diisi, maksimal 255 karakter
            'tanggal_lahir' => 'required|date',                            // Tanggal Lahir wajib diisi dalam format tanggal yang valid
            'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',                          // Jenis Kelamin harus diisi dengan nilai "L" atau "P"
            'status_perkawinan' => 'required|in:Kawin,Belum Kawin,Cerai Hidup,Cerai Mati',  // Status Perkawinan harus salah satu dari opsi yang tersedia
            'status_dalam_keluarga' => 'required|string|max:255',           // Status dalam keluarga (misalnya: Ayah, Ibu, Anak, dll.)
            'kewarganegaraan' => 'required|string|max:255',                 // Kewarganegaraan wajib diisi
            'agama' => 'required|string|max:255',                           // Agama wajib diisi
            'pekerjaan' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);
        FamilyMember::create($validatedData);
        return redirect()->intended(route('new-member'));
    }


    /**
     * Display the specified resource.
     */
    public function show(FamilyMember $familyMember)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FamilyMember $familyMember)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nik' => 'required|string|size:16|',  // NIK harus 16 karakter, dan unik di tabel family_members
            'nama' => 'required|string|max:255',                           // Nama tidak boleh kosong, maksimal 255 karakter
            'tempat_lahir' => 'required|string|max:255',                   // Tempat Lahir wajib diisi, maksimal 255 karakter
            'tanggal_lahir' => 'required|date',                            // Tanggal Lahir wajib diisi dalam format tanggal yang valid
            'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',                          // Jenis Kelamin harus diisi dengan nilai "L" atau "P"
            'status_perkawinan' => 'required|in:Kawin,Belum Kawin,Cerai Hidup,Cerai Mati',  // Status Perkawinan harus salah satu dari opsi yang tersedia
            'status_dalam_keluarga' => 'required|string|max:255',           // Status dalam keluarga (misalnya: Ayah, Ibu, Anak, dll.)
            'kewarganegaraan' => 'required|string|max:255',                 // Kewarganegaraan wajib diisi
            'agama' => 'required|string|max:255',                           // Agama wajib diisi
            'pekerjaan' => 'required|string|max:255',
        ]);


        $row = FamilyMember::findOrFail($id);
        $row->update($validatedData);

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FamilyMember $familyMember, $id)
    {
        $row = FamilyMember::findOrFail($id);
        $row->delete();
        return back();
    }
}
