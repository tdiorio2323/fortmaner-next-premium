import { useState } from 'react';
import HeroPinned from '@/components/HeroPinned';

const heroImg = "/fort-maner-logo-main.jpg";

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
        const subjectLine = form.subject?.trim() ? form.subject.trim() : `Website Contact: ${form.name}`;
        const subject = encodeURIComponent(subjectLine);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:info@fortmaner.shop?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen">
            {/* Same hero video as home */}
            <HeroPinned />

            {/* Mock contact form below hero */}
            <section id="form" className="mx-auto w-full max-w-5xl px-6 md:px-10 pb-16 md:pb-24" aria-label="Contact form">
                <div className="rounded-2xl bg-white/90 backdrop-blur border border-neutral-200 p-6 md:p-10 shadow-xl">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-black">Contact Fort Maner</h1>
                        {submitted && (
                            <div className="mt-4 mx-auto max-w-md rounded-lg bg-green-100 text-green-900 px-4 py-2 text-sm">
                                Your email client should have opened. If not, email us at info@fortmaner.shop.
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20"
                                required
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20"
                                required
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone (optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="(555) 555-5555"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Subject (optional)</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="How can we help?"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                placeholder="Tell us a bit about what you need..."
                                value={form.message}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20 min-h-[120px]"
                                required
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 font-semibold hover:bg-black/90 transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
