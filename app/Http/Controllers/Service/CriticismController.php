<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\Criticism;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CriticismController extends Controller
{


    public function store(Request $request)
    {
        $request->validate([
            'saran_kritik' => 'required|string|max:1000',
        ]);

        $saran = Criticism::create([
            'criticism' => $request->saran_kritik, // Pastikan ini benar
        ]);




        return redirect()->intended(route('saran-kritik'));
    }

    public function destroy(Request $request, $id): RedirectResponse
    {

        $row = Criticism::findOrFail($id);
        $row->delete();
        return back();
    }
}
