<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\ReportGuest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportGuestController extends Controller
{
    public function store(Request $request)
    {
        // Validasi data
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'asal' => 'required|string|max:255',
            'handphone' => 'required|string|max:15', // Atur panjang maksimal sesuai kebutuhan
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
        ]);

        $validatedData['user_id'] = Auth::user()->id;
        // Simpan data ke dalam database
        $reportGuest = ReportGuest::create($validatedData);

        // Mengembalikan respon, misalnya mengarahkan kembali ke halaman sebelumnya
        return redirect()->intended(route('lapor'));
    }
    public function update(Request $request, $id): RedirectResponse
    {

        $validated = $request->validate([
            'response' => "string|required",
        ]);
        $validated['status'] = true;
        $row = ReportGuest::findOrFail($id);


        $row->update($validated);

        return back();
    }

    public function cekOut(Request $request, $id): RedirectResponse
    {

        $row = ReportGuest::findOrFail($id);
        $validated['cek_out'] = true;

        $row->update($validated);

        return back();
    }
}
