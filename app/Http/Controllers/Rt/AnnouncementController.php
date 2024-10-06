<?php

namespace App\Http\Controllers\Rt;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Inertia::render('Rt/Announcements', [
            'announcementData' => Announcement::all(),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic' => 'required|string',
            'announcement' => 'required|string|',

        ]);


        Announcement::create($validated);


        return back();
    }

    public function update(Request $request, $id)
    {
        $row = Announcement::findOrFail($id);
        $validated = $request->validate([
            'topic' => 'required|string',
            'announcement' => 'required|string|',

        ]);


        $row->update($validated);

        return back();
    }
    public function destroy(Request $request, $id): RedirectResponse
    {
        $row = Announcement::findOrFail($id);
        $row->delete();
        return back();
    }
}
