"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Brief {
  id: string;
  // Block 1
  contactName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  projectName: string;
  // Block 2
  primaryObjective: string;
  projectStage: string;
  problemToSolve: string | null;
  keyFeatures: string | null;
  // Block 3
  aiCapabilities: string;
  preferredModels: string | null;
  dataSources: string | null;
  integrations: string | null;
  techStack: string | null;
  // Block 4
  designStyle: string | null;
  colorPalette: string | null;
  competitors: string | null;
  // Block 5
  targetAudience: string;
  targetLanguages: string | null;
  userCount: string | null;
  budgetRange: string;
  timeline: string;
  successMetrics: string | null;
  monetizationModel: string | null;
  securityCompliance: string | null;
  maintenanceRequirements: string | null;
  comments: string | null;
}

export default function EditBrief({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState<Brief | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/briefs/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/briefs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете видалити цей бриф?")) return;
    try {
      const response = await fetch(`/api/briefs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!formData) return <p className="text-center py-24 text-gray-500">Завантаження даних...</p>;

  return (
    <main className="min-h-screen p-8 md:p-12 bg-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Редагування брифу</h1>
            <p className="text-gray-500 text-sm">ID: {id}</p>
          </div>
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            ← Повернутися до списку
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-24">
          {/* Block 1: General */}
          <div className="next-card space-y-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-2">1. Контакти</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Ім'я</label>
                <input value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Email</label>
                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Телефон</label>
                <input value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Компанія</label>
                <input value={formData.companyName || ""} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Назва проекту</label>
                <input value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Block 2: Essence */}
          <div className="next-card space-y-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-2">2. Суть проекту</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Головна мета</label>
                <input value={formData.primaryObjective} onChange={(e) => setFormData({ ...formData, primaryObjective: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Стадія проекту</label>
                <input value={formData.projectStage} onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Проблема</label>
                <textarea rows={3} value={formData.problemToSolve || ""} onChange={(e) => setFormData({ ...formData, problemToSolve: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Функції</label>
                <textarea rows={3} value={formData.keyFeatures || ""} onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Block 3: AI & Tech */}
          <div className="next-card space-y-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-2">3. ШІ та Технології</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Моделі</label>
                <input value={formData.preferredModels || ""} onChange={(e) => setFormData({ ...formData, preferredModels: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Можливості ШІ</label>
                <input value={formData.aiCapabilities} onChange={(e) => setFormData({ ...formData, aiCapabilities: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Джерела даних</label>
              <textarea rows={2} value={formData.dataSources || ""} onChange={(e) => setFormData({ ...formData, dataSources: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Інтеграції</label>
              <input value={formData.integrations || ""} onChange={(e) => setFormData({ ...formData, integrations: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Стек технологій</label>
              <input value={formData.techStack || ""} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Безпека</label>
              <input value={formData.securityCompliance || ""} onChange={(e) => setFormData({ ...formData, securityCompliance: e.target.value })} />
            </div>
          </div>

          {/* Block 4: Design */}
          <div className="next-card space-y-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-2">4. Дизайн</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Стиль</label>
                <input value={formData.designStyle || ""} onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Палітра</label>
                <input value={formData.colorPalette || ""} onChange={(e) => setFormData({ ...formData, colorPalette: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Конкуренти</label>
              <textarea rows={2} value={formData.competitors || ""} onChange={(e) => setFormData({ ...formData, competitors: e.target.value })} />
            </div>
          </div>

          {/* Block 5: Business */}
          <div className="next-card space-y-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-2">5. Бізнес</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Аудиторія</label>
                <input value={formData.targetAudience} onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">KPI (Метрики)</label>
                <input value={formData.successMetrics || ""} onChange={(e) => setFormData({ ...formData, successMetrics: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Бюджет</label>
                <input value={formData.budgetRange} onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Терміни</label>
                <input value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Мови</label>
                <input value={formData.targetLanguages || ""} onChange={(e) => setFormData({ ...formData, targetLanguages: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Юзери</label>
                <input value={formData.userCount || ""} onChange={(e) => setFormData({ ...formData, userCount: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Монетизація</label>
                <input value={formData.monetizationModel || ""} onChange={(e) => setFormData({ ...formData, monetizationModel: e.target.value })} />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-gray-500">Підтримка</label>
                <input value={formData.maintenanceRequirements || ""} onChange={(e) => setFormData({ ...formData, maintenanceRequirements: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              disabled={isSaving}
              type="submit"
              className="flex-1 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-lg"
            >
              {isSaving ? "Збереження..." : "Зберегти зміни"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-8 py-4 rounded-xl border border-red-900/50 text-red-500 hover:bg-red-950/20 transition-all font-bold"
            >
              Видалити
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
