import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { posSatpamList } from '../../data/mockData';

export default function PosSatpam({ setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Lokasi Kampus Terpadu
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          Daftar Pos Pengamanan Satpam UII
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Seluruh proses verifikasi identitas fisik, klaim kepemilikan, dan serah terima barang temuan dilayani di pos-pos berikut.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posSatpamList.map((pos) => (
          <div key={pos.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {pos.operatingHours}
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {pos.id}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{pos.name}</h3>
              <p className="text-sm text-slate-600 flex items-start gap-2 mb-4">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>{pos.location}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Telepon Internal:</span>
                <strong className="text-slate-800">{pos.phone}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">WhatsApp Siaga:</span>
                <strong className="text-emerald-700">{pos.whatsapp}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

