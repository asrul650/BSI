import React from 'react';

export default function StatusBadge({ status }) {
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  switch (status) {
    case 'Menunggu Penyerahan':
      badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
      dotColor = 'bg-amber-500';
      break;
    case 'Barang Ditemukan':
      badgeStyle = 'bg-blue-50 text-blue-800 border-blue-200';
      dotColor = 'bg-blue-500';
      break;
    case 'Proses Verifikasi':
      badgeStyle = 'bg-purple-50 text-purple-800 border-purple-200';
      dotColor = 'bg-purple-500 animate-pulse';
      break;
    case 'Telah Diambil':
    case 'Selesai':
      badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dotColor = 'bg-emerald-500';
      break;
    case 'Memiliki Kandidat':
      badgeStyle = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      dotColor = 'bg-indigo-500 animate-pulse';
      break;
    case 'Aktif':
      badgeStyle = 'bg-sky-50 text-sky-800 border-sky-200';
      dotColor = 'bg-sky-500';
      break;
    case 'Ditahan':
    case 'Ditolak':
      badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200';
      dotColor = 'bg-rose-500';
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
}

