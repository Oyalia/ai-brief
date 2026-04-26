"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    // Block 1
    contactName: "",
    email: "",
    phone: "",
    companyName: "",
    // Block 2
    primaryObjective: "Створення B2B продукту",
    problemToSolve: "",
    keyFeatures: "",
    // Block 3
    aiCapabilities: "",
    preferredModels: "OpenAI / GPT-4",
    dataSources: "",
    integrations: "",
    // Block 4
    designStyle: "Minimalist",
    colorPalette: "",
    competitors: "",
    // Block 5
    targetAudience: "",
    budgetRange: "$10k - $50k",
    timeline: "3-6 місяців",
    successMetrics: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const objectives = [
    "Автоматизація внутрішніх процесів",
    "Створення B2B продукту",
    "Створення B2C продукту",
    "Покращення існуючого продукту",
  ];

  const models = ["OpenAI / GPT-4", "Anthropic / Claude", "Llama / Open Source", "Custom Training"];
  const styles = ["Minimalist", "Corporate", "Futurist / Tech", "Brutalist"];
  const budgets = ["< $10k", "$10k - $50k", "$50k - $100k", "> $100k"];
  const timelines = ["1-3 місяці", "3-6 місяців", "6-12 місяців", "Гнучко"];

  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col items-center bg-[#000000]">
      <div className="max-w-4xl w-full space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            AI Project Brief
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium">
            Детальний збір вимог для вашої майбутньої AI SaaS платформи.
          </p>
        </div>

        {isSuccess ? (
          <div className="next-card text-center space-y-6 border-green-900/30">
            <h2 className="text-3xl font-bold text-green-400">Бриф отримано!</h2>
            <p className="text-gray-400">Ми детально вивчимо ваші вимоги та підготуємо пропозицію.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200"
            >
              Надіслати ще один
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 pb-24">
            {/* Block 1: General Info */}
            <section className="next-card space-y-8">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-sm">1</span>
                  Контактна інформація
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ім'я контакту</label>
                  <input
                    required
                    type="text"
                    placeholder="Олександр Коваленко"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+380..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Назва компанії</label>
                  <input
                    type="text"
                    placeholder="AI Startup Inc."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Block 2: Project Essence */}
            <section className="next-card space-y-8">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-sm">2</span>
                  Суть та цілі проекту
                </h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Головна мета</label>
                  <select
                    value={formData.primaryObjective}
                    onChange={(e) => setFormData({ ...formData, primaryObjective: e.target.value })}
                  >
                    {objectives.map((obj) => (
                      <option key={obj} value={obj}>
                        {obj}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Яку проблему вирішує продукт?</label>
                  <textarea
                    rows={3}
                    placeholder="Опишіть біль користувача, яку ми закриваємо..."
                    value={formData.problemToSolve}
                    onChange={(e) => setFormData({ ...formData, problemToSolve: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ключові функції</label>
                  <textarea
                    rows={3}
                    placeholder="Наприклад: Авторизація, Оплата Stripe, Дашборд, API інтеграція..."
                    value={formData.keyFeatures}
                    onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Block 3: AI & Technical */}
            <section className="next-card space-y-8">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-sm">3</span>
                  ШІ та технічні вимоги
                </h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Пріоритетні моделі</label>
                    <select
                      value={formData.preferredModels}
                      onChange={(e) => setFormData({ ...formData, preferredModels: e.target.value })}
                    >
                      {models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">AI Можливості (NLP, Vision, etc.)</label>
                    <input
                      type="text"
                      placeholder="Генерація тексту, Класифікація даних..."
                      value={formData.aiCapabilities}
                      onChange={(e) => setFormData({ ...formData, aiCapabilities: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Джерела даних</label>
                  <textarea
                    rows={2}
                    placeholder="Звідки ШІ братиме інформацію? (Завантаження файлів, парсинг, БД...)"
                    value={formData.dataSources}
                    onChange={(e) => setFormData({ ...formData, dataSources: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Інтеграції з існуючими системами</label>
                  <input
                    type="text"
                    placeholder="Slack, Salesforce, HubSpot..."
                    value={formData.integrations}
                    onChange={(e) => setFormData({ ...formData, integrations: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Block 4: Design & Brand */}
            <section className="next-card space-y-8">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-sm">4</span>
                  Дизайн та візуальний стиль
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Стиль дизайну</label>
                  <select
                    value={formData.designStyle}
                    onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })}
                  >
                    {styles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Колірна палітра</label>
                  <input
                    type="text"
                    placeholder="Dark blue, Neon accents, White/Gray..."
                    value={formData.colorPalette}
                    onChange={(e) => setFormData({ ...formData, colorPalette: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Приклади конкурентів / Референси</label>
                <textarea
                  rows={2}
                  placeholder="Сайти або продукти, які вам подобаються..."
                  value={formData.competitors}
                  onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                />
              </div>
            </section>

            {/* Block 5: Business Details */}
            <section className="next-card space-y-8">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-sm">5</span>
                  Бізнес та терміни
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Цільова аудиторія</label>
                  <input
                    type="text"
                    placeholder="CEO, Маркетологи, Розробники..."
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Метрики успіху (KPI)</label>
                  <input
                    type="text"
                    placeholder="Кількість юзерів, Економія часу..."
                    value={formData.successMetrics}
                    onChange={(e) => setFormData({ ...formData, successMetrics: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Бюджет</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Терміни</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    {timelines.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Додаткові побажання</label>
                <textarea
                  rows={3}
                  placeholder="Все, що ми забули запитати..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
              </div>
            </section>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all shadow-2xl shadow-white/5"
            >
              {isSubmitting ? "Аналізуємо ваші дані..." : "НАДІСЛАТИ ДЕТАЛЬНИЙ БРИФ"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
