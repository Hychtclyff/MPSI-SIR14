<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\Documents;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate([
            'link' => 'nullable|string',
            'no_surat' => 'required|string|unique:documents,no_surat',
            'status' => 'nullable',
            'user_id' => 'nullable|string', // Memastikan user_id ada di tabel users
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',

            'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',
            'status_pernikahan' => 'required|in:Belum Menikah,Menikah,Cerai',
            'nik' => 'required|string|size:16|unique:documents,nik',
            'kewarganegaraan' => 'required|string|max:255',
            'agama' => 'required|string|max:100',
            'pekerjaan' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'keperluan' => 'required|string|max:500',
            'email' => 'nullable|email|max:255',
        ]);

        $validated['user_id'] = Auth::user()->id;
        $validated['Date'] = //dapatkan tanggal hari ini;

            Documents::create($validated);


        return redirect()->intended(route('surat-pengantar'));
    }
    public function update(Request $request, $id): RedirectResponse
    {
        $row = Documents::findOrFail($id);
        if ($request['response']) {
            $validated = $request->validate([
                'response' => "string|required",
            ]);
            $row->update($validated);
            return back();
        }
        if ($request['link']) {
            $validated = $request->validate([
                'link' => "string|required",
            ]);
            $row->update($validated);
            return back();
        }



        $validated['status'] = true;



        $row->update($validated);



        return back();
    }
    public function updateData(Request $request, $id): RedirectResponse
    {
        $row = Documents::findOrFail($id);
        $validated = $request->validate([
            'link' => 'nullable|string',
            'no_surat' => 'required|string',
            'status' => 'nullable',
            'user_id' => 'nullable|string', // Memastikan user_id ada di tabel users
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',

            'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',
            'status_pernikahan' => 'required|in:Belum Menikah,Menikah,Cerai',
            'nik' => 'required|string|size:16',
            'kewarganegaraan' => 'required|string|max:255',
            'agama' => 'required|string|max:100',
            'pekerjaan' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'keperluan' => 'required|string|max:500',
            'email' => 'nullable|email|max:255',
        ]);


        $validated['response'] = '';
        $validated['status'] = false;







        $row->update($validated);



        return back();
    }
    public function destroy(Request $request, $id): RedirectResponse
    {

        $document = Documents::findOrFail($id);
        $document->delete();
        return back();
    }
}
