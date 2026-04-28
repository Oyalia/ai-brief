"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Brief {
  id: string;
  contactName: string;
  projectName: string;
  companyName: string | null;
  email: string;
  primaryObjective: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/briefs")
      .then((res) => res.json())
      .then((data) => {
        setBriefs(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Панель адміністратора</h1>
          <Link href="/" className="text-gray-400 hover:text-white underline text-sm">
            Повернутися на головну
          </Link>
        </div>

        {isLoading ? (
          <p className="text-center py-12">Завантаження...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 font-medium text-gray-400">Дата</th>
                  <th className="p-4 font-medium text-gray-400">Проект</th>
                  <th className="p-4 font-medium text-gray-400">Клієнт</th>
                  <th className="p-4 font-medium text-gray-400">Компанія</th>
                  <th className="p-4 font-medium text-gray-400">Дії</th>
                </tr>
              </thead>
              <tbody>
                {briefs.map((brief) => (
                  <tr key={brief.id} className="border-b border-gray-900 hover:bg-white/[0.02]">
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(brief.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-white">{brief.projectName}</td>
                    <td className="p-4 font-medium">{brief.contactName}</td>
                    <td className="p-4 text-gray-300">{brief.companyName || "-"}</td>
                    <td className="p-4">
                      <Link
                        href={`/admin/${brief.id}`}
                        className="bg-gray-800 hover:bg-gray-700 text-xs px-3 py-1.5 rounded-md transition-colors"
                      >
                        Редагувати
                      </Link>
                    </td>
                  </tr>
                ))}
                {briefs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Брифів поки немає.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
