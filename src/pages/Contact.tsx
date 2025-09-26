import { useState } from 'react';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    inquiryType: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function Contact() {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: 'general',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'order', label: 'Order Support' },
        { value: 'returns', label: 'Returns & Exchanges' },
        { value: 'wholesale', label: 'Wholesale Inquiry' },
        { value: 'press', label: 'Press & Media' },
        { value: 'collaboration', label: 'Collaboration' }
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!form.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Here you can later integrate with your backend
            // For now, we'll use mailto as fallback
            const subjectLine = form.subject?.trim()
                ? `${form.subject} (${inquiryTypes.find(t => t.value === form.inquiryType)?.label})`
                : `${inquiryTypes.find(t => t.value === form.inquiryType)?.label} - ${form.name}`;

            const subject = encodeURIComponent(subjectLine);
            const body = encodeURIComponent(
              `Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\nInquiry Type: ${inquiryTypes.find(t => t.value === form.inquiryType)?.label}\n\nMessage:\n${form.message}`
            );

            window.location.href = `mailto:info@fortmaner.shop?subject=${subject}&body=${body}`;
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 bg-gradient-to-r from-black via-neutral-900 to-black">
                <div className="absolute inset-0 bg-[url('/brick-bg.jpg')] bg-cover bg-center opacity-30"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
                        <p className="text-lg md:text-xl opacity-90">Get in touch with the Fort Maner team</p>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/40">
                                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold">Visit Our Store</h3>
                                            <p className="text-gray-600">2819 W Harrison<br />Chicago, IL</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Phone className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold">Call Us</h3>
                                            <p className="text-gray-600">773-801-0498</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Mail className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold">Email</h3>
                                            <p className="text-gray-600">info@fortmaner.shop</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Clock className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold">Hours</h3>
                                            <p className="text-gray-600">Mon-Sat: 10AM-8PM<br />Sun: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/40">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Mail className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                        <p className="text-gray-600">Your email client should have opened. If not, email us directly at info@fortmaner.shop.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your full name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    className={`w-full rounded-lg border px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                                                        errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-black/20'
                                                    }`}
                                                />
                                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="your@email.com"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className={`w-full rounded-lg border px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                                                        errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-black/20'
                                                    }`}
                                                />
                                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="(555) 555-5555"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                                                <select
                                                    name="inquiryType"
                                                    value={form.inquiryType}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors"
                                                >
                                                    {inquiryTypes.map((type) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                placeholder="Brief description of your inquiry"
                                                value={form.subject}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                placeholder="Tell us more about your inquiry..."
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={6}
                                                className={`w-full rounded-lg border px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors resize-none ${
                                                    errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-black/20'
                                                }`}
                                            />
                                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-3 font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
