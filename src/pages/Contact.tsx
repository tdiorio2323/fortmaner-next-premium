import { useState } from 'react';

const heroImg = "/fort-maner-logo-main.jpg";

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
        const subject = encodeURIComponent(`Website Contact: ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        window.location.href = `mailto:info@fortmaner.shop?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen">
            <div className="mx-auto w-full max-w-4xl px-4 md:px-6 py-8 md:py-10">
                <div className="flex flex-col items-center mb-8">
                    <img src="/fort-maner-logo-main.jpg" alt="Fort Maner Logo" className="h-24 w-auto mb-4" />
                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-2">Contact Fort Maner</h1>
                    {submitted && (
                      <div className="mt-4 w-full max-w-md rounded-lg bg-green-100 text-green-900 px-4 py-2 text-sm text-center">
                        Your email client should have opened. If not, email us at info@fortmaner.shop.
                      </div>
                    )}
                </div>
            </div>
            <section className="flex justify-center items-center pb-16 md:pb-24">
                <div className="w-full max-w-md">
                    <form
                        onSubmit={handleSubmit}
                        className="backdrop-blur-lg bg-black/80 border border-white/10 shadow-xl rounded-2xl p-6 flex flex-col gap-6 kawaii-card"
                    >
                        <h2 className="text-white text-2xl font-bold mb-2 text-center">Get in Touch</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-black/40 border border-pink-300 px-4 py-3 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-base shadow-kawaii"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-black/40 border border-pink-300 px-4 py-3 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-base shadow-kawaii"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-black/40 border border-pink-300 px-4 py-3 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[100px] text-base shadow-kawaii"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-pink-300 text-black font-semibold py-3 mt-2 hover:bg-pink-400 transition text-base shadow-kawaii"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            <style>{`
                .kawaii-card {
                    box-shadow: 0 8px 32px 0 rgba(255, 192, 203, 0.25), 0 1.5px 6px 0 rgba(255, 192, 203, 0.15);
                    border-radius: 1.5rem;
                }
                .shadow-kawaii {
                    box-shadow: 0 2px 8px 0 rgba(255, 192, 203, 0.15);
                }
            `}</style>
        </main>
    );
}
